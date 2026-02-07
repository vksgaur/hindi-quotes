// DOM Elements
const instaCard = document.getElementById('insta-card');
const quoteText = document.getElementById('preview-quote');
const quoteAuthor = document.getElementById('preview-author');
const randomQuoteBtn = document.getElementById('random-quote-btn');
const downloadBtn = document.getElementById('download-btn');
const colorBtns = document.querySelectorAll('.color-btn');

// State
let currentQuote = null;

// Initialize
function init() {
    if (typeof quotes !== 'undefined' && quotes.length > 0) {
        showRandomQuote();
    } else {
        quoteText.textContent = "Error loading quotes.";
    }

    // Event Listeners
    randomQuoteBtn.addEventListener('click', showRandomQuote);
    downloadBtn.addEventListener('click', downloadImage);

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.getAttribute('data-style');
            const bg = btn.style.background;
            applyStyle(style, bg);
        });
    });
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];

    // Update DOM with animation
    instaCard.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = currentQuote.text;
        quoteAuthor.textContent = `- ${currentQuote.writer}`;
        instaCard.style.opacity = '1';
    }, 200);
}

function applyStyle(styleName, backgroundValue) {
    instaCard.style.background = backgroundValue;

    // Reset specific text colors if needed
    if (styleName === 'solid-dark') {
        instaCard.style.color = '#fff';
    } else if (styleName === 'glass') {
        instaCard.style.backdropFilter = 'blur(10px)';
        instaCard.style.webkitBackdropFilter = 'blur(10px)';
    }
}

async function downloadImage() {
    // Show loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    downloadBtn.disabled = true;

    try {
        // High quality scale
        // We want 1080x1080 output. 
        // The card is 500x500 on screen. 
        // Scale = 1080 / 500 = 2.16

        const canvas = await html2canvas(instaCard, {
            scale: 2.16, // Scale up for 1080p
            useCORS: true, // For images if we add them later
            backgroundColor: null // Transparent background handling
        });

        // Trigger download
        const link = document.createElement('a');
        link.download = `hindi-quote-post-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

    } catch (err) {
        console.error("Error generating image:", err);
        alert("Failed to generate image. Please try again.");
    } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);
