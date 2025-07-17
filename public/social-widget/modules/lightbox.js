/**
 * Social Widget Lightbox Module
 * Version: 1.0.0
 * Author: Robert Castro
 * Description: Modal lightbox for viewing social media posts
 */
(function() {
  if (!window.SocialWidget) window.SocialWidget = {};
  if (!window.SocialWidget.Modules) window.SocialWidget.Modules = {};

  /**
   * Lightbox funcionality encapsulated as a module
   */
  const Lightbox = {
    currentIndex: 0,
    posts: [],
    account: null,
    isOpen: false,
    overlay: null,
    carouselIndex: 0, // Para manejar el índice del carousel interno
    /**
     * Abre el lightbox en el post indicado
     */
    open: function(index, posts, account) {
      this.currentIndex = index;
      this.posts = posts;
      this.account = account;
      this.carouselIndex = 0; // Reset carousel index
      this.isOpen = true;
      this.render();
      document.body.style.overflow = 'hidden';
    },
    /**
     * Cierra el lightbox
     */
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
        this.carouselIndex = 0;
        this.render();
      }
    },
    prev: function() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.carouselIndex = 0;
        this.render();
      }
    },
    nextCarousel: function() {
      const post = this.posts[this.currentIndex];
      if (post.type === 'CAROUSEL_ALBUM' && post.carousel_images && this.carouselIndex < post.carousel_images.length - 1) {
        this.carouselIndex++;
        this.renderCarousel();
      }
    },
    prevCarousel: function() {
      if (this.carouselIndex > 0) {
        this.carouselIndex--;
        this.renderCarousel();
      }
    },
    handleKey: function(e) {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') {
        const post = this.posts[this.currentIndex];
        if (post.type === 'CAROUSEL_ALBUM' && post.carousel_images && this.carouselIndex < post.carousel_images.length - 1) {
          this.nextCarousel();
        } else {
          this.next();
        }
      }
      if (e.key === 'ArrowLeft') {
        if (this.carouselIndex > 0) {
          this.prevCarousel();
        } else {
          this.prev();
        }
      }
    },
    /**
     * Convierte hashtags en links clicables
     */
    parseHashtags: function(text) {
      if (!text) return '';
      // Regex para detectar hashtags (#palabra, incluyendo acentos y unicode)
      const hashtagRegex = /#([\p{L}\p{N}_]+)/gu;
      return text.replace(hashtagRegex, (match, hashtag) => {
        const platform = this.account?.platform || 'tiktok';
        const baseUrl = platform === 'tiktok'
          ? 'https://www.tiktok.com/tag/'
          : 'https://www.instagram.com/explore/tags/';
        return `<a href="${baseUrl}${encodeURIComponent(hashtag)}" target="_blank" rel="noopener" class="sw-hashtag-link">${match}</a>`;
      });
    },
    renderCarousel: function() {
      const post = this.posts[this.currentIndex];
      const mediaContainer = this.overlay ? this.overlay.querySelector('.sw-lightbox-media') : null;
      if (!mediaContainer || !post.carousel_images) return;
      // Clear media container
      mediaContainer.innerHTML = '';
      // Create carousel container
      const carouselContainer = document.createElement('div');
      carouselContainer.className = 'sw-carousel-container';
      carouselContainer.style.cssText = 'position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;';
      // Main image
      const img = document.createElement('img');
      img.className = 'sw-lightbox-img';
      img.src = post.carousel_images[this.carouselIndex];
      img.alt = post.title || '';
      // Carousel navigation (sin dots)
      // Carousel arrows (only show if more than 1 image)
      if (post.carousel_images.length > 1) {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'sw-carousel-arrow sw-carousel-arrow-left';
        prevArrow.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        prevArrow.style.cssText = `position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; opacity: ${this.carouselIndex > 0 ? '1' : '0.3'};`;
        prevArrow.onclick = (e) => { e.stopPropagation(); this.prevCarousel(); };
        const nextArrow = document.createElement('button');
        nextArrow.className = 'sw-carousel-arrow sw-carousel-arrow-right';
        nextArrow.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        nextArrow.style.cssText = `position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; opacity: ${this.carouselIndex < post.carousel_images.length - 1 ? '1' : '0.3'};`;
        nextArrow.onclick = (e) => { e.stopPropagation(); this.nextCarousel(); };
        carouselContainer.appendChild(prevArrow);
        carouselContainer.appendChild(nextArrow);
      }
      carouselContainer.appendChild(img);
      // No dots
      mediaContainer.appendChild(carouselContainer);
    },
    render: function() {
      if (this.overlay) this.overlay.remove();
      const post = this.posts[this.currentIndex];
      const overlay = document.createElement('div');
      overlay.className = 'sw-lightbox-overlay';
      overlay.tabIndex = -1;
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
      const modal = document.createElement('div');
      modal.className = 'sw-lightbox-modal';
      const media = document.createElement('div');
      media.className = 'sw-lightbox-media';
      if (post.type === 'VIDEO' && post.platform === 'tiktok') {
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
      } else if (post.type === 'VIDEO' && post.platform === 'instagram' && post.video_url) {
        // Ajustar el div para que use el aspect-ratio real del video
        media.style.height = '';
        media.style.display = 'flex';
        media.style.alignItems = 'center';
        media.style.justifyContent = 'center';
        media.style.background = '#000';
        media.style.padding = '0';
        const video = document.createElement('video');
        video.className = 'sw-lightbox-video';
        video.src = post.video_url;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        video.style.objectFit = 'contain';
        video.style.background = '#000';
        video.onloadedmetadata = function() {
          if (video.videoWidth && video.videoHeight) {
            const aspect = video.videoWidth / video.videoHeight;
            media.style.aspectRatio = aspect;
            media.style.height = '';
          }
        };
        media.appendChild(video);
      } else if (post.type === 'CAROUSEL_ALBUM' && post.platform === 'instagram' && post.carousel_images) {
        // Renderiza el modal completo y luego reemplaza el área de media por el carrusel
        // (como en @social-widget-lightbox.js)
        // El bloque de info y el resto del modal se renderizan igual que para otros tipos
        // Después, renderCarousel reemplaza el área de media
        // (No uses return aquí)
      } else if (post.type === 'VIDEO') {
        const video = document.createElement('video');
        video.className = 'sw-lightbox-video';
        video.src = post.url;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        media.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.className = 'sw-lightbox-img';
        img.src = post.thumbnail;
        img.alt = post.title || '';
        media.appendChild(img);
      }
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
      const info = document.createElement('div');
      info.className = 'sw-lightbox-info';
      const avatar = document.createElement('div');
      avatar.className = 'sw-lightbox-avatar';
      if (this.account && this.account.avatarUrl) {
        const img = document.createElement('img');
        img.src = this.account.avatarUrl;
        img.alt = this.account.displayName || this.account.username;
        avatar.appendChild(img);
      } else {
        avatar.textContent = (this.account && (this.account.displayName || this.account.username) ? (this.account.displayName || this.account.username)[0].toUpperCase() : '?');
      }
      info.appendChild(avatar);
      const username = document.createElement('div');
      username.className = 'sw-lightbox-username';
      username.textContent = this.account ? (this.account.displayName || this.account.username) : '';
      info.appendChild(username);
      const date = document.createElement('div');
      date.className = 'sw-lightbox-date';
      date.textContent = post.timestamp ? new Date(post.timestamp).toLocaleDateString() : '';
      info.appendChild(date);
      const desc = document.createElement('div');
      desc.className = 'sw-lightbox-desc';
      desc.innerHTML = this.parseHashtags(post.description || post.title || '');
      info.appendChild(desc);
      const platform = document.createElement('div');
      platform.className = 'sw-lightbox-platform';
      platform.innerHTML = `${this.account && this.account.platform === 'tiktok' ? '<svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" transparent="true"><g clip-path="url(#tiktokLogo)"><path d="M23.3411 5.7493C22.2479 4.50395 21.6452 2.90303 21.6458 1.24561H20.324C20.4947 2.16197 20.8503 3.03393 21.369 3.80825C21.8877 4.58257 22.5587 5.24302 23.3411 5.7493V5.7493ZM11.1102 15.4943C10.1831 15.499 9.28426 15.8137 8.55647 16.3882C7.82868 16.9628 7.31376 17.7642 7.09356 18.6652C6.87337 19.5661 6.96054 20.5149 7.34123 21.3606C7.72191 22.2062 8.37426 22.9003 9.19455 23.3325C8.74606 22.713 8.47748 21.9815 8.41849 21.2188C8.3595 20.4562 8.5124 19.692 8.86028 19.0108C9.20817 18.3297 9.7375 17.758 10.3898 17.3589C11.0421 16.9598 11.792 16.7489 12.5566 16.7495C12.9722 16.7549 13.385 16.8197 13.7824 16.9417V11.901C13.3766 11.8401 12.9669 11.8081 12.5566 11.8052H12.3362V15.638C11.9367 15.5308 11.5237 15.4824 11.1102 15.4943V15.4943Z" fill="#fe2C55"></path><path d="M12.3353 11.8147V10.6456C11.9297 10.5814 11.52 10.5462 11.1093 10.5403C7.13373 10.5318 3.61405 13.1093 2.42018 16.9031C1.2263 20.6969 2.63553 24.8267 5.89875 27.0982C4.70212 25.817 3.90174 24.2166 3.59421 22.4903C3.28668 20.764 3.48516 18.9855 4.16568 17.3696C4.84621 15.7536 5.97969 14.3693 7.4293 13.3836C8.87892 12.3979 10.5827 11.8531 12.335 11.8148L12.3353 11.8147Z" fill="#25f4ee"></path><path d="M12.5574 25.0573C14.7802 25.0543 16.6073 23.3024 16.7046 21.0807V1.25531H20.3248C20.2509 0.841037 20.2157 0.420795 20.2195 0L15.2678 0V19.8063C15.1854 22.0393 13.354 23.808 11.1206 23.8116C10.4532 23.8059 9.79665 23.6417 9.20508 23.3325C9.58849 23.864 10.092 24.2972 10.6746 24.597C11.2572 24.8967 11.9023 25.0544 12.5574 25.0573V25.0573ZM27.0867 7.98186V6.87992C25.7544 6.88044 24.4516 6.48711 23.3419 5.74932C24.3146 6.8807 25.6292 7.6644 27.0867 7.98186V7.98186Z" fill="#25f4ee"></path><path d="M27.0827 7.98193V11.8149C24.6162 11.8101 22.2137 11.0289 20.2155 9.58218V19.653C20.2049 24.6783 16.13 28.7465 11.1071 28.7465C9.24156 28.7499 7.42099 28.174 5.89648 27.0984C7.13963 28.4361 8.75662 29.3683 10.5368 29.7735C12.3171 30.1787 14.178 30.0382 15.8773 29.3702C17.5765 28.7022 19.0353 27.5378 20.0637 26.0285C21.092 24.5193 21.6422 22.7352 21.6426 20.9086V10.8663C23.6475 12.3035 26.053 13.0744 28.5194 13.0702V8.1349C28.0365 8.13346 27.5551 8.0822 27.0827 7.98193V7.98193Z" fill="#fe2c55"></path><path d="M20.2184 19.6529V9.58209C22.2227 11.0206 24.6286 11.7917 27.0952 11.786V7.95319C25.638 7.6453 24.3203 6.8718 23.3408 5.7493C22.5585 5.24302 21.8875 4.58257 21.3688 3.80825C20.85 3.03392 20.4944 2.16197 20.3237 1.24561H16.7035V21.081C16.6683 21.9444 16.3651 22.7754 15.836 23.4584C15.307 24.1415 14.5784 24.6427 13.7516 24.8924C12.9247 25.1422 12.0406 25.128 11.2221 24.8519C10.4037 24.5758 9.69153 24.0515 9.18463 23.3519C8.3642 22.9198 7.71172 22.2257 7.33094 21.3799C6.95016 20.5342 6.86293 19.5853 7.08314 18.6843C7.30335 17.7833 7.81835 16.9817 8.54624 16.4072C9.27413 15.8326 10.1731 15.518 11.1003 15.5134C11.5161 15.5171 11.9291 15.5817 12.3263 15.7051V11.8722C10.5645 11.9021 8.84954 12.4442 7.39042 13.4323C5.9313 14.4205 4.79108 15.812 4.10878 17.4372C3.42648 19.0625 3.23159 20.8513 3.54787 22.5854C3.86415 24.3196 4.67793 25.9242 5.88998 27.2036C7.42947 28.2438 9.25263 28.7827 11.11 28.7464C16.1329 28.7464 20.2078 24.6782 20.2184 19.6529V19.6529Z" fill="#ffffff"></path></g><defs><clipPath id="tiktokLogo"><rect width="42" height="42" fill="#ffffff"></rect></clipPath></defs></svg>' : '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="12" fill="url(#ig)"/><defs><linearGradient id="ig" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#f09433"/><stop offset="0.25" stop-color="#e6683c"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="0.75" stop-color="#cc2366"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path d="M20 13.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm7.2-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#fff"/></svg>'}`;
      info.appendChild(platform);
      modal.appendChild(media);
      modal.appendChild(info);
      overlay.appendChild(modal);
      // Botón de cerrar (X)
      const closeBtn = document.createElement('button');
      closeBtn.className = 'sw-lightbox-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Cerrar');
      closeBtn.onclick = (e) => { e.stopPropagation(); this.close(); };
      overlay.appendChild(closeBtn);
      this.overlay = overlay;
      document.body.appendChild(overlay);
      // If it's a carousel, render it after the overlay is created
      if (post.type === 'CAROUSEL_ALBUM' && post.platform === 'instagram' && post.carousel_images) {
        setTimeout(() => {
          this.renderCarousel();
        }, 0);
      }
    }
  };

  // Registrar eventos globales
  document.addEventListener('keydown', function(e) {
    if (window.SocialWidget && window.SocialWidget.Modules && window.SocialWidget.Modules.Lightbox) {
      window.SocialWidget.Modules.Lightbox.handleKey(e);
    }
  });

  // Exportar módulo
  window.SocialWidget.Modules.Lightbox = Lightbox;
})(); 