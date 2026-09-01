/* javaScript/carousel.js */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  // Seleccionamos las nuevas flechas
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (dots.length > 0) dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    if (dots.length > 0) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  // Nueva función para ir hacia atrás
  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  // Eventos para las flechas
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer(); // Evita que brinque justo después de hacer clic
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
  }

  // Eventos para los puntos
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetTimer();
    });
  });

  startTimer();
});