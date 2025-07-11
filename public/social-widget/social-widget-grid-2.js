// social-widget-grid-2.js: Renderiza el grid alternativo 'grid-2'

function renderSocialWidgetGrid2(posts, container, openLightbox, account) {
  container.classList.add('sw-grid-2');
  container.innerHTML = '';
  // Guardar account global para lightbox si es necesario
  if (account) {
    if (!window.SocialWidgetGrid2) window.SocialWidgetGrid2 = {};
    window.SocialWidgetGrid2._currentAccountObj = account;
  } else if (window.SocialWidgetGrid2 && window.SocialWidgetGrid2._currentAccountObj) {
    account = window.SocialWidgetGrid2._currentAccountObj;
  }
  posts.forEach((post, idx) => {
    const card = document.createElement('div');
    card.className = 'sw-grid-2-card';

    // Header
    const header = document.createElement('div');
    header.className = 'sw-grid-2-card-header';
    // Avatar o fallback
    let avatarEl;
    const displayName = post.account_display_name || (account && (account.displayName || account.username)) || '';
    if (account && account.avatarUrl) {
      avatarEl = document.createElement('img');
      avatarEl.className = 'sw-grid-2-card-avatar';
      avatarEl.src = account.avatarUrl;
      avatarEl.alt = displayName;
    } else {
      avatarEl = document.createElement('div');
      avatarEl.className = 'sw-grid-2-card-avatar-fallback';
      avatarEl.textContent = (displayName[0] || '?').toUpperCase();
    }
    header.appendChild(avatarEl);
    // Display name
    const displayNameEl = document.createElement('span');
    displayNameEl.className = 'sw-grid-2-card-displayname';
    displayNameEl.textContent = displayName;
    header.appendChild(displayNameEl);
    // Platform icon
    const platform = document.createElement('span');
    platform.className = 'sw-grid-2-card-platform';
    platform.innerHTML = getPlatformIcon(post.platform || (account && account.platform)); // función auxiliar
    header.appendChild(platform);
    card.appendChild(header);

    // Descripción
    const desc = document.createElement('div');
    desc.className = 'sw-grid-2-card-desc';
    desc.textContent = post.description || post.title || '';
    card.appendChild(desc);

    // Thumbnail
    const thumb = document.createElement('img');
    thumb.className = 'sw-grid-2-card-thumb';
    thumb.src = post.thumbnail || post.thumbnail_url || post.image_url || '';
    thumb.alt = post.description || post.title || '';
    thumb.addEventListener('click', () => openLightbox(idx));
    card.appendChild(thumb);

    // Barra de acciones
    const actions = document.createElement('div');
    actions.className = 'sw-grid-2-card-actions';
    // Izquierda: likes y comentarios
    const actionsLeft = document.createElement('div');
    actionsLeft.className = 'sw-grid-2-card-actions-left';
    // Likes
    const like = document.createElement('span');
    like.className = 'sw-grid-2-card-action';
    like.innerHTML = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> <span>${post.likes || 0}</span>`;
    actionsLeft.appendChild(like);
    // Comentarios
    const comments = document.createElement('span');
    comments.className = 'sw-grid-2-card-action';
    comments.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> <span>${post.comments || (post.metrics && post.metrics.comments) || 0}</span>`;
    actionsLeft.appendChild(comments);
    actions.appendChild(actionsLeft);
    // Derecha: compartir
    const share = document.createElement('span');
    share.className = 'sw-grid-2-card-actions-share';
    share.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Compartir`;
    actions.appendChild(share);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

// Función auxiliar para el icono de red
function getPlatformIcon(platform) {
  if (platform === 'instagram') {
    return '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.5 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>';
  }
  // Otros iconos...
  return '';
}

// Export para loader dinámico
window.renderSocialWidgetGrid2 = renderSocialWidgetGrid2; 