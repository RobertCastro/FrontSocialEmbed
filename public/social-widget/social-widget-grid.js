// ===== SOCIAL WIDGET GRID BASE =====
(function() {
  if (!window.SocialWidgetGrid) window.SocialWidgetGrid = {};
  window.SocialWidgetGrid.render = function(container, widgetData) {
    // Limpiar el contenedor
    container.innerHTML = '';
    const { widget, account, posts } = widgetData;
    
    // Create widget wrapper
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

    // Store current data for lightbox
    window.SocialWidgetGrid._currentPostsArr = posts;
    window.SocialWidgetGrid._currentAccountObj = account;
    
    if (posts && posts.length > 0) {
      posts.forEach((post, index) => {
        const postElement = createPostElement(post, index, account, posts);
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

    // Lightbox avatar: pasar a window.SocialWidget.Lightbox
    if (window.SocialWidget && window.SocialWidget.Lightbox) {
      window.SocialWidget.Lightbox._avatarUrl = account.avatarUrl || '';
    }

    container.appendChild(widgetWrapper);

    // Helper functions
    function createPostElement(post, index, account, postsArr) {
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
        image.classList.add('sw-loaded');
      };
      actualImage.onerror = function() {
        // Fallback image
        image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2FhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg==';
        image.classList.add('sw-error');
      };
      actualImage.src = post.thumbnail;

      imageContainer.appendChild(image);

      // Crear barra de info inferior SIEMPRE visible
      const infoBar = document.createElement('div');
      infoBar.className = 'sw-post-infobar';
      const avatarCard = account.avatarUrl ? `<img src="${account.avatarUrl}" class="sw-post-avatar" alt="${account.displayName || account.username}" />` : `<div class="sw-post-avatar-fallback">${(account.displayName || account.username || '?')[0].toUpperCase()}</div>`;
      const userBlock = `
        <div class="sw-post-userblock">
          <div class="sw-post-displayname">${account.displayName || account.username}</div>
          <div class="sw-post-time">${timeAgo(post.timestamp)}</div>
        </div>
      `;
      const rightIcon = `<span class="sw-post-platform sw-post-platform-corner">${account.platform === 'tiktok' ? '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#000"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="#fff"/></svg>' : '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>'}</span>`;
      infoBar.innerHTML = `${avatarCard}${userBlock}${rightIcon}`;

      // Overlay en hover: icono red grande, descripción centrada, usuario/avatar abajo
      const overlay = document.createElement('div');
      overlay.className = 'sw-post-overlay sw-custom-overlay';
      overlay.innerHTML = `
        <div class="sw-overlay-center">
          ${account.platform === 'tiktok' ? '<svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#000"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="#fff"/></svg>' : '<svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>'}
        </div>
        <div class="sw-overlay-desc">${truncate(post.description || post.title || '', 60)}</div>
        <div class="sw-overlay-user">${avatarCard}${account.displayName || account.username}</div>
      `;

      postElement.appendChild(imageContainer);
      postElement.appendChild(infoBar);
      postElement.appendChild(overlay);

      // Add click handler for lightbox functionality
      postElement.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.SocialWidget && window.SocialWidget.Lightbox && typeof window.SocialWidget.Lightbox.open === 'function') {
          window.SocialWidget.Lightbox.open(index, window.SocialWidgetGrid._currentPostsArr || [], window.SocialWidgetGrid._currentAccountObj || {});
        } else {
          handlePostClick(post, postElement);
        }
      });

      return postElement;
    }

    function handlePostClick(post, element) {
      // For now, just open the original URL
      if (post.url) {
        window.open(post.url, '_blank', 'noopener,noreferrer');
      }
    }

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
  };
})(); 