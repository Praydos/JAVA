import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string | undefined;
  roles: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.userName;
    this.roles = this.authService.roles;
  }
} 