/**
 * Social Widget Renderer - Core Library
 * Inspired by EmbedSocial architecture but simplified for direct DOM rendering
 * Version: 1.0.0
 * Author: Robert Castro
 */

(function() {
    'use strict';

    // Global configuration
    const CONFIG = {
        API_BASE: 'https://app.ccpapp.xyz',
        API_ENDPOINT: '/social-widgets/render',
        AUTO_INIT: true,
        DEBUG: true,
        SELECTOR: '.social-widget',
        LOADING_CLASS: 'sw-loading',
        LOADED_CLASS: 'sw-loaded',
        ERROR_CLASS: 'sw-error'
    };

    // Utility functions
    const utils = {
        log: function(message, type = 'info') {
            if (CONFIG.DEBUG) {
                console[type]('[SocialWidget]', message);
            }
        },

        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        addClass: function(element, className) {
            if (element && element.classList) {
                element.classList.add(className);
            }
        },

        removeClass: function(element, className) {
            if (element && element.classList) {
                element.classList.remove(className);
            }
        },

        hasClass: function(element, className) {
            return element && element.classList && element.classList.contains(className);
        }
    };

    // API Client
    const apiClient = {
        async fetchWidget(widgetId) {
            try {
                utils.log(`Fetching widget data for ID: ${widgetId}`);
                
                const response = await fetch(`${CONFIG.API_BASE}${CONFIG.API_ENDPOINT}/${widgetId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(data.message || 'API returned unsuccessful response');
                }

                utils.log('Widget data fetched successfully', 'info');
                return data;

            } catch (error) {
                utils.log(`Error fetching widget: ${error.message}`, 'error');
                throw error;
            }
        }
    };

    // Widget Renderer
    const renderer = {
        renderGrid: function(container, widgetData) {
            const { widget, account, posts } = widgetData;
            
            // Create widget wrapper
            const widgetWrapper = document.createElement('div');
            widgetWrapper.className = 'sw-widget-wrapper';
            
            // --- HEADER ---
            const header = document.createElement('div');
            header.className = 'sw-widget-header sw-custom-header';
            // Icono de red
            const iconSVG = account.platform === 'tiktok'
                ? `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#000"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="#fff"/></svg>`
                : `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>`;
            const accountName = `<span class="sw-account-name">${account.displayName || account.username}</span>`;
            const followUrl = account.platform === 'tiktok'
                ? `https://www.tiktok.com/@${account.username}`
                : `https://instagram.com/${account.username}`;
            const followBtn = `<a href="${followUrl}" target="_blank" rel="noopener" class="sw-follow-btn">Síguenos</a>`;
            header.innerHTML = `<div class="sw-header-left">${iconSVG}${accountName}</div><div class="sw-header-right">${followBtn}</div>`;
            widgetWrapper.appendChild(header);

            // --- GRID ---
            const gridContainer = document.createElement('div');
            gridContainer.className = 'sw-grid-container';
            
            // Apply custom styles if provided
            if (widget.settings) {
                const settings = widget.settings;
                if (settings.backgroundColor) {
                    gridContainer.style.backgroundColor = settings.backgroundColor;
                }
                if (settings.width) {
                    gridContainer.style.width = settings.width;
                }
                if (settings.height && settings.height !== 'auto') {
                    gridContainer.style.height = settings.height;
                }
            }

            this._currentPostsArr = posts;
            this._currentAccountObj = account;
            if (posts && posts.length > 0) {
                posts.forEach((post, index) => {
                    const postElement = this.createPostElement(post, index, account, posts);
                    gridContainer.appendChild(postElement);
                });
            } else {
                // Empty state
                const emptyState = document.createElement('div');
                emptyState.className = 'sw-empty-state';
                emptyState.innerHTML = '<p>No posts available</p>';
                gridContainer.appendChild(emptyState);
            }

            widgetWrapper.appendChild(gridContainer);
            
            // Create metadata footer
            if (widgetData.metadata) {
                const footer = document.createElement('div');
                footer.className = 'sw-widget-footer';
                footer.innerHTML = `
                    <small class="sw-metadata">
                        ${account.platform} • ${posts.length} posts • 
                        Last updated: ${new Date(widgetData.metadata.lastSync).toLocaleDateString()}
                    </small>
                `;
                widgetWrapper.appendChild(footer);
            }

            return widgetWrapper;
        },

        createPostElement: function(post, index, account, postsArr) {
            const postElement = document.createElement('div');
            postElement.className = 'sw-post-item';
            postElement.setAttribute('data-post-id', post.id);
            postElement.setAttribute('data-post-index', index);

            // Create image container with lazy loading
            const imageContainer = document.createElement('div');
            imageContainer.className = 'sw-post-image-container';

            const image = document.createElement('img');
            image.className = 'sw-post-image';
            image.setAttribute('data-src', post.thumbnail); // Lazy loading
            image.alt = post.title || 'Social media post';
            image.loading = 'lazy';

            // Placeholder while loading
            image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

            // Load actual image
            const actualImage = new Image();
            actualImage.onload = function() {
                image.src = post.thumbnail;
                utils.addClass(image, 'sw-loaded');
            };
            actualImage.onerror = function() {
                // Fallback image
                image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2FhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg==';
                utils.addClass(image, 'sw-error');
            };
            actualImage.src = post.thumbnail;

            imageContainer.appendChild(image);

            // Create overlay with post info
            const infoBar = document.createElement('div');
            infoBar.className = 'sw-post-infobar';
            // Logo de red
            const iconSVG = account.platform === 'tiktok'
                ? `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#000"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="#fff"/></svg>`
                : `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>`;
            // Nombre de usuario
            const user = `<span class="sw-post-user">${account.username}</span>`;
            // Tiempo relativo
            const time = `<span class="sw-post-time">${this.timeAgo(post.timestamp)}</span>`;
            // Logo de red a la derecha
            const rightIcon = `<span class="sw-post-platform">${iconSVG}</span>`;
            infoBar.innerHTML = `<span class="sw-post-logo">${iconSVG}</span>${user}${time}${rightIcon}`;
            // --- Overlay hover ---
            const overlay = document.createElement('div');
            overlay.className = 'sw-post-overlay sw-custom-overlay';
            overlay.innerHTML = `<div class="sw-overlay-center">${iconSVG}</div><div class="sw-overlay-desc">${this.truncate(post.description || post.title || '', 60)}</div><div class="sw-overlay-user">${user}${iconSVG}</div>`;

            postElement.appendChild(imageContainer);
            postElement.appendChild(infoBar);
            postElement.appendChild(overlay);

            // Add click handler for future lightbox functionality
            postElement.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.SocialWidget && window.SocialWidget.Lightbox && typeof window.SocialWidget.Lightbox.open === 'function') {
                    window.SocialWidget.Lightbox.open(index, this._currentPostsArr || [], this._currentAccountObj || {});
                } else {
                    this.handlePostClick(post, postElement);
                }
            });

            return postElement;
        },

        formatNumber: function(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        },

        handlePostClick: function(post, element) {
            // For now, just open the original URL
            if (post.url) {
                window.open(post.url, '_blank', 'noopener,noreferrer');
            }
        },

        timeAgo: function(dateString) {
            const now = new Date();
            const date = new Date(dateString);
            const diff = Math.floor((now - date) / 1000);
            if (diff < 60) return `${diff}s ago`;
            if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
            if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
            if (diff < 2592000) return `${Math.floor(diff/86400)} days ago`;
            return date.toLocaleDateString();
        },

        truncate: function(str, n) {
            return str.length > n ? str.substr(0, n-1) + '…' : str;
        }
    };

    // Main SocialWidget object (Singleton pattern like EmbedSocial)
    window.SocialWidget = {
        version: '1.0.0',
        
        // Initialize all widgets found on page
        init: function() {
            utils.log('Initializing SocialWidget');
            
            const widgets = document.querySelectorAll(CONFIG.SELECTOR);
            utils.log(`Found ${widgets.length} widget(s) to initialize`);
            
            widgets.forEach((widget, index) => {
                this.renderWidget(widget, index);
            });
        },

        // Render specific widget
        renderWidget: function(container, index = 0) {
            if (!container) {
                utils.log('No container provided for widget rendering', 'error');
                return;
            }

            const widgetId = container.getAttribute('data-widget-id');
            if (!widgetId) {
                utils.log('No widget-id found in data-widget-id attribute', 'error');
                this.showError(container, 'Missing widget ID');
                return;
            }

            utils.log(`Rendering widget ${widgetId} in container ${index}`);
            
            // Set loading state
            utils.addClass(container, CONFIG.LOADING_CLASS);
            this.showLoading(container);

            // Fetch and render widget
            apiClient.fetchWidget(widgetId)
                .then(data => {
                    utils.removeClass(container, CONFIG.LOADING_CLASS);
                    utils.addClass(container, CONFIG.LOADED_CLASS);
                    
                    const renderedWidget = renderer.renderGrid(container, data);
                    container.innerHTML = '';
                    container.appendChild(renderedWidget);
                    
                    utils.log(`Widget ${widgetId} rendered successfully`);
                })
                .catch(error => {
                    utils.removeClass(container, CONFIG.LOADING_CLASS);
                    utils.addClass(container, CONFIG.ERROR_CLASS);
                    
                    this.showError(container, error.message);
                    utils.log(`Failed to render widget ${widgetId}: ${error.message}`, 'error');
                });
        },

        // Manual render method (for programmatic use)
        render: function(widgetId, containerSelector, options = {}) {
            const container = typeof containerSelector === 'string' 
                ? document.querySelector(containerSelector)
                : containerSelector;
                
            if (!container) {
                utils.log(`Container not found: ${containerSelector}`, 'error');
                return;
            }

            // Set widget ID if not present
            if (!container.getAttribute('data-widget-id')) {
                container.setAttribute('data-widget-id', widgetId);
            }

            // Add social-widget class if not present
            if (!utils.hasClass(container, 'social-widget')) {
                utils.addClass(container, 'social-widget');
            }

            this.renderWidget(container);
        },

        showLoading: function(container) {
            container.innerHTML = `
                <div class="sw-loading-container">
                    <div class="sw-loading-spinner"></div>
                    <p class="sw-loading-text">Loading social content...</p>
                </div>
            `;
        },

        showError: function(container, message) {
            container.innerHTML = `
                <div class="sw-error-container">
                    <div class="sw-error-icon">⚠️</div>
                    <p class="sw-error-text">Failed to load social widget</p>
                    <small class="sw-error-details">${message}</small>
                </div>
            `;
        },

        // Destroy widget
        destroy: function(containerSelector) {
            const container = typeof containerSelector === 'string' 
                ? document.querySelector(containerSelector)
                : containerSelector;
                
            if (container) {
                container.innerHTML = '';
                utils.removeClass(container, CONFIG.LOADING_CLASS);
                utils.removeClass(container, CONFIG.LOADED_CLASS);
                utils.removeClass(container, CONFIG.ERROR_CLASS);
            }
        }
    };

    // Auto-initialization (similar to EmbedSocial's pattern)
    function autoInit() {
        if (CONFIG.AUTO_INIT) {
            // Try immediate initialization
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    window.SocialWidget.init();
                });
            } else {
                // DOM already ready
                window.SocialWidget.init();
            }

            // Also try after window load (for dynamic content)
            window.addEventListener('load', () => {
                // Re-scan for any widgets that might have been added dynamically
                const uninitializedWidgets = document.querySelectorAll(`${CONFIG.SELECTOR}:not(.${CONFIG.LOADED_CLASS}):not(.${CONFIG.LOADING_CLASS}):not(.${CONFIG.ERROR_CLASS})`);
                if (uninitializedWidgets.length > 0) {
                    utils.log(`Found ${uninitializedWidgets.length} uninitialized widget(s) after window load`);
                    uninitializedWidgets.forEach((widget, index) => {
                        window.SocialWidget.renderWidget(widget, index);
                    });
                }
            });
        }
    }

    // Initialize when script loads
    autoInit();

    utils.log('SocialWidget library loaded successfully');

})();