// DOM Elements
const instaCard = document.getElementById('insta-card');
const quoteText = document.getElementById('preview-quote');
const quoteAuthor = document.getElementById('preview-author');

const randomQuoteBtn = document.getElementById('random-quote-btn');
const toggleAuthorBtn = document.getElementById('toggle-author-btn');
const downloadBtn = document.getElementById('download-btn');

const fontBtns = document.querySelectorAll('.font-btn');
const textColorBtns = document.querySelectorAll('.text-color-btn');
const themeBtns = document.querySelectorAll('.theme-btn');

// State
let currentQuote = null;
let currentFont = 'modern';

// Initialize
function init() {
    if (typeof quotes !== 'undefined' && quotes.length > 0) {
        showRandomQuote();
    } else {
        quoteText.textContent = "Error loading quotes.";
    }

    setupEventListeners();
}

function setupEventListeners() {
    // Quote Controls
    randomQuoteBtn.addEventListener('click', showRandomQuote);

    toggleAuthorBtn.addEventListener('click', () => {
        if (quoteAuthor.style.display === 'none') {
            quoteAuthor.style.display = 'block';
        } else {
            quoteAuthor.style.display = 'none';
        }
    });

    // Font Selection
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            fontBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            // Apply Font
            const fontStyle = btn.getAttribute('data-font');
            applyFont(fontStyle);
        });
    });

    // Text Color Selection
    textColorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            instaCard.style.color = color;

            // Also update icon color
            const icon = instaCard.querySelector('.quote-icon');
            if (icon) icon.style.color = color;
        });
    });

    // Theme Selection
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const bg = btn.style.background;
            const theme = btn.getAttribute('data-theme');
            applyTheme(bg, theme);
        });
    });

    // Download
    downloadBtn.addEventListener('click', downloadImage);
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

function applyFont(fontStyle) {
    // Remove existing font classes
    instaCard.classList.remove('font-modern', 'font-classic', 'font-artistic');
    // Add new class
    instaCard.classList.add(`font-${fontStyle}`);

    currentFont = fontStyle;
}

function applyTheme(backgroundValue, themeName) {
    instaCard.style.background = backgroundValue;

    // Auto-adjust text color for legibility
    // Simple heuristic: Pastel themes are light -> use Dark Text
    // Dark themes -> use White Text

    if (themeName.startsWith('pastel')) {
        instaCard.style.color = '#1a1a1a';
        instaCard.querySelector('.quote-icon').style.color = 'rgba(0,0,0,0.6)';
    } else {
        instaCard.style.color = '#ffffff';
        instaCard.querySelector('.quote-icon').style.color = 'rgba(255,255,255,0.7)';
    }
}

async function downloadImage() {
    // Show loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    downloadBtn.disabled = true;

    try {
        // High quality scale (1080x1080)
        // Card is 500px -> Scale = 2.16

        const canvas = await html2canvas(instaCard, {
            scale: 2.16,
            useCORS: true,
            backgroundColor: null
        });

        // Trigger download
        const link = document.createElement('a');
        link.download = `hindi-quote-aesthetic-${Date.now()}.png`;
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
