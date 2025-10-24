// Client-side logic for Travel Agent Landing

async function fetchPackages() {
  try {
    const res = await fetch('/packages');
    const data = await res.json();
    const grid = document.getElementById('packages-grid');
    grid.innerHTML = '';
    (data.packages || []).forEach(pkg => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <h3>${pkg.destination}</h3>
        <div class="muted">${pkg.duration}</div>
        <div class="price">$${pkg.priceUSD}</div>
      `;
      grid.appendChild(el);
    });
  } catch (e) {
    console.error('Failed to load packages', e);
  }
}

function setupBooking() {
  const form = document.getElementById('book-form');
  const status = document.getElementById('book-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Submitting...';
    const payload = {
      name: document.getElementById('name').value.trim(),
      destination: document.getElementById('destination').value.trim(),
      date: document.getElementById('date').value,
    };
    try {
      const res = await fetch('/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      status.textContent = data.message;
      form.reset();
    } catch (err) {
      status.textContent = `Error: ${err.message}`;
      status.style.color = '#ef4444';
    }
  });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', () => {
  fetchPackages();
  setupBooking();
  setYear();
});
