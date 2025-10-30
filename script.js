document.addEventListener('DOMContentLoaded', (event) => {
    // carousel logic
    const slides = Array.from(document.querySelectorAll('.slide'));
    let idx = 0;
    const indicators = document.getElementById('indicators');
    const carousel = document.getElementById('carousel');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    // Verifica se os elementos essenciais existem antes de prosseguir
    if (slides.length === 0 || !indicators || !carousel || !nextButton || !prevButton) {
        console.warn("Elementos essenciais do carrossel não encontrados. Verifique o HTML e os IDs.");
        // Continua a execução para permitir que o restante do script (como o form handler) funcione.
    } else {
        // 1. Criação dos indicadores (dots)
        slides.forEach((s, i) => {
            const dot = document.createElement('button');
            dot.className = 'w-10 h-2 rounded-full ' + (i === 0 ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/8');
            dot.onclick = () => show(i);
            indicators.appendChild(dot);
        });

        // 2. Função principal para mostrar o slide
        function show(i) {
            // Garante que o índice esteja dentro dos limites (0 a slides.length - 1)
            const newIdx = (i % slides.length + slides.length) % slides.length;

            slides.forEach((s, ii) => {
                s.style.opacity = ii === newIdx ? '1' : '0';
                s.style.pointerEvents = ii === newIdx ? 'auto' : 'none';
                if (indicators.children[ii]) {
                    indicators.children[ii].className = 'w-10 h-2 rounded-full ' + (ii === newIdx ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/8');
                }
            });
            idx = newIdx;
        }

        // 3. Inicializa o primeiro slide (CORREÇÃO CRÍTICA)
        show(0);

        // 4. Lógica de navegação (botões next/prev)
        nextButton.onclick = () => show(idx + 1);
        prevButton.onclick = () => show(idx - 1);

        // 5. Lógica de avanço automático
        let auto = setInterval(() => show(idx + 1), 4500);

        // 6. Lógica de pausa/retomada ao passar o mouse
        carousel.addEventListener('mouseenter', ()=> {
            clearInterval(auto);
            auto = null;
        });
        carousel.addEventListener('mouseleave', ()=> {
            if (auto === null) {
                auto = setInterval(() => show(idx + 1), 4500);
            }
        });
    }


    // simple form handler (sends to WhatsApp via prefilled message)
    // A função é exposta globalmente para ser chamada pelo onsubmit no HTML
    window.submitForm = function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message) return;
      const text = encodeURIComponent(`Olá, sou ${name} (${email}). %0A%0A${message}`);
      // open WhatsApp chat with message (user can change to email backend later)
      window.open(`https://wa.me/5581996744143?text=${text}`, '_blank' );
      document.getElementById('formStatus').textContent = 'Abrindo WhatsApp para enviar sua mensagem...';
    }

    // replace {YEAR}
    // Substituição segura do {YEAR} no footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('{YEAR}', new Date().getFullYear());
    }
});
