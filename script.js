document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAV scroll state ---------- */
  const nav = document.getElementById('mainNav');
  const progressBar = document.getElementById('progressBar');

  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- cursor glow (desktop) ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches){
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive:true });
  }

  /* ---------- follicle field generation (hero signature motif) ---------- */
  const field = document.getElementById('follicleField');
  if (field){
    const count = window.innerWidth < 720 ? 60 : 140;
    let html = '';
    for (let i = 0; i < count; i++){
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = (Math.random() * 4).toFixed(2);
      const size = (Math.random() * 2 + 2).toFixed(1);
      html += `<span style="top:${top}%; right:${left}%; width:${size}px; height:${size}px; animation:pulse ${3 + Math.random()*3}s ease-in-out ${delay}s infinite;"></span>`;
    }
    field.innerHTML = html;
  }

  /* ---------- scroll reveal (data-aos) ---------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('aos-in'), i % 6 * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- animated counters (dashboard stats) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  function toFa(num){
    const map = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return String(num).replace(/[0-9]/g, d => map[d]);
  }

  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = toFa(value.toLocaleString('en-US'));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = toFa(target.toLocaleString('en-US'));
    }
    requestAnimationFrame(tick);
  }

  /* ---------- patient journey line fill ---------- */
  const journeyFill = document.getElementById('journeyFill');
  const journeyTrack = document.querySelector('.journey-track');
  if (journeyFill && journeyTrack){
    const journeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          journeyFill.style.width = '100%';
          journeyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    journeyObserver.observe(journeyTrack);
  }

  /* ---------- CTA floating particles ---------- */
  const ctaParticles = document.getElementById('ctaParticles');
  if (ctaParticles){
    let html = '';
    for (let i = 0; i < 26; i++){
      const left = Math.random() * 100;
      const size = (Math.random() * 4 + 2).toFixed(1);
      const duration = (Math.random() * 8 + 8).toFixed(1);
      const delay = (Math.random() * 8).toFixed(1);
      html += `<span style="left:${left}%; bottom:-20px; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;"></span>`;
    }
    ctaParticles.innerHTML = html;
  }

  /* ---------- smooth internal anchor scroll offset (for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1){
        const target = document.querySelector(id);
        if (target){
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});
