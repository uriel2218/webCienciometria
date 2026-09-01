import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-admin.component.html'
})
export class EventsAdminComponent implements OnInit {
  events: any[] = [];
  
  newEvent = {
    title: '',
    event_type: 'Congreso',
    speakers: '',
    event_date: new Date().toISOString().split('T')[0],
    video_url: ''
  };

  eventTypes = ['Congreso', 'Divulgación'];

  isLoading = true;
  isSaving = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.apiService.getEvents().subscribe({
      next: (data: any) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Error cargando eventos", err);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (!this.newEvent.title || !this.newEvent.event_type) return;

    this.isSaving = true;
    this.apiService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.loadEvents();
        this.newEvent = { title: '', event_type: 'Congreso', speakers: '', event_date: new Date().toISOString().split('T')[0], video_url: '' };
        this.isSaving = false;
      },
      error: (err: any) => {
        console.error("Error guardando evento", err);
        this.isSaving = false;
      }
    });
  }

  deleteEvent(id: number) {
    if(confirm("¿Estás seguro de eliminar este evento?")) {
      this.apiService.deleteEvent(id).subscribe({
        next: () => this.loadEvents(),
        error: (err: any) => console.error("Error eliminando evento", err)
      });
    }
  }
}
