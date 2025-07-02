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
            
            // Create header if title exists
            if (widget.settings && widget.settings.title) {
                const header = document.createElement('div');
                header.className = 'sw-widget-header';
                header.innerHTML = `<h3 class="sw-widget-title">${widget.settings.title}</h3>`;
                widgetWrapper.appendChild(header);
            }

            // Create grid container
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

            // Render posts
            if (posts && posts.length > 0) {
                posts.forEach((post, index) => {
                    const postElement = this.createPostElement(post, index);
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

        createPostElement: function(post, index) {
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
            const overlay = document.createElement('div');
            overlay.className = 'sw-post-overlay';

            // Platform icon
            const platformIcon = document.createElement('div');
            platformIcon.className = `sw-platform-icon sw-platform-${post.platform}`;
            platformIcon.innerHTML = post.platform === 'tiktok' ? '🎵' : '📷';

            // Post metrics
            const metrics = document.createElement('div');
            metrics.className = 'sw-post-metrics';
            if (post.metrics) {
                metrics.innerHTML = `
                    <span class="sw-metric">👀 ${this.formatNumber(post.metrics.views || 0)}</span>
                    <span class="sw-metric">❤️ ${this.formatNumber(post.metrics.likes || 0)}</span>
                `;
            }

            overlay.appendChild(platformIcon);
            overlay.appendChild(metrics);

            postElement.appendChild(imageContainer);
            postElement.appendChild(overlay);

            // Add click handler for future lightbox functionality
            postElement.addEventListener('click', (e) => {
                e.preventDefault();
                utils.log(`Post clicked: ${post.id}`, 'info');
                // TODO: Implement lightbox functionality
                this.handlePostClick(post, postElement);
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