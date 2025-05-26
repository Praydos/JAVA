import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; // Corrected path
import { DashboardStats } from '../model/dashboard-stats.model'; // We'll create this model

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(environment.backendHost + '/dashboard/stats');
  }
} 