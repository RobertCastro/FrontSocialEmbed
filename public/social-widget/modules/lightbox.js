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
      // Solo mostrar flechas de navegación entre posts en desktop
      const isMobile = window.innerWidth <= 700;
      if (!isMobile) {
        if (this.currentIndex > 0) overlay.appendChild(navLeft);
        if (this.currentIndex < this.posts.length - 1) overlay.appendChild(navRight);
      }
      const info = document.createElement('div');
      info.className = 'sw-lightbox-info';
      const avatar = document.createElement('div');
      avatar.className = 'sw-lightbox-avatar';
      // Avatar de la cuenta
      let avatarImg = '';
      if (this.account && this.account.avatarUrl) {
        avatarImg = `<img src="${this.account.avatarUrl}" alt="${this.account.displayName || this.account.username}" />`;
      } else {
        avatarImg = `<span class="sw-lightbox-avatar-fallback">${(this.account && (this.account.displayName || this.account.username) ? (this.account.displayName || this.account.username)[0].toUpperCase() : '?')}</span>`;
      }
      // Logo de la plataforma
      let platformIcon = '';
      if (this.account && this.account.platform === 'tiktok') {
        platformIcon = `<span class="sw-lightbox-platform-icon">${tiktokIcon(28)}</span>`;
      } else {
        platformIcon = `<span class="sw-lightbox-platform-icon">${instagramIcon(28)}</span>`;
      }
      // Estructura: avatar a la izquierda, logo a la derecha
      avatar.innerHTML = `<span class="sw-lightbox-avatar-img">${avatarImg}</span>${platformIcon}`;
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
      // Soporte de swipe/touch en mobile para navegar entre posts
      if (window.innerWidth <= 700) {
        let touchStartX = 0;
        let touchEndX = 0;
        overlay.addEventListener('touchstart', function(e) {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
          }
        });
        overlay.addEventListener('touchmove', function(e) {
          if (e.touches.length === 1) {
            touchEndX = e.touches[0].clientX;
          }
        });
        overlay.addEventListener('touchend', function(e) {
          // Solo activar swipe si el target es el overlay (no un botón, video, etc.)
          if (e.target !== overlay) return;
          const deltaX = touchEndX - touchStartX;
          if (Math.abs(deltaX) > 60) {
            if (deltaX < 0) {
              this.next();
            } else {
              this.prev();
            }
          }
        }.bind(this));
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

