/**
 * Social Widget Grid Layout Module
 * Version: 1.0.0
 * Author: Robert Castro
 * Description: Grid layout renderer for social media posts
 */
(function() {
  if (!window.SocialWidget) window.SocialWidget = {};
  if (!window.SocialWidget.Modules) window.SocialWidget.Modules = {};

  // Reusable SVG icon variables
  const INSTAGRAM_ICON = '<svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" card-type="media"><path d="M16.5386 5.32888C16.5386 4.66418 15.9999 4.12748 15.3377 4.12748C14.6754 4.12748 14.1362 4.66418 14.1362 5.32888C14.1362 5.99113 14.6754 6.52783 15.3377 6.52783C15.9999 6.52783 16.5386 5.99113 16.5386 5.32888" fill="#ffffff"></path><path d="M18.1388 14.7071C18.0943 15.6822 17.9312 16.212 17.7958 16.5638C17.614 17.0304 17.397 17.364 17.0451 17.7139C16.6972 18.0638 16.3636 18.2802 15.8971 18.4601C15.5452 18.5975 15.0134 18.7611 14.0384 18.8075C12.9843 18.854 12.6719 18.8639 9.99876 18.8639C7.32809 18.8639 7.01325 18.854 5.95911 18.8075C4.98407 18.7611 4.45478 18.5975 4.10288 18.4601C3.63389 18.2802 3.30279 18.0638 2.95289 17.7139C2.60051 17.364 2.38356 17.0304 2.20417 16.5638C2.06873 16.212 1.9032 15.6822 1.86116 14.7071C1.80979 13.653 1.80038 13.3357 1.80038 10.668C1.80038 7.99483 1.80979 7.68 1.86116 6.62586C1.9032 5.65082 2.06873 5.12152 2.20417 4.76666C2.38356 4.30064 2.60051 3.96901 2.95289 3.61912C3.30279 3.26974 3.63389 3.05276 4.10288 2.87091C4.45478 2.73303 4.98407 2.57191 5.95911 2.52547C7.01325 2.47899 7.32809 2.46712 9.99876 2.46712C12.6719 2.46712 12.9843 2.47899 14.0384 2.52547C15.0134 2.57191 15.5452 2.73303 15.8971 2.87091C16.3636 3.05276 16.6972 3.26974 17.0451 3.61912C17.397 3.96901 17.614 4.30064 17.7958 4.76666C17.9312 5.12152 18.0943 5.65082 18.1388 6.62586C18.1877 7.68 18.1996 7.99483 18.1996 10.668C18.1996 13.3357 18.1877 13.653 18.1388 14.7071V14.7071ZM19.9392 6.54384C19.8903 5.47832 19.7222 4.75035 19.4727 4.11631C19.2187 3.45851 18.8781 2.90105 18.3207 2.34359C17.7657 1.78861 17.2082 1.44809 16.5504 1.19111C15.9139 0.943997 15.1884 0.773977 14.1224 0.727534C13.0564 0.676125 12.7159 0.666746 9.99876 0.666746C7.28409 0.666746 6.94112 0.676125 5.87512 0.727534C4.81157 0.773977 4.08657 0.943997 3.44708 1.19111C2.79176 1.44809 2.2343 1.78861 1.67932 2.34359C1.12186 2.90105 0.781338 3.45851 0.524846 4.11631C0.277731 4.75035 0.109714 5.47832 0.0583039 6.54384C0.0118609 7.60984 0 7.95084 0 10.668C0 13.3827 0.0118609 13.7231 0.0583039 14.7891C0.109714 15.8527 0.277731 16.5801 0.524846 17.2172C0.781338 17.8725 1.12186 18.4324 1.67932 18.9874C2.2343 19.5424 2.79176 19.8854 3.44708 20.1419C4.08657 20.389 4.81157 20.557 5.87512 20.606C6.94112 20.6549 7.28409 20.6667 9.99876 20.6667C12.7159 20.6667 13.0564 20.6549 14.1224 20.606C15.1884 20.557 15.9139 20.389 16.5504 20.1419C17.2082 19.8854 17.7657 19.5424 18.3207 18.9874C18.8781 18.4324 19.2187 17.8725 19.4727 17.2172C19.7222 16.5801 19.8903 15.8527 19.9392 14.7891C19.9881 13.7231 20 13.3827 20 10.668C20 7.95084 19.9881 7.60984 19.9392 6.54384V6.54384Z" fill="#ffffff"></path><path d="M9.99877 13.9984C8.15885 13.9984 6.66586 12.5079 6.66586 10.6679C6.66586 8.82504 8.15885 7.33257 9.99877 7.33257C11.8392 7.33257 13.3342 8.82504 13.3342 10.6679C13.3342 12.5079 11.8392 13.9984 9.99877 13.9984V13.9984ZM9.99877 5.52971C7.16253 5.52971 4.86548 7.83169 4.86548 10.6679C4.86548 13.5017 7.16253 15.8013 9.99877 15.8013C12.835 15.8013 15.1346 13.5017 15.1346 10.6679C15.1346 7.83169 12.835 5.52971 9.99877 5.52971Z" fill="#ffffff"></path></svg>';
  const TIKTOK_ICON = '<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" transparent="true"><g clip-path="url(#tiktokLogo)"><path d="M23.3411 5.7493C22.2479 4.50395 21.6452 2.90303 21.6458 1.24561H20.324C20.4947 2.16197 20.8503 3.03393 21.369 3.80825C21.8877 4.58257 22.5587 5.24302 23.3411 5.7493V5.7493ZM11.1102 15.4943C10.1831 15.499 9.28426 15.8137 8.55647 16.3882C7.82868 16.9628 7.31376 17.7642 7.09356 18.6652C6.87337 19.5661 6.96054 20.5149 7.34123 21.3606C7.72191 22.2062 8.37426 22.9003 9.19455 23.3325C8.74606 22.713 8.47748 21.9815 8.41849 21.2188C8.3595 20.4562 8.5124 19.692 8.86028 19.0108C9.20817 18.3297 9.7375 17.758 10.3898 17.3589C11.0421 16.9598 11.792 16.7489 12.5566 16.7495C12.9722 16.7549 13.385 16.8197 13.7824 16.9417V11.901C13.3766 11.8401 12.9669 11.8081 12.5566 11.8052H12.3362V15.638C11.9367 15.5308 11.5237 15.4824 11.1102 15.4943V15.4943Z" fill="#fe2C55"></path><path d="M12.3353 11.8147V10.6456C11.9297 10.5814 11.52 10.5462 11.1093 10.5403C7.13373 10.5318 3.61405 13.1093 2.42018 16.9031C1.2263 20.6969 2.63553 24.8267 5.89875 27.0982C4.70212 25.817 3.90174 24.2166 3.59421 22.4903C3.28668 20.764 3.48516 18.9855 4.16568 17.3696C4.84621 15.7536 5.97969 14.3693 7.4293 13.3836C8.87892 12.3979 10.5827 11.8531 12.335 11.8148L12.3353 11.8147Z" fill="#25f4ee"></path><path d="M12.5574 25.0573C14.7802 25.0543 16.6073 23.3024 16.7046 21.0807V1.25531H20.3248C20.2509 0.841037 20.2157 0.420795 20.2195 0L15.2678 0V19.8063C15.1854 22.0393 13.354 23.808 11.1206 23.8116C10.4532 23.8059 9.79665 23.6417 9.20508 23.3325C9.58849 23.864 10.092 24.2972 10.6746 24.597C11.2572 24.8967 11.9023 25.0544 12.5574 25.0573V25.0573ZM27.0867 7.98186V6.87992C25.7544 6.88044 24.4516 6.48711 23.3419 5.74932C24.3146 6.8807 25.6292 7.6644 27.0867 7.98186V7.98186Z" fill="#25f4ee"></path><path d="M27.0827 7.98193V11.8149C24.6162 11.8101 22.2137 11.0289 20.2155 9.58218V19.653C20.2049 24.6783 16.13 28.7465 11.1071 28.7465C9.24156 28.7499 7.42099 28.174 5.89648 27.0984C7.13963 28.4361 8.75662 29.3683 10.5368 29.7735C12.3171 30.1787 14.178 30.0382 15.8773 29.3702C17.5765 28.7022 19.0353 27.5378 20.0637 26.0285C21.092 24.5193 21.6422 22.7352 21.6426 20.9086V10.8663C23.6475 12.3035 26.053 13.0744 28.5194 13.0702V8.1349C28.0365 8.13346 27.5551 8.0822 27.0827 7.98193V7.98193Z" fill="#fe2c55"></path><path d="M20.2184 19.6529V9.58209C22.2227 11.0206 24.6286 11.7917 27.0952 11.786V7.95319C25.638 7.6453 24.3203 6.8718 23.3408 5.7493C22.5585 5.24302 21.8875 4.58257 21.3688 3.80825C20.85 3.03392 20.4944 2.16197 20.3237 1.24561H16.7035V21.081C16.6683 21.9444 16.3651 22.7754 15.836 23.4584C15.307 24.1415 14.5784 24.6427 13.7516 24.8924C12.9247 25.1422 12.0406 25.128 11.2221 24.8519C10.4037 24.5758 9.69153 24.0515 9.18463 23.3519C8.3642 22.9198 7.71172 22.2257 7.33094 21.3799C6.95016 20.5342 6.86293 19.5853 7.08314 18.6843C7.30335 17.7833 7.81835 16.9817 8.54624 16.4072C9.27413 15.8326 10.1731 15.518 11.1003 15.5134C11.5161 15.5171 11.9291 15.5817 12.3263 15.7051V11.8722C10.5645 11.9021 8.84954 12.4442 7.39042 13.4323C5.9313 14.4205 4.79108 15.812 4.10878 17.4372C3.42648 19.0625 3.23159 20.8513 3.54787 22.5854C3.86415 24.3196 4.67793 25.9242 5.88998 27.2036C7.42947 28.2438 9.25263 28.7827 11.11 28.7464C16.1329 28.7464 20.2078 24.6782 20.2184 19.6529V19.6529Z" fill="#ffffff"></path></g><defs><clipPath id="tiktokLogo"><rect width="42" height="42" fill="#ffffff"></rect></clipPath></defs></svg>';

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
    // Avatar con fallback inicial
    const avatarImg = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-header-avatar" alt="${account.displayName || account.username}" />` : `<div class="sw-header-avatar-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
    const accountName = `<span class="sw-account-name">${account.displayName || account.username}</span>`;
    const followUrl = account.platform === 'tiktok'
      ? `https://www.tiktok.com/@${account.username}`
      : `https://instagram.com/${account.username}`;
    const followBtn = `<a href="${followUrl}" target="_blank" rel="noopener" class="sw-follow-btn">${account.platform === 'tiktok' ? TIKTOK_ICON : INSTAGRAM_ICON} Síguenos</a>`;
    header.innerHTML = `<div class="sw-header-left">${avatarImg}${accountName}</div><div class="sw-header-right">${followBtn}</div>`;
    widgetWrapper.appendChild(header);

    // --- GRID ---
    const gridContainer = document.createElement('div');
    gridContainer.className = 'sw-grid-container';

    // Estilos custom
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
    if (diff < 60) return `hace ${diff} segundos`;
    if (diff < 3600) {
      const mins = Math.floor(diff/60);
      return `hace ${mins} minuto${mins === 1 ? '' : 's'}`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff/3600);
      return `hace ${hours} hora${hours === 1 ? '' : 's'}`;
    }
    if (diff < 2592000) {
      const days = Math.floor(diff/86400);
      return `hace ${days} día${days === 1 ? '' : 's'}`;
    }
    // Si es más de 30 días, muestra la fecha en formato local español
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /**
   * Trunca texto a n caracteres
   */
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n-1) + '…' : str;
  }

  /**
   * SVG TikTok icon (custom, provided by user)
   */
  function tiktokIcon(size = 24) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" transparent="true"><g clip-path="url(#tiktokLogo)"><path d="M23.3411 5.7493C22.2479 4.50395 21.6452 2.90303 21.6458 1.24561H20.324C20.4947 2.16197 20.8503 3.03393 21.369 3.80825C21.8877 4.58257 22.5587 5.24302 23.3411 5.7493V5.7493ZM11.1102 15.4943C10.1831 15.499 9.28426 15.8137 8.55647 16.3882C7.82868 16.9628 7.31376 17.7642 7.09356 18.6652C6.87337 19.5661 6.96054 20.5149 7.34123 21.3606C7.72191 22.2062 8.37426 22.9003 9.19455 23.3325C8.74606 22.713 8.47748 21.9815 8.41849 21.2188C8.3595 20.4562 8.5124 19.692 8.86028 19.0108C9.20817 18.3297 9.7375 17.758 10.3898 17.3589C11.0421 16.9598 11.792 16.7489 12.5566 16.7495C12.9722 16.7549 13.385 16.8197 13.7824 16.9417V11.901C13.3766 11.8401 12.9669 11.8081 12.5566 11.8052H12.3362V15.638C11.9367 15.5308 11.5237 15.4824 11.1102 15.4943V15.4943Z" fill="#fe2C55"></path><path d="M12.3353 11.8147V10.6456C11.9297 10.5814 11.52 10.5462 11.1093 10.5403C7.13373 10.5318 3.61405 13.1093 2.42018 16.9031C1.2263 20.6969 2.63553 24.8267 5.89875 27.0982C4.70212 25.817 3.90174 24.2166 3.59421 22.4903C3.28668 20.764 3.48516 18.9855 4.16568 17.3696C4.84621 15.7536 5.97969 14.3693 7.4293 13.3836C8.87892 12.3979 10.5827 11.8531 12.335 11.8148L12.3353 11.8147Z" fill="#25f4ee"></path><path d="M12.5574 25.0573C14.7802 25.0543 16.6073 23.3024 16.7046 21.0807V1.25531H20.3248C20.2509 0.841037 20.2157 0.420795 20.2195 0L15.2678 0V19.8063C15.1854 22.0393 13.354 23.808 11.1206 23.8116C10.4532 23.8059 9.79665 23.6417 9.20508 23.3325C9.58849 23.864 10.092 24.2972 10.6746 24.597C11.2572 24.8967 11.9023 25.0544 12.5574 25.0573V25.0573ZM27.0867 7.98186V6.87992C25.7544 6.88044 24.4516 6.48711 23.3419 5.74932C24.3146 6.8807 25.6292 7.6644 27.0867 7.98186V7.98186Z" fill="#25f4ee"></path><path d="M27.0827 7.98193V11.8149C24.6162 11.8101 22.2137 11.0289 20.2155 9.58218V19.653C20.2049 24.6783 16.13 28.7465 11.1071 28.7465C9.24156 28.7499 7.42099 28.174 5.89648 27.0984C7.13963 28.4361 8.75662 29.3683 10.5368 29.7735C12.3171 30.1787 14.178 30.0382 15.8773 29.3702C17.5765 28.7022 19.0353 27.5378 20.0637 26.0285C21.092 24.5193 21.6422 22.7352 21.6426 20.9086V10.8663C23.6475 12.3035 26.053 13.0744 28.5194 13.0702V8.1349C28.0365 8.13346 27.5551 8.0822 27.0827 7.98193V7.98193Z" fill="#fe2c55"></path><path d="M20.2184 19.6529V9.58209C22.2227 11.0206 24.6286 11.7917 27.0952 11.786V7.95319C25.638 7.6453 24.3203 6.8718 23.3408 5.7493C22.5585 5.24302 21.8875 4.58257 21.3688 3.80825C20.85 3.03392 20.4944 2.16197 20.3237 1.24561H16.7035V21.081C16.6683 21.9444 16.3651 22.7754 15.836 23.4584C15.307 24.1415 14.5784 24.6427 13.7516 24.8924C12.9247 25.1422 12.0406 25.128 11.2221 24.8519C10.4037 24.5758 9.69153 24.0515 9.18463 23.3519C8.3642 22.9198 7.71172 22.2257 7.33094 21.3799C6.95016 20.5342 6.86293 19.5853 7.08314 18.6843C7.30335 17.7833 7.81835 16.9817 8.54624 16.4072C9.27413 15.8326 10.1731 15.518 11.1003 15.5134C11.5161 15.5171 11.9291 15.5817 12.3263 15.7051V11.8722C10.5645 11.9021 8.84954 12.4442 7.39042 13.4323C5.9313 14.4205 4.79108 15.812 4.10878 17.4372C3.42648 19.0625 3.23159 20.8513 3.54787 22.5854C3.86415 24.3196 4.67793 25.9242 5.88998 27.2036C7.42947 28.2438 9.25263 28.7827 11.11 28.7464C16.1329 28.7464 20.2078 24.6782 20.2184 19.6529V19.6529Z" fill="#ffffff"></path></g><defs><clipPath id="tiktokLogo"><rect width="42" height="42" fill="#ffffff"></rect></clipPath></defs></svg>`;
  }

  /**
   * SVG Instagram icon (usa variables CSS)
   */
  function instagramIcon(size = 24) {
    return `<svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" card-type="media"><path d="M16.5386 5.32888C16.5386 4.66418 15.9999 4.12748 15.3377 4.12748C14.6754 4.12748 14.1362 4.66418 14.1362 5.32888C14.1362 5.99113 14.6754 6.52783 15.3377 6.52783C15.9999 6.52783 16.5386 5.99113 16.5386 5.32888" fill="#ffffff"></path><path d="M18.1388 14.7071C18.0943 15.6822 17.9312 16.212 17.7958 16.5638C17.614 17.0304 17.397 17.364 17.0451 17.7139C16.6972 18.0638 16.3636 18.2802 15.8971 18.4601C15.5452 18.5975 15.0134 18.7611 14.0384 18.8075C12.9843 18.854 12.6719 18.8639 9.99876 18.8639C7.32809 18.8639 7.01325 18.854 5.95911 18.8075C4.98407 18.7611 4.45478 18.5975 4.10288 18.4601C3.63389 18.2802 3.30279 18.0638 2.95289 17.7139C2.60051 17.364 2.38356 17.0304 2.20417 16.5638C2.06873 16.212 1.9032 15.6822 1.86116 14.7071C1.80979 13.653 1.80038 13.3357 1.80038 10.668C1.80038 7.99483 1.80979 7.68 1.86116 6.62586C1.9032 5.65082 2.06873 5.12152 2.20417 4.76666C2.38356 4.30064 2.60051 3.96901 2.95289 3.61912C3.30279 3.26974 3.63389 3.05276 4.10288 2.87091C4.45478 2.73303 4.98407 2.57191 5.95911 2.52547C7.01325 2.47899 7.32809 2.46712 9.99876 2.46712C12.6719 2.46712 12.9843 2.47899 14.0384 2.52547C15.0134 2.57191 15.5452 2.73303 15.8971 2.87091C16.3636 3.05276 16.6972 3.26974 17.0451 3.61912C17.397 3.96901 17.614 4.30064 17.7958 4.76666C17.9312 5.12152 18.0943 5.65082 18.1388 6.62586C18.1877 7.68 18.1996 7.99483 18.1996 10.668C18.1996 13.3357 18.1877 13.653 18.1388 14.7071V14.7071ZM19.9392 6.54384C19.8903 5.47832 19.7222 4.75035 19.4727 4.11631C19.2187 3.45851 18.8781 2.90105 18.3207 2.34359C17.7657 1.78861 17.2082 1.44809 16.5504 1.19111C15.9139 0.943997 15.1884 0.773977 14.1224 0.727534C13.0564 0.676125 12.7159 0.666746 9.99876 0.666746C7.28409 0.666746 6.94112 0.676125 5.87512 0.727534C4.81157 0.773977 4.08657 0.943997 3.44708 1.19111C2.79176 1.44809 2.2343 1.78861 1.67932 2.34359C1.12186 2.90105 0.781338 3.45851 0.524846 4.11631C0.277731 4.75035 0.109714 5.47832 0.0583039 6.54384C0.0118609 7.60984 0 7.95084 0 10.668C0 13.3827 0.0118609 13.7231 0.0583039 14.7891C0.109714 15.8527 0.277731 16.5801 0.524846 17.2172C0.781338 17.8725 1.12186 18.4324 1.67932 18.9874C2.2343 19.5424 2.79176 19.8854 3.44708 20.1419C4.08657 20.389 4.81157 20.557 5.87512 20.606C6.94112 20.6549 7.28409 20.6667 9.99876 20.6667C12.7159 20.6667 13.0564 20.6549 14.1224 20.606C15.1884 20.557 15.9139 20.389 16.5504 20.1419C17.2082 19.8854 17.7657 19.5424 18.3207 18.9874C18.8781 18.4324 19.2187 17.8725 19.4727 17.2172C19.7222 16.5801 19.8903 15.8527 19.9392 14.7891C19.9881 13.7231 20 13.3827 20 10.668C20 7.95084 19.9881 7.60984 19.9392 6.54384V6.54384Z" fill="#ffffff"></path><path d="M9.99877 13.9984C8.15885 13.9984 6.66586 12.5079 6.66586 10.6679C6.66586 8.82504 8.15885 7.33257 9.99877 7.33257C11.8392 7.33257 13.3342 8.82504 13.3342 10.6679C13.3342 12.5079 11.8392 13.9984 9.99877 13.9984V13.9984ZM9.99877 5.52971C7.16253 5.52971 4.86548 7.83169 4.86548 10.6679C4.86548 13.5017 7.16253 15.8013 9.99877 15.8013C12.835 15.8013 15.1346 13.5017 15.1346 10.6679C15.1346 7.83169 12.835 5.52971 9.99877 5.52971Z" fill="#ffffff"></path></svg>`;
  }

  // Exportar módulo grid
  window.SocialWidget.Modules.Grid = { render };
})(); 