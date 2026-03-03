const carouselStates = {
    carousel1: { currentIndex: 0, items: 3 },
    carousel2: { currentIndex: 0, items: 3 }
};

let autoPlayInitialised = false;
let autoPlayInterval;

function moveCarousel(id, direction) {
    const state = carouselStates[id];
    state.currentIndex += direction;

    // Tratativa para laço infinito do carrossel
    if (state.currentIndex < 0) {
        state.currentIndex = state.items - 1;
    } else if (state.currentIndex >= state.items) {
        state.currentIndex = 0;
    }

    updateCarousel(id);
    resetAutoPlay();
}

function updateCarousel(id) {
    const track = document.querySelector(`#${id} .carousel-track`);
    const state = carouselStates[id];
    // Transforma no eixo X Baseado no Index (0%, -100%, -200%)
    track.style.transform = `translateX(-${state.currentIndex * 100}%)`;
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        Object.keys(carouselStates).forEach(id => {
            const state = carouselStates[id];
            state.currentIndex++;
            if (state.currentIndex >= state.items) {
                state.currentIndex = 0;
            }
            updateCarousel(id);
        });
    }, 4000); // 4 Segundos
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Inicia o Auto Play assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    startAutoPlay();
});

document.addEventListener('DOMContentLoaded', () => {
    const h3Element = document.querySelector('.hero-left h3');
    const botao = document.querySelector('.botao-fake');

    if (!h3Element || !botao) return;

    // 1. Prepara o H3: Transforma texto em Spans
    const text = h3Element.innerText;
    h3Element.innerHTML = ''; // Limpa o texto original

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        h3Element.appendChild(span);
    });

    const spans = h3Element.querySelectorAll('span');

    // 2. Anima as letras uma por uma
    // O delay de 1200ms espera o preloader/logo carregarem
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('reveal-letter');

            // 3. Quando chegar na última letra, ilumina o botão
            if (index === spans.length - 1) {
                setTimeout(() => {
                    botao.classList.add('botao-iluminado');
                }, 400); // Pequena pausa após a última letra para o impacto
            }
        }, 1200 + (index * 40));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.schedule-table tr');

    rows.forEach(row => {
        row.addEventListener('click', function() {
            // 1. Se a linha já estiver ativa, ela desativa ao clicar de novo
            if (this.classList.contains('active-row')) {
                this.classList.remove('active-row');
            } else {
                // 2. Remove a classe de todas as outras linhas (para focar só em uma)
                rows.forEach(r => r.classList.remove('active-row'));

                // 3. Adiciona a classe na linha clicada
                this.classList.add('active-row');
            }
        });
    });

    // Opcional: Clicar fora da tabela remove o destaque
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.schedule-table')) {
            rows.forEach(r => r.classList.remove('active-row'));
        }
    });
});
