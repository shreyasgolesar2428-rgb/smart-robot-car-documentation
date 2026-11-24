/**
 * AUTONOMOUS OBSTACLE AVOIDING & LINE FOLLOWING SMART CAR
 * ENGINEERING DOCUMENTATION ENGINE (docs.js)
 * Implements chapter switching, dynamic TOC, instant search, copy buttons, modals, & theme
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initHashRouting();
  initCodeCopyButtons();
  initSearchModal();
  initDiagramModal();
  initViewModeToggle();
});

/* =====================================================================================
 * 1. THEME TOGGLE (DARK / LIGHT MODE)
 * ===================================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('doc-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = html.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('doc-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* =====================================================================================
 * 2. SIDEBAR NAVIGATION & COLLAPSIBLE GROUPS
 * ===================================================================================== */
function initSidebar() {
  const sidebar = document.getElementById('docSidebar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const backdrop = document.getElementById('sidebarBackdrop');
  const filterInput = document.getElementById('sidebarFilter');

  // Mobile drawer toggle
  if (mobileToggle && sidebar && backdrop) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
    });
  }

  // Collapsible section groups
  const groupTitles = document.querySelectorAll('.sidebar-group-title');
  groupTitles.forEach(title => {
    title.addEventListener('click', () => {
      const group = title.closest('.sidebar-group');
      if (group) {
        group.classList.toggle('collapsed');
      }
    });
  });

  // Sidebar real-time filter input
  if (filterInput) {
    filterInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const links = document.querySelectorAll('.sidebar-link');
      
      links.forEach(link => {
        const text = link.textContent.toLowerCase();
        const listItem = link.parentElement;
        if (text.includes(q)) {
          listItem.style.display = 'block';
        } else {
          listItem.style.display = 'none';
        }
      });

      if (q.length > 0) {
        document.querySelectorAll('.sidebar-group').forEach(g => g.classList.remove('collapsed'));
      }
    });
  }
}

/* =====================================================================================
 * 3. HASH ROUTING & CHAPTER SWITCHING
 * ===================================================================================== */
function initHashRouting() {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

function handleHashChange() {
  const fullHash = window.location.hash.replace('#', '') || 'ch1';
  let chapterId = fullHash;
  let subAnchor = null;

  // Extract base chapter id (e.g., 'ch15' from 'ch15-master-schematic')
  const match = fullHash.match(/^(ch\d+)/);
  if (match) {
    chapterId = match[1];
    if (fullHash !== chapterId) {
      subAnchor = fullHash;
    }
  }

  const targetChapter = document.getElementById(chapterId) || document.getElementById('ch1');
  if (!targetChapter) return;

  const isContinuous = document.body.classList.contains('continuous-mode');

  if (!isContinuous) {
    // Single Chapter Focus Mode: Hide others, show target
    document.querySelectorAll('.doc-chapter').forEach(c => c.classList.remove('active'));
    targetChapter.classList.add('active');

    if (subAnchor) {
      const subEl = document.getElementById(subAnchor);
      if (subEl) {
        setTimeout(() => subEl.scrollIntoView({ behavior: 'smooth' }), 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    // Continuous Mode: scroll smoothly to target
    const scrollTarget = subAnchor ? document.getElementById(subAnchor) : targetChapter;
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Update active state in sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    if (link.getAttribute('href') === `#${chapterId}`) {
      link.classList.add('active');
      link.scrollIntoView({ block: 'nearest' });
      // Ensure its parent group is expanded
      const group = link.closest('.sidebar-group');
      if (group) group.classList.remove('collapsed');
    } else {
      link.classList.remove('active');
    }
  });

  // Update breadcrumb
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  const chapterHeading = targetChapter.querySelector('.chapter-title');
  if (breadcrumbCurrent && chapterHeading) {
    breadcrumbCurrent.textContent = chapterHeading.textContent.trim();
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('docSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  // Regenerate dynamic TOC for the active chapter
  generateTOCForChapter(targetChapter);
}

/* =====================================================================================
 * 4. DYNAMIC TABLE OF CONTENTS (ON THIS PAGE)
 * ===================================================================================== */
function generateTOCForChapter(chapterEl) {
  const tocList = document.getElementById('tocList');
  if (!tocList || !chapterEl) return;

  tocList.innerHTML = '';
  const headings = chapterEl.querySelectorAll('h2, h3');

  if (headings.length === 0) {
    const li = document.createElement('li');
    li.innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem;">No sub-sections</span>';
    tocList.appendChild(li);
    return;
  }

  headings.forEach(heading => {
    let id = heading.id;
    if (!id) {
      id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      heading.id = id;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-link h3-link' : 'toc-link';
    a.textContent = heading.textContent.replace(/^[0-9.]+\s*/, '').trim();

    a.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, `#${id}`);
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });

  setupScrollSpy(headings);
}

let activeObserver = null;
function setupScrollSpy(headings) {
  if (activeObserver) activeObserver.disconnect();

  const tocLinks = document.querySelectorAll('.toc-link');

  activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-70px 0px -70% 0px' });

  headings.forEach(h => activeObserver.observe(h));
}

/* =====================================================================================
 * 5. CODE BLOCK COPY BUTTONS
 * ===================================================================================== */
function initCodeCopyButtons() {
  const copyBtns = document.querySelectorAll('.code-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.code-block-container');
      const codeEl = container ? container.querySelector('code, pre') : null;
      if (codeEl) {
        const codeText = codeEl.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check" style="color:#10b981;"></i> Copied!';
          showToast('Code copied to clipboard');
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        }).catch(err => {
          showToast('Failed to copy: ' + err);
        });
      }
    });
  });
}

