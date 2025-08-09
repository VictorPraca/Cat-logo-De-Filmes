document.addEventListener('DOMContentLoaded', () => {

    const apiKey = 'f83b3e2e8538738c27943defc987dab7';
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1280';
    const dialog = document.getElementById('movie-details-dialog');

    const searchInput = document.getElementById('search-movie');
    const searchButton = document.getElementById('search-btn');

    if(!dialog) {
        console.error("Elemento <dialog> com ID 'movie-datails-dialog' não encontrado no HTML");
        return;
    }

    async function handleSearch() {
        const query = searchInput.value.trim();

        if (!query) {
            return; 
        }

        console.log(`Buscando por: ${query}`);
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`;

        dialog.innerHTML = '<p style="padding: 20px;">Buscando...</p>';
        dialog.showModal();

        try {
            const response = await fetch(searchUrl);
            if (!response.ok) throw new Error('Erro na busca da API');

            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const firstMovie = data.results[0];
                await showMovieDetails(firstMovie.id);
            } else {
                dialog.innerHTML = `
                    <div class="dialog-error">
                        <p>Filme não encontrado</p>
                        <small>Tente buscar por outro título.</small>
                    </div>
                    <div class="dialog-footer">
                        <button class="close-btn">OK</button>
                    </div>
                `;
                dialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());
            }

        } catch (error) {
            console.error("Erro na função de busca:", error);
            dialog.innerHTML = `<div class="dialog-error"><p>Ocorreu um erro na busca.</p></div>
                                <div class="dialog-footer"><button class="close-btn">Fechar</button></div>`;
            dialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());
        }
    }

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    async function initializeCarousel(containerElement) {
        const carousel = containerElement.querySelector('.carousel');
        const prevBtn = containerElement.querySelector('.prev-btn');
        const nextBtn = containerElement.querySelector('.next-btn');

        const endpoint = containerElement.dataset.endpoint;

        if(!endpoint) {
            return;
        }

        const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=pt-BR&page=1`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Erro na resposta da API');
            
            const data = await response.json();
            const movies = data.results;
            carousel.innerHTML = ''; 

            movies.forEach(movie => {
                if (!movie.poster_path) return;

                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `<button><img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}"></button>`;
                
                movieCard.dataset.movieId = movie.id;
                movieCard.addEventListener('click', () => {
                    showMovieDetails(movie.id);
                });
                
                carousel.appendChild(movieCard);
            });
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            carousel.innerHTML = '<p>Erro ao carregar filmes.</p>';
        }

        nextBtn.addEventListener('click', () => {
            const scrollAmount = carousel.clientWidth;
            carousel.scrollLeft + scrollAmount >= carousel.scrollWidth - carousel.clientWidth
                ? (carousel.scrollLeft = 0)
                : (carousel.scrollLeft += scrollAmount);
        });

        prevBtn.addEventListener('click', () => {
            const scrollAmount = carousel.clientWidth;
            carousel.scrollLeft <= 0
                ? (carousel.scrollLeft = carousel.scrollWidth)
                : (carousel.scrollLeft -= scrollAmount);
        });
    }
    
    async function showMovieDetails(movieId) {
        dialog.innerHTML = '<p style="padding: 20px;">Carregando...</p>';
        dialog.showModal();

        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

        try {
            const response = await fetch(detailsUrl);
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            
            const movie = await response.json();
            populateDialog(movie);
        } catch (error) {
            console.error("Erro ao buscar detalhes:", error);
            dialog.innerHTML = `<div class="dialog-content"><p>Não foi possível carregar os detalhes.</p><small>${error.message}</small></div>
                                <div class="dialog-footer"><button class="close-btn">Fechar</button></div>`;
            dialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());
        }
    }
    
    function populateDialog(movie) {
        const genres = movie.genres.map(g => g.name).join(', ') || "Não informado";
        const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

        dialog.innerHTML = `
            <div class="dialog-content">
                <h2>${movie.title} (${releaseYear})</h2>
                <p><strong>Sinopse:</strong> ${movie.overview || 'Não disponível.'}</p>
                <p><strong>Gêneros:</strong> ${genres}</p>
                <p><strong>Nota:</strong> ${movie.vote_average.toFixed(1)} / 10</p>
            </div>
            <div class="dialog-footer">
                <button class="close-btn">OK</button>
            </div>
        `;
        
        dialog.querySelector('.close-btn').addEventListener('click', () => dialog.close());
    }

    const allCarousels = document.querySelectorAll('.carousel-container');
    allCarousels.forEach(initializeCarousel);

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

});
        