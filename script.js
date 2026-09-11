document.addEventListener('DOMContentLoaded', () => {
  // Gate Animation
  const gate = document.getElementById('gate');
  const openBtn = document.getElementById('openGateBtn');
  const mainContent = document.getElementById('mainContent');
  const music = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  openBtn.addEventListener('click', () => {
    gate.classList.add('open');
    mainContent.classList.add('visible');
    document.body.style.overflow = 'auto';
    
    // Play music automatically (might be blocked by browser policies, so we handle it gracefully)
    music.volume = 0.3;
    music.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(e => {
      console.log('Autoplay diblokir oleh browser. Pengguna harus menekan tombol musik secara manual.');
    });
  });

  // Prevent scrolling when gate is closed
  document.body.style.overflow = 'hidden';

  // Music Toggle
  musicToggle.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicToggle.classList.add('playing');
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
    }
  });

  // Countdown Timer
  const targetDate = new Date('Jan 26, 2027 10:00:00').getTime();
  
  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    } else {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
    }
  };
  setInterval(updateTimer, 1000);
  updateTimer();

  // Scroll Reveal Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // RSVP Button
  const rsvpBtn = document.getElementById('rsvpButton');
  const rsvpMsg = document.getElementById('rsvpMessage');
  
  rsvpBtn.addEventListener('click', () => {
    rsvpMsg.textContent = 'Terima kasih! Doa restu dan kehadiran Anda sangat berarti bagi kami.';
    rsvpBtn.textContent = 'Kehadiran Terkonfirmasi';
    rsvpBtn.disabled = true;
    rsvpBtn.style.opacity = '0.6';
  });
});