/* =====================================================================================
 * 6. INSTANT SEARCH MODAL
 * ===================================================================================== */
function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const triggerBtn = document.getElementById('searchTriggerBtn');
  const closeBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchModalInput');
  const resultsContainer = document.getElementById('searchResultsList');

  if (!modal || !searchInput || !resultsContainer) return;

  function openSearch() {
    modal.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    renderSearchResults('');
  }

  function closeSearch() {
    modal.classList.remove('open');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  function renderSearchResults(query) {
    resultsContainer.innerHTML = '';
    const q = query.toLowerCase().trim();

    let matches = [];
    if (q === '') {
      matches = DOCS_SEARCH_INDEX.slice(0, 8);
    } else {
      matches = DOCS_SEARCH_INDEX.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.excerpt.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q) ||
               item.keywords.toLowerCase().includes(q);
      });
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 28px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          <i class="fas fa-search" style="font-size: 1.6rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          No chapters found matching "<strong>${escapeHtml(query)}</strong>".
        </div>
      `;
      return;
    }

    matches.forEach(item => {
      const a = document.createElement('a');
      a.href = `#${item.id}`;
      a.className = 'search-result-item';
      a.innerHTML = `
        <div class="search-result-title">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--brand-primary); font-weight: 700;">Ch ${item.num}</span>
          <span>${item.title}</span>
          <span style="margin-left: auto; font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">${item.category}</span>
        </div>
        <div class="search-result-snippet">${highlightMatch(item.excerpt, q)}</div>
      `;

      a.addEventListener('click', () => {
        closeSearch();
      });

      resultsContainer.appendChild(a);
    });
  }
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark style="background:#fef08a; color:#0f172a; padding:1px 3px; border-radius:2px;">$1</mark>');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* =====================================================================================
 * 7. DIAGRAM LIGHTBOX MODAL
 * ===================================================================================== */
function initDiagramModal() {
  const modal = document.getElementById('diagramModal');
  const closeBtn = document.getElementById('diagramModalClose');
  const modalTitle = document.getElementById('diagramModalTitle');
  const modalBody = document.getElementById('diagramModalBody');
  const downloadBtn = document.getElementById('diagramDownloadBtn');

  if (!modal || !modalBody) return;

  const diagramCards = document.querySelectorAll('.diagram-figure');
  diagramCards.forEach(card => {
    const viewBtn = card.querySelector('.view-full-diagram-btn');
    const imgOrSvg = card.querySelector('.diagram-svg-wrapper img, .diagram-svg-wrapper svg');
    const caption = card.querySelector('.diagram-header-bar span') || { textContent: 'Technical Diagram' };

    const openHandler = () => {
      if (!imgOrSvg) return;
      modalTitle.textContent = caption.textContent.trim();
      modalBody.innerHTML = '';

      if (imgOrSvg.tagName.toLowerCase() === 'img') {
        const cloneImg = document.createElement('img');
        cloneImg.src = imgOrSvg.src;
        cloneImg.alt = imgOrSvg.alt;
        modalBody.appendChild(cloneImg);
        if (downloadBtn) {
          downloadBtn.href = imgOrSvg.src;
          downloadBtn.download = imgOrSvg.src.split('/').pop() || 'diagram.svg';
        }
      } else {
        const cloneSvg = imgOrSvg.cloneNode(true);
        modalBody.appendChild(cloneSvg);
      }

      modal.classList.add('open');
    };

    if (viewBtn) viewBtn.addEventListener('click', openHandler);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

/* =====================================================================================
 * 8. VIEW MODE TOGGLE (CHAPTER FOCUS VS CONTINUOUS SCROLL)
 * ===================================================================================== */
function initViewModeToggle() {
  // Can be triggered programmatically or via print
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('continuous-mode');
    document.querySelectorAll('.doc-chapter').forEach(c => c.classList.add('active'));
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('continuous-mode');
    handleHashChange();
  });
}

/* =====================================================================================
 * 9. TOAST NOTIFICATION UTILITY
 * ===================================================================================== */
function showToast(message) {
  let toast = document.getElementById('docToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'docToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-info-circle" style="color:var(--brand-accent);"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