// Helpers para los iconos
function tiktokIcon(size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" transparent="true"><g clip-path="url(#tiktokLogo)"><path d="M23.3411 5.7493C22.2479 4.50395 21.6452 2.90303 21.6458 1.24561H20.324C20.4947 2.16197 20.8503 3.03393 21.369 3.80825C21.8877 4.58257 22.5587 5.24302 23.3411 5.7493V5.7493ZM11.1102 15.4943C10.1831 15.499 9.28426 15.8137 8.55647 16.3882C7.82868 16.9628 7.31376 17.7642 7.09356 18.6652C6.87337 19.5661 6.96054 20.5149 7.34123 21.3606C7.72191 22.2062 8.37426 22.9003 9.19455 23.3325C8.74606 22.713 8.47748 21.9815 8.41849 21.2188C8.3595 20.4562 8.5124 19.692 8.86028 19.0108C9.20817 18.3297 9.7375 17.758 10.3898 17.3589C11.0421 16.9598 11.792 16.7489 12.5566 16.7495C12.9722 16.7549 13.385 16.8197 13.7824 16.9417V11.901C13.3766 11.8401 12.9669 11.8081 12.5566 11.8052H12.3362V15.638C11.9367 15.5308 11.5237 15.4824 11.1102 15.4943V15.4943Z" fill="#fe2C55"></path><path d="M12.3353 11.8147V10.6456C11.9297 10.5814 11.52 10.5462 11.1093 10.5403C7.13373 10.5318 3.61405 13.1093 2.42018 16.9031C1.2263 20.6969 2.63553 24.8267 5.89875 27.0982C4.70212 25.817 3.90174 24.2166 3.59421 22.4903C3.28668 20.764 3.48516 18.9855 4.16568 17.3696C4.84621 15.7536 5.97969 14.3693 7.4293 13.3836C8.87892 12.3979 10.5827 11.8531 12.335 11.8148L12.3353 11.8147Z" fill="#25f4ee"></path><path d="M12.5574 25.0573C14.7802 25.0543 16.6073 23.3024 16.7046 21.0807V1.25531H20.3248C20.2509 0.841037 20.2157 0.420795 20.2195 0L15.2678 0V19.8063C15.1854 22.0393 13.354 23.808 11.1206 23.8116C10.4532 23.8059 9.79665 23.6417 9.20508 23.3325C9.58849 23.864 10.092 24.2972 10.6746 24.597C11.2572 24.8967 11.9023 25.0544 12.5574 25.0573V25.0573ZM27.0867 7.98186V6.87992C25.7544 6.88044 24.4516 6.48711 23.3419 5.74932C24.3146 6.8807 25.6292 7.6644 27.0867 7.98186V7.98186Z" fill="#25f4ee"></path><path d="M27.0827 7.98193V11.8149C24.6162 11.8101 22.2137 11.0289 20.2155 9.58218V19.653C20.2049 24.6783 16.13 28.7465 11.1071 28.7465C9.24156 28.7499 7.42099 28.174 5.89648 27.0984C7.13963 28.4361 8.75662 29.3683 10.5368 29.7735C12.3171 30.1787 14.178 30.0382 15.8773 29.3702C17.5765 28.7022 19.0353 27.5378 20.0637 26.0285C21.092 24.5193 21.6422 22.7352 21.6426 20.9086V10.8663C23.6475 12.3035 26.053 13.0744 28.5194 13.0702V8.1349C28.0365 8.13346 27.5551 8.0822 27.0827 7.98193V7.98193Z" fill="#fe2c55"></path><path d="M20.2184 19.6529V9.58209C22.2227 11.0206 24.6286 11.7917 27.0952 11.786V7.95319C25.638 7.6453 24.3203 6.8718 23.3408 5.7493C22.5585 5.24302 21.8875 4.58257 21.3688 3.80825C20.85 3.03392 20.4944 2.16197 20.3237 1.24561H16.7035V21.081C16.6683 21.9444 16.3651 22.7754 15.836 23.4584C15.307 24.1415 14.5784 24.6427 13.7516 24.8924C12.9247 25.1422 12.0406 25.128 11.2221 24.8519C10.4037 24.5758 9.69153 24.0515 9.18463 23.3519C8.3642 22.9198 7.71172 22.2257 7.33094 21.3799C6.95016 20.5342 6.86293 19.5853 7.08314 18.6843C7.30335 17.7833 7.81835 16.9817 8.54624 16.4072C9.27413 15.8326 10.1731 15.518 11.1003 15.5134C11.5161 15.5171 11.9291 15.5817 12.3263 15.7051V11.8722C10.5645 11.9021 8.84954 12.4442 7.39042 13.4323C5.9313 14.4205 4.79108 15.812 4.10878 17.4372C3.42648 19.0625 3.23159 20.8513 3.54787 22.5854C3.86415 24.3196 4.67793 25.9242 5.88998 27.2036C7.42947 28.2438 9.25263 28.7827 11.11 28.7464C16.1329 28.7464 20.2078 24.6782 20.2184 19.6529V19.6529Z" fill="#ffffff"></path></g><defs><clipPath id="tiktokLogo"><rect width="42" height="42" fill="#ffffff"></rect></clipPath></defs></svg>`;
}
function instagramIcon(size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" card-type="media"><path d="M16.5386 5.32888C16.5386 4.66418 15.9999 4.12748 15.3377 4.12748C14.6754 4.12748 14.1362 4.66418 14.1362 5.32888C14.1362 5.99113 14.6754 6.52783 15.3377 6.52783C15.9999 6.52783 16.5386 5.99113 16.5386 5.32888" fill="#ffffff"></path><path d="M18.1388 14.7071C18.0943 15.6822 17.9312 16.212 17.7958 16.5638C17.614 17.0304 17.397 17.364 17.0451 17.7139C16.6972 18.0638 16.3636 18.2802 15.8971 18.4601C15.5452 18.5975 15.0134 18.7611 14.0384 18.8075C12.9843 18.854 12.6719 18.8639 9.99876 18.8639C7.32809 18.8639 7.01325 18.854 5.95911 18.8075C4.98407 18.7611 4.45478 18.5975 4.10288 18.4601C3.63389 18.2802 3.30279 18.0638 2.95289 17.7139C2.60051 17.364 2.38356 17.0304 2.20417 16.5638C2.06873 16.212 1.9032 15.6822 1.86116 14.7071C1.80979 13.653 1.80038 13.3357 1.80038 10.668C1.80038 7.99483 1.80979 7.68 1.86116 6.62586C1.9032 5.65082 2.06873 5.12152 2.20417 4.76666C2.38356 4.30064 2.60051 3.96901 2.95289 3.61912C3.30279 3.26974 3.63389 3.05276 4.10288 2.87091C4.45478 2.73303 4.98407 2.57191 5.95911 2.52547C7.01325 2.47899 7.32809 2.46712 9.99876 2.46712C12.6719 2.46712 12.9843 2.47899 14.0384 2.52547C15.0134 2.57191 15.5452 2.73303 15.8971 2.87091C16.3636 3.05276 16.6972 3.26974 17.0451 3.61912C17.397 3.96901 17.614 4.30064 17.7958 4.76666C17.9312 5.12152 18.0943 5.65082 18.1388 6.62586C18.1877 7.68 18.1996 7.99483 18.1996 10.668C18.1996 13.3357 18.1877 13.653 18.1388 14.7071V14.7071ZM19.9392 6.54384C19.8903 5.47832 19.7222 4.75035 19.4727 4.11631C19.2187 3.45851 18.8781 2.90105 18.3207 2.34359C17.7657 1.78861 17.2082 1.44809 16.5504 1.19111C15.9139 0.943997 15.1884 0.773977 14.1224 0.727534C13.0564 0.676125 12.7159 0.666746 9.99876 0.666746C7.28409 0.666746 6.94112 0.676125 5.87512 0.727534C4.81157 0.773977 4.08657 0.943997 3.44708 1.19111C2.79176 1.44809 2.2343 1.78861 1.67932 2.34359C1.12186 2.90105 0.781338 3.45851 0.524846 4.11631C0.277731 4.75035 0.109714 5.47832 0.0583039 6.54384C0.0118609 7.60984 0 7.95084 0 10.668C0 13.3827 0.0118609 13.7231 0.0583039 14.7891C0.109714 15.8527 0.277731 16.5801 0.524846 17.2172C0.781338 17.8725 1.12186 18.4324 1.67932 18.9874C2.2343 19.5424 2.79176 19.8854 3.44708 20.1419C4.08657 20.389 4.81157 20.557 5.87512 20.606C6.94112 20.6549 7.28409 20.6667 9.99876 20.6667C12.7159 20.6667 13.0564 20.6549 14.1224 20.606C15.1884 20.557 15.9139 20.389 16.5504 20.1419C17.2082 19.8854 17.7657 19.5424 18.3207 18.9874C18.8781 18.4324 19.2187 17.8725 19.4727 17.2172C19.7222 16.5801 19.8903 15.8527 19.9392 14.7891C19.9881 13.7231 20 13.3827 20 10.668C20 7.95084 19.9881 7.60984 19.9392 6.54384V6.54384Z" fill="#ffffff"></path><path d="M9.99877 13.9984C8.15885 13.9984 6.66586 12.5079 6.66586 10.6679C6.66586 8.82504 8.15885 7.33257 9.99877 7.33257C11.8392 7.33257 13.3342 8.82504 13.3342 10.6679C13.3342 12.5079 11.8392 13.9984 9.99877 13.9984V13.9984ZM9.99877 5.52971C7.16253 5.52971 4.86548 7.83169 4.86548 10.6679C4.86548 13.5017 7.16253 15.8013 9.99877 15.8013C12.835 15.8013 15.1346 13.5017 15.1346 10.6679C15.1346 7.83169 12.835 5.52971 9.99877 5.52971Z" fill="#ffffff"></path></svg>`;
} 