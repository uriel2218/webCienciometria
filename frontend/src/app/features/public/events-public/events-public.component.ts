import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-events-public',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-public.component.html'
})
export class EventsPublicComponent implements OnInit {
  events: any[] = [];
  isLoading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe({
      next: (data: any) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los eventos.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get congresos() { return this.events.filter(e => e.event_type === 'Congreso'); }
  get divulgacion() { return this.events.filter(e => e.event_type === 'Divulgación'); }
}
