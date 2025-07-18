/**
 * Social Widget Renderer - Core Library
 * Version: 1.0.0
 * Author: Robert Castro
 * Description: Core library for social media widgets with dynamic module loading
 */

(function() {
    'use strict';

    /**
     * Configuración global del widget
     * @type {Object}
     */
    const CONFIG = {
        API_BASE: 'https://app.ccpapp.xyz',
        API_ENDPOINT: '/social-widgets/render',
        AUTO_INIT: true,
        DEBUG: false,
        SELECTOR: '.social-widget',
        LOADING_CLASS: 'sw-loading',
        LOADED_CLASS: 'sw-loaded',
        ERROR_CLASS: 'sw-error',
        MODULES_PATH: '/social-widget/modules/'
    };

    /**
     * Utilidades generales
     */
    const utils = {
        /**
         * Log de mensajes con control de debug
         * @param {string} message
         * @param {string} type
         */
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

    /**
     * Cliente para la API del backend
     */
    const apiClient = {
        /**
         * Obtiene los datos del widget desde la API
         * @param {string} widgetId
         * @returns {Promise<Object>}
         */
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
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                if (!data.success) {
                    throw new Error(data.message || 'Error al obtener los datos del widget');
                }
                utils.log('Datos del widget obtenidos', 'info');
                return data;
            } catch (error) {
                utils.log(`Error al obtener los datos del widget: ${error.message}`, 'error');
                throw error;
            }
        }
    };

    /**
     * Carga dinámica de módulos JS y CSS
     * @param {string} jsName - Nombre del archivo JS (sin ruta)
     * @param {string} cssName - Nombre del archivo CSS (sin ruta)
     * @param {Function} callback
     */
    function loadModule(jsName, cssName, callback) {
        // Cargar CSS solo si no está ya cargado
        if (cssName && !document.querySelector(`link[href='${CONFIG.MODULES_PATH + cssName}']`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = CONFIG.MODULES_PATH + cssName;
            document.head.appendChild(link);
        }
        // Cargar JS solo si no está ya cargado
        if (jsName && !document.querySelector(`script[src='${CONFIG.MODULES_PATH + jsName}']`)) {
            const script = document.createElement('script');
            script.src = CONFIG.MODULES_PATH + jsName;
            script.onload = callback;
            document.body.appendChild(script);
        } else if (jsName) {
            // Si ya está cargado, llamar callback inmediatamente
            callback && callback();
        }
    }

    /**
     * Objeto principal SocialWidget (Singleton)
     */
    window.SocialWidget = {
        version: '1.0.0',

        /**
         * Inicializa todos los widgets encontrados en la página
         */
        init: function() {
            utils.log('Inicializando SocialWidget');
            this.loadLightbox();
            const widgets = document.querySelectorAll(CONFIG.SELECTOR);
            utils.log(`Encontrados ${widgets.length} widget(s) para inicializar`);
            widgets.forEach((widget, index) => {
                this.renderWidget(widget, index);
            });
        },

        /**
         * Carga el módulo de lightbox (modularizado)
         */
        loadLightbox: function() {
            loadModule('lightbox.js', 'lightbox.css');
        },

        /**
         * Renderiza un widget específico
         * @param {HTMLElement} container
         * @param {number} index
         */
        renderWidget: function(container, index = 0) {
            if (!container) {
                utils.log('No se proporcionó un contenedor para el renderizado del widget', 'error');
                return;
            }
            const widgetId = container.getAttribute('data-widget-id');
            if (!widgetId) {
                utils.log('No se encontró un widget-id en el atributo data-widget-id', 'error');
                this.showError(container, 'Falta el ID del widget');
                return;
            }
            utils.log(`Renderizando widget ${widgetId} en el contenedor ${index}`);
            // Estado loading
            utils.addClass(container, CONFIG.LOADING_CLASS);
            this.showLoading(container);
            // Fetch y render según layout
            apiClient.fetchWidget(widgetId)
                .then(data => {
                    utils.removeClass(container, CONFIG.LOADING_CLASS);
                    utils.addClass(container, CONFIG.LOADED_CLASS);
                    const layout = data.widget && data.widget.layout ? data.widget.layout : 'grid';
                    if (layout === 'slider') {
                        loadModule('slider.js', 'slider.css', function() {
                            if (window.SocialWidget && window.SocialWidget.Modules && typeof window.SocialWidget.Modules.Slider?.render === 'function') {
                                window.SocialWidget.Modules.Slider.render(container, data);
                            } else {
                                utils.log('No se encontró el renderizador de Slider después de cargar', 'error');
                            }
                        });
                    } else if (layout === 'grid-2') {
                        loadModule('grid-2.js', 'grid-2.css', function() {
                            if (window.SocialWidget && window.SocialWidget.Modules && typeof window.SocialWidget.Modules.Grid2?.render === 'function') {
                                window.SocialWidget.Modules.Grid2.render(container, data);
                            } else {
                                utils.log('No se encontró el renderizador de Grid-2 después de cargar', 'error');
                            }
                        });
                    } else {
                        // Fallback a grid clásico
                        loadModule('grid.js', 'grid.css', function() {
                            if (window.SocialWidget && window.SocialWidget.Modules && typeof window.SocialWidget.Modules.Grid?.render === 'function') {
                                window.SocialWidget.Modules.Grid.render(container, data);
                            } else {
                                utils.log('No se encontró el renderizador de Grid después de cargar', 'error');
                            }
                        });
                    }
                })
                .catch(error => {
                    utils.removeClass(container, CONFIG.LOADING_CLASS);
                    utils.addClass(container, CONFIG.ERROR_CLASS);
                    this.showError(container, error.message);
                    utils.log(`Error al renderizar el widget ${widgetId}: ${error.message}`, 'error');
                });
        },

        /**
         * Muestra el estado de loading
         * @param {HTMLElement} container
         */
        showLoading: function(container) {
            container.innerHTML = `
                <div class="sw-loading-container">
                    <div class="sw-loading-spinner"></div>
                </div>
            `;
        },

        /**
         * Muestra el estado de error
         * @param {HTMLElement} container
         * @param {string} message
         */
        showError: function(container, message) {
            console.log(message);
        },

        /**
         * Limpia y destruye el widget
         * @param {string|HTMLElement} containerSelector
         */
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

    /**
     * Inicialización automática (auto-discovery)
     */
    function autoInit() {
        if (CONFIG.AUTO_INIT) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    window.SocialWidget.init();
                });
            } else {
                window.SocialWidget.init();
            }
            window.addEventListener('load', () => {
                const uninitializedWidgets = document.querySelectorAll(`${CONFIG.SELECTOR}:not(.${CONFIG.LOADED_CLASS}):not(.${CONFIG.LOADING_CLASS}):not(.${CONFIG.ERROR_CLASS})`);
                if (uninitializedWidgets.length > 0) {
                    utils.log(`Encontrados ${uninitializedWidgets.length} widget(s) sin inicializar después de la carga de la ventana`);
                    uninitializedWidgets.forEach((widget, index) => {
                        window.SocialWidget.renderWidget(widget, index);
                    });
                }
            });
        }
    }

    // Inicializar al cargar el script
    autoInit();
    utils.log('Biblioteca SocialWidget cargada correctamente');

})();