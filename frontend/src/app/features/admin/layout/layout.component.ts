import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  
  ngOnInit() {
    if (!this.currentUser()) {
      this.authService.fetchUserProfile().subscribe();
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
