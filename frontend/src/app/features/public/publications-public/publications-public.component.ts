import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-publications-public',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publications-public.component.html'
})
export class PublicationsPublicComponent implements OnInit {
  publications: any[] = [];
  isLoading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPublications().subscribe({
      next: (data: any) => {
        this.publications = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las publicaciones.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get articles() { return this.publications.filter(p => p.pub_type === 'Artículo'); }
  get books() { return this.publications.filter(p => p.pub_type === 'Libro'); }
  get conferences() { return this.publications.filter(p => p.pub_type === 'Conferencia'); }
  get reports() { return this.publications.filter(p => p.pub_type === 'Reporte'); }
}
