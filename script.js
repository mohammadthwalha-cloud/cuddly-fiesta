// Random Joke Generator using JokeAPI

const jokeText = document.getElementById('jokeText');
const jokeBtn = document.getElementById('jokeBtn');
const nextBtn = document.getElementById('nextBtn');
const loading = document.getElementById('loading');

// API endpoint - Using JokeAPI (free, no authentication required)
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any';

// Function to fetch and display a joke
async function getJoke() {
    try {
        // Show loading state
        loading.style.display = 'block';
        jokeText.style.opacity = '0.5';
        jokeBtn.disabled = true;
        nextBtn.disabled = true;

        // Fetch joke from API
        const response = await fetch(JOKE_API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();

        // Display the joke
        if (data.type === 'single') {
            // Single joke
            jokeText.textContent = data.joke;
        } else if (data.type === 'twopart') {
            // Two-part joke (setup and delivery)
            jokeText.textContent = `${data.setup}\n\n${data.delivery}`;
        }

        // Hide loading state
        loading.style.display = 'none';
        jokeText.style.opacity = '1';

    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeText.textContent = `Oops! Could not fetch a joke. Error: ${error.message}`;
        loading.style.display = 'none';
        jokeText.style.opacity = '1';
    } finally {
        jokeBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Event listeners
jokeBtn.addEventListener('click', getJoke);
nextBtn.addEventListener('click', getJoke);

// Load a joke when the page loads
window.addEventListener('load', getJoke);