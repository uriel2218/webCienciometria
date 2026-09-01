import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-members-public',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-public.component.html'
})
export class MembersPublicComponent implements OnInit {
  members: any[] = [];
  isLoading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMembers().subscribe({
      next: (data: any) => { this.members = data; this.isLoading = false; },
      error: (err: any) => { this.error = 'Error'; this.isLoading = false; console.error(err); }
    });
  }
}
