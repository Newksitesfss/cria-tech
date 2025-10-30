// carousel logic
const slides = Array.from(document.querySelectorAll('.slide'));
let idx = 0;
const indicators = document.getElementById('indicators');
slides.forEach((s, i) => {
  const dot = document.createElement('button');
  dot.className = 'w-10 h-2 rounded-full ' + (i === 0 ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/8');
  dot.onclick = () => show(i);
  indicators.appendChild(dot);
});
function show(i) {
  slides.forEach((s, ii) => {
    s.style.opacity = ii === i ? '1' : '0';
    s.style.pointerEvents = ii === i ? 'auto' : 'none';
    indicators.children[ii].className = 'w-10 h-2 rounded-full ' + (ii === i ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/8');
  });
  idx = i;
}
document.getElementById('next').onclick = () => show((idx+1) % slides.length);
document.getElementById('prev').onclick = () => show((idx-1+slides.length) % slides.length);
let auto = setInterval(() => show((idx+1) % slides.length), 4500);
document.getElementById('carousel').addEventListener('mouseenter', ()=> clearInterval(auto));
document.getElementById('carousel').addEventListener('mouseleave', ()=> auto = setInterval(() => show((idx+1) % slides.length), 4500));

// simple form handler (sends to WhatsApp via prefilled message)
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message) return;
  const text = encodeURIComponent(`Olá, sou ${name} (${email}). %0A%0A${message}`);
  // open WhatsApp chat with message (user can change to email backend later)
  window.open(`https://wa.me/5581996744143?text=${text}`, '_blank');
  document.getElementById('formStatus').textContent = 'Abrindo WhatsApp para enviar sua mensagem...';
}

// replace {YEAR}
document.body.innerHTML = document.body.innerHTML.replace('{YEAR}', new Date().getFullYear());
