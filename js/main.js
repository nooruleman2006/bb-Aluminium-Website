// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
 
// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
// ===== FILTER TABS =====
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.product-card');
 
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
 
    const filter = tab.dataset.filter;
    cards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animationDelay = `${(i % 10) * 0.07}s`;
        card.style.animation = 'none';
        // Trigger reflow to restart animation
        void card.offsetWidth;
        card.style.animation = '';
      }
    });
  });
});
 
// ===== WHATSAPP NUMBER =====
const WHATSAPP_NUMBER = '97333513233';
 
// ===== MODAL =====
function openOrder(productName) {
  document.getElementById('modalProduct').textContent = productName;
  // Pre-fill the order form select
  const select = document.getElementById('productSelect');
  for (let opt of select.options) {
    if (opt.value === productName) { select.value = productName; break; }
  }
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
 
// ===== ORDER FORM → WHATSAPP =====
function submitOrder(e) {
  e.preventDefault();
 
  // Collect form values
  const name    = document.getElementById('clientName').value.trim();
  const phone   = document.getElementById('clientPhone').value.trim();
  const email   = document.getElementById('clientEmail').value.trim();
  const product = document.getElementById('productSelect').value;
  const details = document.getElementById('details').value.trim();
 
  // Build WhatsApp message
  const message =
    `🔧 *NEW ORDER — Best Brothers Aluminium*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `📧 *Email:* ${email || 'Not provided'}\n` +
    `🛠️ *Product:* ${product}\n` +
    `📐 *Details:* ${details || 'No details provided'}\n\n` +
    `_Sent from the website order form_`;
 
  // Encode and open WhatsApp
  const encoded = encodeURIComponent(message);
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(waURL, '_blank');
 
  // Show success screen
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccess').style.display = 'block';
  window.scrollTo({ top: document.getElementById('order').offsetTop - 80, behavior: 'smooth' });
}
 
function resetOrder() {
  document.getElementById('orderForm').reset();
  document.getElementById('orderForm').style.display = 'grid';
  document.getElementById('orderSuccess').style.display = 'none';
}
 
// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.product-card, .why-card, .contact-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });
 
revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.3s ease, box-shadow 0.3s ease`;
  observer.observe(el);
});
 