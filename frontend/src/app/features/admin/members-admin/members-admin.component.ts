import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-members-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members-admin.component.html'
})
export class MembersAdminComponent implements OnInit {
  members: any[] = [];
  newMember = { full_name: '', role: '', institution: 'C3 UNAM', bio: '', is_active: true };
  isLoading = true;
  isSaving = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() { this.loadMembers(); }

  loadMembers() {
    this.isLoading = true;
    this.apiService.getMembers().subscribe({
      next: (data: any) => { this.members = data; this.isLoading = false; },
      error: (err: any) => { console.error("Error", err); this.isLoading = false; }
    });
  }

  onSubmit() {
    if (!this.newMember.full_name) return;
    this.isSaving = true;
    this.apiService.createMember(this.newMember).subscribe({
      next: (res: any) => {
        this.loadMembers();
        this.newMember = { full_name: '', role: '', institution: 'C3 UNAM', bio: '', is_active: true };
        this.isSaving = false;
      },
      error: (err: any) => { console.error("Error", err); this.isSaving = false; }
    });
  }

  deleteMember(id: number) {
    if(confirm("¿Estás seguro?")) {
      this.apiService.deleteMember(id).subscribe({
        next: (res: any) => this.loadMembers(),
        error: (err: any) => console.error("Error", err)
      });
    }
  }
}
