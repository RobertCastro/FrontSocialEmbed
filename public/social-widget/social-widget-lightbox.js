// ===== SOCIAL WIDGET LIGHTBOX BASE =====
(function() {
  if (!window.SocialWidget) window.SocialWidget = {};
  const Lightbox = {
    currentIndex: 0,
    posts: [],
    account: null,
    isOpen: false,
    overlay: null,
    open: function(index, posts, account) {
      this.currentIndex = index;
      this.posts = posts;
      this.account = account;
      this.isOpen = true;
      this.render();
      document.body.style.overflow = 'hidden';
    },
    close: function() {
      this.isOpen = false;
      if (this.overlay) {
        this.overlay.remove();
        this.overlay = null;
      }
      document.body.style.overflow = '';
    },
    next: function() {
      if (this.currentIndex < this.posts.length - 1) {
        this.currentIndex++;
        this.render();
      }
    },
    prev: function() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.render();
      }
    },
    handleKey: function(e) {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    },
    render: function() {
      // Remove previous overlay if exists
      if (this.overlay) this.overlay.remove();
      const post = this.posts[this.currentIndex];
      // Overlay
      const overlay = document.createElement('div');
      overlay.className = 'sw-lightbox-overlay';
      overlay.tabIndex = -1;
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
      // Modal
      const modal = document.createElement('div');
      modal.className = 'sw-lightbox-modal';
      // Media (image or video)
      const media = document.createElement('div');
      media.className = 'sw-lightbox-media';
      if (post.type === 'VIDEO' && post.platform === 'tiktok') {
        // TikTok video behavior: thumbnail with play button, then iframe on click
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'sw-tiktok-thumbnail-container';
        thumbnailContainer.style.cssText = 'position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer;';
        
        const thumbnail = document.createElement('img');
        thumbnail.className = 'sw-tiktok-thumbnail';
        thumbnail.src = post.thumbnail;
        thumbnail.alt = post.title || '';
        thumbnail.style.cssText = 'max-width: 100%; max-height: 100%;';
        
        const playButton = document.createElement('div');
        playButton.className = 'sw-tiktok-play-button';
        playButton.innerHTML = '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.7)"/><path d="M24 18L44 32L24 46V18Z" fill="white"/></svg>';
        playButton.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; cursor: pointer;';
        
        thumbnailContainer.appendChild(thumbnail);
        thumbnailContainer.appendChild(playButton);
        
        // Click handler to load iframe
        thumbnailContainer.addEventListener('click', () => {
          const iframe = document.createElement('iframe');
          iframe.src = post.url;
          iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: #000;';
          iframe.allowFullscreen = true;
          iframe.allow = 'autoplay; encrypted-media';
          
          media.innerHTML = '';
          media.appendChild(iframe);
        });
        
        media.appendChild(thumbnailContainer);
      } else if (post.type === 'VIDEO') {
        // Other video platforms
        const video = document.createElement('video');
        video.className = 'sw-lightbox-video';
        video.src = post.url;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        media.appendChild(video);
      } else {
        // Image
        const img = document.createElement('img');
        img.className = 'sw-lightbox-img';
        img.src = post.thumbnail;
        img.alt = post.title || '';
        media.appendChild(img);
      }
      // Nav buttons (fixed to viewport sides)
      const navLeft = document.createElement('button');
      navLeft.className = 'sw-lightbox-nav sw-lightbox-nav-left';
      navLeft.innerHTML = '<svg class="es-prev-svg" width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2.03272L2 14.0327L14 26.0327" stroke="#d6dae4" stroke-opacity="0.8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
      navLeft.onclick = (e) => { e.stopPropagation(); this.prev(); };
      const navRight = document.createElement('button');
      navRight.className = 'sw-lightbox-nav sw-lightbox-nav-right';
      navRight.innerHTML = '<svg class="es-next-svg" width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 26.0005L14 14.0005L2 2.00049" stroke="#d6dae4" stroke-opacity="0.8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
      navRight.onclick = (e) => { e.stopPropagation(); this.next(); };
      if (this.currentIndex > 0) overlay.appendChild(navLeft);
      if (this.currentIndex < this.posts.length - 1) overlay.appendChild(navRight);
      // Info
      const info = document.createElement('div');
      info.className = 'sw-lightbox-info';
      // Avatar (placeholder, falta en API)
      const avatar = document.createElement('div');
      avatar.className = 'sw-lightbox-avatar';
      avatar.style.background = this.account.platform === 'tiktok' ? 'var(--sw-tiktok)' : 'var(--sw-instagram)';
      avatar.innerHTML = this.account.username ? this.account.username[0].toUpperCase() : '?';
      // Username
      const username = document.createElement('div');
      username.className = 'sw-lightbox-username';
      username.textContent = this.account.displayName || this.account.username;
      // Date
      const date = document.createElement('div');
      date.className = 'sw-lightbox-date';
      date.textContent = this.timeAgo(post.timestamp);
      // Desc
      const desc = document.createElement('div');
      desc.className = 'sw-lightbox-desc';
      desc.innerHTML = this.parseHashtags(post.description || post.title || '');
      // Platform (icon only in info)
      const platform = document.createElement('div');
      platform.className = 'sw-lightbox-platform';
      platform.innerHTML = this.account.platform === 'tiktok'
        ? '<svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="#000"/><path d="M28.5 15.5c-2.2 0-4-1.8-4-4V9h-3.1v15.2c0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1 1.4-3.1 3.1-3.1c.2 0 .4 0 .6.1v-3.2c-.2 0-.4-.1-.6-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3V19c1.1.7 2.4 1.1 3.7 1.1h.6v-4.6h-.6z" fill="#fff"/></svg>'
        : '<svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>';
      // Close (fixed to top right)
      const closeBtn = document.createElement('button');
      closeBtn.className = 'sw-lightbox-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = (e) => { e.stopPropagation(); this.close(); };
      // Append info
      info.appendChild(avatar);
      info.appendChild(username);
      info.appendChild(date);
      info.appendChild(desc);
      info.appendChild(platform);
      // Compose modal
      modal.appendChild(media);
      modal.appendChild(info);
      // Overlay
      overlay.appendChild(modal);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      this.overlay = overlay;
      // Keyboard events
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = this.handleKey.bind(this);
      document.addEventListener('keydown', this._keyHandler);
    },
    parseHashtags: function(text) {
      if (!text) return '';
      // Regex para detectar hashtags (#palabra)
      const hashtagRegex = /#(\w+)/g;
      return text.replace(hashtagRegex, (match, hashtag) => {
        const platform = this.account?.platform || 'tiktok';
        const baseUrl = platform === 'tiktok' 
          ? 'https://www.tiktok.com/tag/'
          : 'https://www.instagram.com/explore/tags/';
        return `<a href="${baseUrl}${hashtag}" target="_blank" rel="noopener" class="sw-hashtag-link">${match}</a>`;
      });
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
    destroy: function() {
      this.close();
      document.removeEventListener('keydown', this._keyHandler);
    }
  };
  window.SocialWidget.Lightbox = Lightbox;
})(); 