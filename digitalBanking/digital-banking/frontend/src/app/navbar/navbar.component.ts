import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  openDropdownId: string | null = null;
  
  constructor(public authService: AuthService, private router: Router) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // If click is outside any dropdown or dropdown toggle
    if (!target.closest('.dropdown') && !target.closest('.dropdown-toggle')) {
      this.closeAllDropdowns();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  
  // Methods to handle dropdown menu visibility
  toggleDropdown(dropdownId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === dropdownId ? null : dropdownId;
  }

  closeAllDropdowns(): void {
    this.openDropdownId = null;
  }
}
