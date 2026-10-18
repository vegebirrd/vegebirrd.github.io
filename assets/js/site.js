(() => {
  'use strict';
  // Compact navigation on small screens.
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('#mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
  }

  // Notes: category filtering works even when no standalone notes exist yet.
  const filters = document.querySelectorAll('[data-notes-filter]');
  const noteCards = document.querySelectorAll('[data-note-type]');
  const empty = document.querySelector('[data-notes-empty]');
  filters.forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.notesFilter;
    filters.forEach(b => { b.classList.toggle('is-active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    let count = 0;
    noteCards.forEach(card => { const show = type === 'all' || card.dataset.noteType === type; card.hidden = !show; if (show) count++; });
    if (empty) empty.hidden = count > 0;
  }));

  // A tiny dependency-free search of real page data, not a third-party service.
  const overlay = document.querySelector('[data-search-overlay]');
  const searchInput = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  let index = null;
  let previousFocus = null;
  let requestId = 0;
  const searchUrl = overlay?.dataset.searchUrl || '/search.json';
  function closeSearch() { if (!overlay) return; overlay.hidden = true; document.body.style.overflow = ''; previousFocus?.focus(); }
  async function openSearch() {
    if (!overlay) return;
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    searchInput.focus();
    if (!index) { try { const response = await fetch(searchUrl); if (!response.ok) throw new Error('Search index unavailable'); index = await response.json(); searchInput.dispatchEvent(new Event('input')); } catch { results.textContent = 'Search is temporarily unavailable.'; } }
  }
  document.querySelectorAll('[data-search-open]').forEach(b => b.addEventListener('click', openSearch));
  document.querySelectorAll('[data-search-close]').forEach(b => b.addEventListener('click', closeSearch));
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay?.hidden ? openSearch() : closeSearch(); }
    if (e.key === 'Escape' && overlay && !overlay.hidden) closeSearch();
  });
  if (searchInput && results) searchInput.addEventListener('input', () => {
    const id = ++requestId;
    const query = searchInput.value.trim().toLocaleLowerCase();
    results.replaceChildren();
    if (!query) { const p = document.createElement('p'); p.className = 'search-hint'; p.textContent = 'Try “Radiohead”, “course”, or “VLA”.'; results.append(p); return; }
    if (!index) return;
    const matched = index.filter(item => (item.title + ' ' + item.description + ' ' + item.section).toLocaleLowerCase().includes(query)).slice(0, 15);
    if (!matched.length) { const p = document.createElement('p'); p.className = 'search-hint'; p.textContent = 'No matches yet. Try another keyword.'; results.append(p); return; }
    const fragment = document.createDocumentFragment();
    matched.forEach(item => {
      const a = document.createElement('a'); a.href = item.url; a.className = 'search-result';
      const category = document.createElement('span'); category.textContent = item.section;
      const title = document.createElement('strong'); title.textContent = item.title;
      const desc = document.createElement('small'); desc.textContent = item.description;
      a.append(category, title, desc); fragment.append(a);
    });
    if (id === requestId) results.append(fragment);
  });

  // Progressive music browsing: newest reviews first, reveal another batch on demand.
  // BNT is deliberately different: Show all tracks -> Collapse, keeping the same button.
  document.querySelectorAll('[data-progressive]').forEach(group => {
    const cards = Array.from(group.children).filter(child => child.matches('.review-card, .bnt-card'));
    const size = Math.max(1, Number(group.dataset.batch) || 6);
    const kind = group.dataset.progressive;
    const button = document.querySelector('[data-show-more="' + kind + '"]');
    if (!button || cards.length <= size) return;
    let visible = size;
    const isBnt = kind === 'bnt';
    const textNode = button.querySelector('[data-toggle-label]');
    const arrow = button.querySelector('[data-toggle-arrow]');
    function update() {
      cards.forEach((card, i) => { card.hidden = i >= visible; });
      const fullyExpanded = visible >= cards.length;
      button.hidden = !isBnt && fullyExpanded;
      if (isBnt) {
        if (textNode) textNode.textContent = fullyExpanded ? 'Collapse' : 'Show all tracks';
        if (arrow) arrow.textContent = fullyExpanded ? '↑' : '↓';
        button.setAttribute('aria-expanded', String(fullyExpanded));
        button.setAttribute('aria-label', fullyExpanded ? 'Collapse Best New Tracks' : 'Show all Best New Tracks');
      } else {
        button.setAttribute('aria-label', 'Show more ' + kind + ' reviews, ' + (cards.length - visible) + ' remaining');
      }
    }
    button.addEventListener('click', () => {
      if (isBnt) {
        const wasExpanded = visible === cards.length;
        visible = wasExpanded ? size : cards.length;
        update();
        if (wasExpanded) {
          const section = group.closest('section');
          if (section && button.getBoundingClientRect().top < 0) {
            section.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
          }
        }
      } else {
        visible = Math.min(cards.length, visible + size);
        update();
      }
    });
    update();
    button.hidden = false;
  });

  // Rank typography: preserve markup (italics/links) while highlighting the numeral.
  document.querySelectorAll('.article-body--music-feature h2').forEach(heading => {
    const first = heading.firstChild;
    if (!first || first.nodeType !== Node.TEXT_NODE) return;
    const match = first.textContent.match(/^\s*(\d{1,3})\.\s*/);
    if (!match) return;
    first.textContent = first.textContent.slice(match[0].length);
    const num = document.createElement('span');
    num.className = 'music-rank-number';
    num.textContent = match[1].padStart(2, '0');
    heading.insertBefore(num, first);
    heading.classList.add('music-rank-heading');
  });


  // WeChat contact QR: native modal, no navigation or new browser tab.
  const wechatDialog = document.querySelector('[data-wechat-dialog]');
  if (wechatDialog) {
    let wechatTrigger = null;
    let previousOverflow = '';
    document.querySelectorAll('[data-wechat-open]').forEach(button => {
      button.addEventListener('click', () => {
        if (wechatDialog.open) return;
        wechatTrigger = button;
        previousOverflow = document.body.style.overflow;
        wechatDialog.showModal();
        document.body.style.overflow = 'hidden';
        wechatDialog.querySelector('[data-wechat-close]')?.focus();
      });
    });
    wechatDialog.querySelectorAll('[data-wechat-close]').forEach(button =>
      button.addEventListener('click', () => wechatDialog.close()));
    wechatDialog.addEventListener('click', event => {
      // A click on the backdrop is delivered to the dialog outside its box.
      if (event.target !== wechatDialog) return;
      const rect = wechatDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) wechatDialog.close();
    });
    wechatDialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      wechatTrigger?.focus();
    });
  }

  // Minimal photo lightbox (escape and click-to-close).
  const photoLinks = document.querySelectorAll('[data-lightbox]');
  photoLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const modal = document.createElement('div'); modal.className = 'lightbox-panel'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Photo preview');
    const image = document.createElement('img'); image.src = link.href; image.alt = link.querySelector('img')?.alt || 'Photo';
    const close = document.createElement('button'); close.type = 'button'; close.textContent = '×'; close.setAttribute('aria-label', 'Close photo preview');
    const remove = () => { modal.remove(); document.removeEventListener('keydown', onKey); link.focus(); };
    const onKey = e => { if (e.key === 'Escape') remove(); };
    close.addEventListener('click', remove); modal.addEventListener('click', e => { if (e.target === modal) remove(); });
    modal.append(image, close); document.body.append(modal); close.focus(); document.addEventListener('keydown', onKey);
  }));
})();
