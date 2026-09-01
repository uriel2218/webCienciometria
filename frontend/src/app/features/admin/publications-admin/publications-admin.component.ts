import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-publications-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publications-admin.component.html'
})
export class PublicationsAdminComponent implements OnInit {
  publications: any[] = [];
  
  newPub = {
    title: '',
    pub_type: 'Artículo',
    authors: '',
    year: new Date().getFullYear(),
    doi_url: ''
  };

  pubTypes = ['Artículo', 'Reporte', 'Libro', 'Conferencia'];

  isLoading = true;
  isSaving = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications() {
    this.isLoading = true;
    this.apiService.getPublications().subscribe({
      next: (data: any) => {
        this.publications = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Error cargando publicaciones", err);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (!this.newPub.title || !this.newPub.pub_type) return;

    this.isSaving = true;
    this.apiService.createPublication(this.newPub).subscribe({
      next: () => {
        this.loadPublications();
        this.newPub = { title: '', pub_type: 'Artículo', authors: '', year: new Date().getFullYear(), doi_url: '' };
        this.isSaving = false;
      },
      error: (err: any) => {
        console.error("Error guardando publicación", err);
        this.isSaving = false;
      }
    });
  }

  deletePublication(id: number) {
    if(confirm("¿Estás seguro de eliminar esta publicación?")) {
      this.apiService.deletePublication(id).subscribe({
        next: () => this.loadPublications(),
        error: (err: any) => console.error("Error eliminando publicación", err)
      });
    }
  }
}
