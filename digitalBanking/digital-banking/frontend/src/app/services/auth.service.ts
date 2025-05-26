import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  userName: any;
  roles: any;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(
      environment.backendHost + '/auth/login',
      params,
      options
    );
  }

  loadProfile(response: any) {
    this.isAuthenticated = true;
    this.accessToken = response['access-token'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.userName = decodedJwt.sub;
    const scope = decodedJwt.scope;
    if (typeof scope === 'string') {
      this.roles = scope.split(' ').filter(role => role.length > 0);
    } else if (Array.isArray(scope)) {
      this.roles = scope;
    } else {
      this.roles = [];
    }
    localStorage.setItem('access-token', this.accessToken);
    console.log('Processed roles:', this.roles);
  }

  logout() {
    this.isAuthenticated = false;
    this.userName = null;
    this.roles = null;
    this.accessToken = '';
    localStorage.removeItem('access-token');
    this.router.navigateByUrl('/login');
  }

  loadTokenFromLocalStorage() {
    let token = localStorage.getItem('access-token');
    if (token) {
      this.loadProfile({ 'access-token': token });
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  public changePassword(oldPassword: string, newPassword: string) {
    const payload = { oldPassword, newPassword };
    return this.http.post(environment.backendHost + '/auth/change-password', payload, { responseType: 'text' });
  }
}
