/**
 * Social Widget Slider Module
 * Version: 1.0.0
 * Author: Robert Castro
 * Description: Slider/carrusel layout for social media posts
 */
(function() {
  if (!window.SocialWidget) window.SocialWidget = {};
  if (!window.SocialWidget.Modules) window.SocialWidget.Modules = {};

  /**
   * Renderiza el layout slider/carrusel para el widget social
   * @param {HTMLElement} container - Contenedor donde renderizar
   * @param {Object} widgetData - Datos del widget desde la API
   */
  function render(container, widgetData) {
    container.innerHTML = '';
    const { widget, account, posts } = widgetData;
    // Wrapper principal
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'sw-slider-main';
    // Header (logo/avatar, usuario, botón)
    const header = document.createElement('div');
    header.className = 'sw-slider-header';
    // Avatar con fallback a inicial
    const avatarImg = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-slider-avatar" alt="${account.displayName || account.username}" />` : `<div class="sw-slider-avatar-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
    const accountName = `<span class="sw-slider-account-name">${account.displayName || account.username}</span>`;
    const followUrl = account.platform === 'tiktok'
      ? `https://www.tiktok.com/@${account.username}`
      : `https://instagram.com/${account.username}`;
    const followBtn = `<a href="${followUrl}" target="_blank" rel="noopener" class="sw-slider-follow-btn">Síguenos</a>`;
    header.innerHTML = `<div class="sw-slider-header-left">${avatarImg}${accountName}</div><div class="sw-slider-header-right">${followBtn}</div>`;
    mainWrapper.appendChild(header);
    // Wrapper del slider (track y flechas)
    const wrapper = document.createElement('div');
    wrapper.className = 'sw-slider-wrapper';
    // Slider track
    const track = document.createElement('div');
    track.className = 'sw-slider-track';
    // Renderizar cada post como tarjeta
    posts.forEach((post, idx) => {
      const card = document.createElement('div');
      card.className = 'sw-slider-card';
      // Imagen de fondo
      const img = document.createElement('img');
      img.className = 'sw-slider-img';
      img.src = post.thumbnail;
      img.alt = post.title || '';
      card.appendChild(img);
      // Overlay inferior (avatar, fecha, logo)
      const info = document.createElement('div');
      info.className = 'sw-slider-info';
      let platformIcon = '';
      if (account.platform === 'tiktok') {
        platformIcon = tiktokIcon();
      } else {
        platformIcon = instagramIcon();
      }
      const avatarCard = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-slider-avatar-card" alt="${account.displayName || account.username}" />` : `<div class="sw-slider-avatar-card-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
      info.innerHTML = `<span class="sw-slider-user">${avatarCard}</span><span class="sw-slider-date">${timeAgo(post.timestamp)}</span><span class="sw-slider-platform">${platformIcon}</span>`;
      card.appendChild(info);
      // Overlay play si es video
      if (post.type === 'VIDEO') {
        const playBtn = document.createElement('div');
        playBtn.className = 'sw-slider-play';
        playBtn.innerHTML = '<svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.7)"/><path d="M24 18L44 32L24 46V18Z" fill="white"/></svg>';
        card.appendChild(playBtn);
      }
      // Overlay hover (descripción)
      const hover = document.createElement('div');
      hover.className = 'sw-slider-hover';
      hover.innerHTML = `<div class="sw-slider-desc">${truncate(post.description || post.title || '', 80)}</div>`;
      card.appendChild(hover);
      // Click para abrir Lightbox modular
      card.addEventListener('click', () => {
        if (window.SocialWidget && window.SocialWidget.Modules && window.SocialWidget.Modules.Lightbox && typeof window.SocialWidget.Modules.Lightbox.open === 'function') {
          window.SocialWidget.Modules.Lightbox.open(idx, posts, account);
        }
      });
      track.appendChild(card);
    });
    wrapper.appendChild(track);
    // Flechas de navegación
    const left = document.createElement('button');
    left.className = 'sw-slider-arrow sw-slider-arrow-left';
    left.innerHTML = '<svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2.03272L2 14.0327L14 26.0327" stroke="#000" stroke-opacity="0.8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    left.onclick = () => {
      if (track.scrollLeft <= 0) {
        // Ir al final (scroll infinito)
        track.scrollLeft = track.scrollWidth;
      } else {
        track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' });
      }
    };
    const right = document.createElement('button');
    right.className = 'sw-slider-arrow sw-slider-arrow-right';
    right.innerHTML = '<svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 26.0005L14 14.0005L2 2.00049" stroke="#000" stroke-opacity="0.8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    right.onclick = () => {
      if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 5) {
        // Ir al inicio (scroll infinito)
        track.scrollLeft = 0;
      } else {
        track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' });
      }
    };
    wrapper.appendChild(left);
    wrapper.appendChild(right);
    mainWrapper.appendChild(wrapper);
    container.appendChild(mainWrapper);
    // Helpers
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
    function truncate(str, n) {
      return str.length > n ? str.substr(0, n-1) + '…' : str;
    }
    // Lightbox avatar: modificar window.SocialWidget.Lightbox para usar account.avatarUrl si existe
    if (window.SocialWidget && window.SocialWidget.Modules && window.SocialWidget.Modules.Lightbox) {
      window.SocialWidget.Modules.Lightbox._avatarUrl = account.avatarUrl || '';
    }
  }

  /**
   * SVG TikTok icon (usa variables CSS)
   */
  function tiktokIcon(size = 20) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="var(--sw-tiktok, #000)"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="var(--sw-white, #fff)"/></svg>`;
  }
  /**
   * SVG Instagram icon (usa variables CSS)
   */
  function instagramIcon(size = 20) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="var(--sw-white, #fff)"/></svg>`;
  }

  // Exportar módulo slider
  window.SocialWidget.Modules.Slider = { render };
})(); 