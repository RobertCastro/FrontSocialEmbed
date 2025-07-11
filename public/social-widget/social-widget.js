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

    // Widget Renderer - Removed grid functionality (moved to social-widget-grid.js)
    const renderer = {
        // Grid functionality moved to social-widget-grid.js
    };

    // Loader dinámico de layouts
    function loadScriptAndStyle(jsUrl, cssUrl, callback) {
        // Cargar CSS solo si no está ya cargado
        if (cssUrl && !document.querySelector(`link[href='${cssUrl}']`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssUrl;
            document.head.appendChild(link);
        }
        // Cargar JS solo si no está ya cargado
        if (jsUrl && !document.querySelector(`script[src='${jsUrl}']`)) {
            const script = document.createElement('script');
            script.src = jsUrl;
            script.onload = callback;
            document.body.appendChild(script);
        } else if (jsUrl) {
            // Si ya está cargado, llamar callback inmediatamente
            callback && callback();
        }
    }

    // Main SocialWidget object (Singleton pattern like EmbedSocial)
    window.SocialWidget = {
        version: '1.0.0',
        
        // Initialize all widgets found on page
        init: function() {
            utils.log('Initializing SocialWidget');
            
            // Load lightbox first
            this.loadLightbox();
            
            const widgets = document.querySelectorAll(CONFIG.SELECTOR);
            utils.log(`Found ${widgets.length} widget(s) to initialize`);
            
            widgets.forEach((widget, index) => {
                this.renderWidget(widget, index);
            });
        },

        // Load lightbox functionality
        loadLightbox: function() {
            // Load lightbox CSS
            if (!document.querySelector('link[href="/social-widget/social-widget-lightbox.css"]')) {
                const lightboxCSS = document.createElement('link');
                lightboxCSS.rel = 'stylesheet';
                lightboxCSS.href = '/social-widget/social-widget-lightbox.css';
                document.head.appendChild(lightboxCSS);
            }
            
            // Load lightbox JS
            if (!document.querySelector('script[src="/social-widget/social-widget-lightbox.js"]')) {
                const lightboxJS = document.createElement('script');
                lightboxJS.src = '/social-widget/social-widget-lightbox.js';
                document.body.appendChild(lightboxJS);
            }
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
                    // Loader dinámico según layout
                    const layout = data.widget && data.widget.layout ? data.widget.layout : 'grid';
                    if (layout === 'slider') {
                        loadScriptAndStyle(
                            '/social-widget/social-widget-slider.js',
                            '/social-widget/social-widget-slider.css',
                            function() {
                                if (window.SocialWidgetSlider && typeof window.SocialWidgetSlider.render === 'function') {
                                    window.SocialWidgetSlider.render(container, data);
                                } else {
                                    utils.log('Slider renderer not found after loading', 'error');
                                }
                            }
                        );
                    } else if (layout === 'grid') {
                        loadScriptAndStyle(
                            '/social-widget/social-widget-grid.js',
                            '/social-widget/social-widget-grid.css',
                            function() {
                                if (window.SocialWidgetGrid && typeof window.SocialWidgetGrid.render === 'function') {
                                    window.SocialWidgetGrid.render(container, data);
                                } else {
                                    utils.log('Grid renderer not found after loading', 'error');
                                }
                            }
                        );
                    } else {
                        // Fallback to grid for unknown layouts
                        loadScriptAndStyle(
                            '/social-widget/social-widget-grid.js',
                            '/social-widget/social-widget-grid.css',
                            function() {
                                if (window.SocialWidgetGrid && typeof window.SocialWidgetGrid.render === 'function') {
                                    window.SocialWidgetGrid.render(container, data);
                                } else {
                                    utils.log('Grid renderer not found after loading', 'error');
                                }
                            }
                        );
                    }
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