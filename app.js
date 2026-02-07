// Quotes are loaded from quotes.js via index.html


// DOM Elements
const quoteCard = document.getElementById('quoteCard');
const quoteText = document.getElementById('quoteText');
const writerName = document.getElementById('writerName');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Track current quote index to avoid repetition
let currentQuoteIndex = -1;

// Get a random quote (different from current)
function getRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);

    currentQuoteIndex = newIndex;
    return quotes[newIndex];
}

// Display quote with animation
function displayQuote(quote) {
    // Add changing class for exit animation
    quoteCard.classList.add('changing');

    setTimeout(() => {
        quoteText.textContent = quote.text;
        writerName.textContent = `— ${quote.writer}`;

        // Remove changing class to trigger enter animation
        quoteCard.classList.remove('changing');

        // Force reflow for animation restart
        quoteText.style.animation = 'none';
        writerName.style.animation = 'none';
        quoteText.offsetHeight; // Trigger reflow
        quoteText.style.animation = '';
        writerName.style.animation = '';
    }, 300);
}

// Show toast notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Copy quote to clipboard
async function copyQuote() {
    const quote = quotes[currentQuoteIndex];
    const textToCopy = `"${quote.text}"\n\n— ${quote.writer}`;

    try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('कॉपी हो गया! ✓');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('कॉपी हो गया! ✓');
    }
}

// Share quote
async function shareQuote() {
    const quote = quotes[currentQuoteIndex];
    const shareData = {
        title: 'हिंदी विचार',
        text: `"${quote.text}"\n\n— ${quote.writer}`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard with share message
            await navigator.clipboard.writeText(shareData.text);
            showToast('शेयर के लिए कॉपी हो गया! 📋');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            showToast('कुछ गड़बड़ हो गई 😕');
        }
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => {
    const quote = getRandomQuote();
    displayQuote(quote);
});

copyBtn.addEventListener('click', copyQuote);
shareBtn.addEventListener('click', shareQuote);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement === document.body) {
            e.preventDefault();
            const quote = getRandomQuote();
            displayQuote(quote);
        }
    }
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        copyQuote();
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

quoteCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

quoteCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        const quote = getRandomQuote();
        displayQuote(quote);
    }
}

// Initialize with first random quote
window.addEventListener('DOMContentLoaded', () => {
    const quote = getRandomQuote();
    quoteText.textContent = quote.text;
    writerName.textContent = `— ${quote.writer}`;
});
