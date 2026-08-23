// Favorites functionality
class FavoritesManager {
    constructor() {
        this.storageKey = 'directoryFavorites';
        this.init();
    }

    init() {
        // Initialize favorites from localStorage
        this.loadFavorites();
        
        // Add event listeners to all favorite buttons
        document.addEventListener('click', (e) => {
            const favoriteBtn = e.target.closest('.favorite-btn');
            if (favoriteBtn) {
                console.log('⭐ Favorite button clicked!');
                console.log('📄 Button data:', {
                    listingId: favoriteBtn.dataset.listingId,
                    title: favoriteBtn.dataset.title,
                    element: favoriteBtn
                });
                
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(favoriteBtn);
            }
        });

        // Update UI on page load
        this.updateAllButtons();
    }

    loadFavorites() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.favorites = stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('Error loading favorites from localStorage:', e);
            this.favorites = {};
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        } catch (e) {
            console.warn('Error saving favorites to localStorage:', e);
        }
    }

    toggleFavorite(button) {
        console.log('🔄 Toggling favorite...');
        
        const listingId = button.dataset.listingId;
        const title = button.dataset.title;
        
        console.log('📊 Toggle data:', { listingId, title, currentlyFavorited: this.isFavorited(listingId) });

        if (this.isFavorited(listingId)) {
            // Remove from favorites
            delete this.favorites[listingId];
            button.classList.remove('favorited');
            button.setAttribute('aria-label', 'Add to favorites');
            this.showToast(`Removed "${title}" from favorites`, 'removed');
            console.log('✅ Removed from favorites');
        } else {
            // Add to favorites
            this.favorites[listingId] = {
                id: listingId,
                title: title,
                timestamp: Date.now()
            };
            button.classList.add('favorited', 'just-favorited');
            button.setAttribute('aria-label', 'Remove from favorites');
            this.showToast(`Added "${title}" to favorites`, 'added');
            console.log('✅ Added to favorites');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                button.classList.remove('just-favorited');
            }, 300);
        }

        this.saveFavorites();
    }

    isFavorited(listingId) {
        return listingId in this.favorites;
    }

    updateAllButtons() {
        document.querySelectorAll('.favorite-btn').forEach(button => {
            const listingId = button.dataset.listingId;
            if (this.isFavorited(listingId)) {
                button.classList.add('favorited');
                button.setAttribute('aria-label', 'Remove from favorites');
            } else {
                button.classList.remove('favorited');
                button.setAttribute('aria-label', 'Add to favorites');
            }
        });
    }

    getFavorites() {
        return Object.values(this.favorites).sort((a, b) => b.timestamp - a.timestamp);
    }

    getFavoriteCount() {
        return Object.keys(this.favorites).length;
    }

    showToast(message, type) {
        // Remove any existing toast
        const existingToast = document.querySelector('.favorites-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `favorites-toast ${type}`;
        toast.textContent = message;

        // Add to page
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Method to export favorites (useful for debugging or user export)
    exportFavorites() {
        return JSON.stringify(this.getFavorites(), null, 2);
    }

    // Method to clear all favorites
    clearAllFavorites() {
        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = {};
            this.saveFavorites();
            this.updateAllButtons();
            this.showToast('All favorites cleared', 'removed');
        }
    }
}

// Toast styles (can be added to your CSS)
const toastStyles = `
.favorites-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 1000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 5500;
}

.favorites-toast.show {
    opacity: 1;
    transform: translateX(0);
}

.favorites-toast.added {
    background: #22c55e;
    z-index: 5500;
}

.favorites-toast.removed {
    background: #ef4444;
    z-index: 5500;
}
`;

// Add toast styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Initialize favorites manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
});

// Optional: Expose some methods globally for console debugging
window.getFavorites = () => window.favoritesManager?.getFavorites();
window.clearFavorites = () => window.favoritesManager?.clearAllFavorites();