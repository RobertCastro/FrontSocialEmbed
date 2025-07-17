/**
 * Social Widget Grid Layout Module
 * Version: 1.0.0
 * Author: Robert Castro
 * Description: Grid layout renderer for social media posts
 */
(function() {
  if (!window.SocialWidget) window.SocialWidget = {};
  if (!window.SocialWidget.Modules) window.SocialWidget.Modules = {};

  /**
   * Renderiza el layout grid para el widget social
   * @param {HTMLElement} container - Contenedor donde renderizar
   * @param {Object} widgetData - Datos del widget desde la API
   */
  function render(container, widgetData) {
    container.innerHTML = '';
    const { widget, account, posts } = widgetData;

    // Wrapper principal
    const widgetWrapper = document.createElement('div');
    widgetWrapper.className = 'sw-widget-wrapper';

    // --- HEADER ---
    const header = document.createElement('div');
    header.className = 'sw-widget-header sw-custom-header';
    // Avatar con fallback a inicial
    const avatarImg = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-header-avatar" alt="${account.displayName || account.username}" />` : `<div class="sw-header-avatar-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
    const accountName = `<span class="sw-account-name">${account.displayName || account.username}</span>`;
    const followUrl = account.platform === 'tiktok'
      ? `https://www.tiktok.com/@${account.username}`
      : `https://instagram.com/${account.username}`;
    const followBtn = `<a href="${followUrl}" target="_blank" rel="noopener" class="sw-follow-btn">Síguenos</a>`;
    header.innerHTML = `<div class="sw-header-left">${avatarImg}${accountName}</div><div class="sw-header-right">${followBtn}</div>`;
    widgetWrapper.appendChild(header);

    // --- GRID ---
    const gridContainer = document.createElement('div');
    gridContainer.className = 'sw-grid-container';

    // Estilos custom (usando variables CSS si aplica)
    if (widget.settings) {
      const settings = widget.settings;
      if (settings.backgroundColor) {
        gridContainer.style.backgroundColor = `var(--sw-bg, ${settings.backgroundColor})`;
      }
      if (settings.width) {
        gridContainer.style.width = settings.width;
      }
      if (settings.height && settings.height !== 'auto') {
        gridContainer.style.height = settings.height;
      }
    }

    // Guardar datos actuales para lightbox
    window.SocialWidget.Modules.Grid._currentPostsArr = posts;
    window.SocialWidget.Modules.Grid._currentAccountObj = account;

    if (posts && posts.length > 0) {
      posts.forEach((post, index) => {
        const postElement = createPostElement(post, index, account, posts);
        gridContainer.appendChild(postElement);
      });
    } else {
      // Estado vacío
      const emptyState = document.createElement('div');
      emptyState.className = 'sw-empty-state';
      emptyState.innerHTML = '<p>No posts available</p>';
      gridContainer.appendChild(emptyState);
    }

    widgetWrapper.appendChild(gridContainer);

    // Footer de metadata
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

    // Avatar para lightbox
    if (window.SocialWidget && window.SocialWidget.Lightbox) {
      window.SocialWidget.Lightbox._avatarUrl = account.avatarUrl || '';
    }

    container.appendChild(widgetWrapper);
  }

  /**
   * Crea un elemento de post para el grid
   * @param {Object} post
   * @param {number} index
   * @param {Object} account
   * @param {Array} postsArr
   * @returns {HTMLElement}
   */
  function createPostElement(post, index, account, postsArr) {
    const postElement = document.createElement('div');
    postElement.className = 'sw-post-item';
    postElement.setAttribute('data-post-id', post.id);
    postElement.setAttribute('data-post-index', index);

    // Imagen con lazy loading y placeholder
    const imageContainer = document.createElement('div');
    imageContainer.className = 'sw-post-image-container';
    const image = document.createElement('img');
    image.className = 'sw-post-image';
    image.setAttribute('data-src', post.thumbnail);
    image.alt = post.title || 'Social media post';
    image.loading = 'lazy';
    image.src = 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="%23f3f3f3"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em">Loading...</text></svg>';
    const actualImage = new window.Image();
    actualImage.onload = function() {
      image.src = post.thumbnail;
      image.classList.add('sw-loaded');
    };
    actualImage.onerror = function() {
      image.src = 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="%23e0e0e0"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="%23aaa" text-anchor="middle" dy=".3em">No image</text></svg>';
      image.classList.add('sw-error');
    };
    actualImage.src = post.thumbnail;
    imageContainer.appendChild(image);

    // Barra de info inferior
    const infoBar = document.createElement('div');
    infoBar.className = 'sw-post-infobar';
    const avatarCard = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-post-avatar" alt="${account.displayName || account.username}" />` : `<div class="sw-post-avatar-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
    const userBlock = `
      <div class="sw-post-userblock">
        <div class="sw-post-displayname">${account.displayName || account.username}</div>
        <div class="sw-post-time">${timeAgo(post.timestamp)}</div>
      </div>
    `;
    const rightIcon = `<span class="sw-post-platform sw-post-platform-corner">${account.platform === 'tiktok' ? tiktokIcon() : instagramIcon()}</span>`;
    infoBar.innerHTML = `${avatarCard}${userBlock}${rightIcon}`;

    // Overlay en hover (solo icono, texto y usuario/avatar centrados)
    const overlay = document.createElement('div');
    overlay.className = 'sw-post-overlay sw-custom-overlay';
    overlay.innerHTML = `
      <div class="sw-overlay-center">${account.platform === 'tiktok' ? tiktokIcon(48) : instagramIcon(48)}</div>
      <div class="sw-overlay-desc">${truncate(post.description || post.title || '', 60)}</div>
      <div class="sw-overlay-user">${avatarCard}<span class="sw-overlay-displayname">${account.displayName || account.username}</span></div>
    `;

    postElement.appendChild(imageContainer);
    postElement.appendChild(infoBar);
    postElement.appendChild(overlay);

    // Click para lightbox
    postElement.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.SocialWidget && window.SocialWidget.Modules && window.SocialWidget.Modules.Lightbox && typeof window.SocialWidget.Modules.Lightbox.open === 'function') {
        window.SocialWidget.Modules.Lightbox.open(index, window.SocialWidget.Modules.Grid._currentPostsArr || [], window.SocialWidget.Modules.Grid._currentAccountObj || {});
      } else {
        handlePostClick(post, postElement);
      }
    });
    return postElement;
  }

  /**
   * Fallback: abrir URL original si no hay lightbox
   */
  function handlePostClick(post, element) {
    if (post.url) {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Formatea tiempo relativo
   */
  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff/86400)} days ago`;
    return date.toLocaleDateString();
  }

  /**
   * Trunca texto a n caracteres
   */
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n-1) + '…' : str;
  }

  /**
   * SVG TikTok icon (usa variables CSS)
   */
  function tiktokIcon(size = 24) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="var(--sw-tiktok, #000)"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="var(--sw-white, #fff)"/></svg>`;
  }

  /**
   * SVG Instagram icon (usa variables CSS)
   */
  function instagramIcon(size = 24) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="var(--sw-white, #fff)"/></svg>`;
  }

  // Exportar módulo grid
  window.SocialWidget.Modules.Grid = { render };
})(); 