/* admin/javaScript/admin.js */

document.addEventListener('DOMContentLoaded', () => {
  // Toggle de modales
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('.close-modal, [data-modal-close]');
  
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-target');
      const modal = document.querySelector(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Cerrar modal al dar click fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('active');
    }
  });

  // Notificación simulación al guardar
  const forms = document.querySelectorAll('.admin-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Registro guardado exitosamente!');
      const modal = form.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
});

