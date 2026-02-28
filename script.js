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
