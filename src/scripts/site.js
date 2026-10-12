(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero spotlight: light follows the cursor ---------- */
  document.querySelectorAll('.hero, .page-hero').forEach((hero) => {
    if (reduced) return;
    let raf = null;
    hero.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        raf = null;
      });
    }, { passive: true });
  });

  /* ---------- Scroll reveal (with no-JS + safety net) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 2500);
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Inline directory search (city-first, no redirect) ---------- */
  const index = document.getElementById('biz-index');
  const results = document.getElementById('search-results');
  const input = document.getElementById('city-search');
  const searchBtn = document.getElementById('search-go');
  const emptyMsg = document.getElementById('search-empty');
  if (!index || !results || !input) return;
  let data;
  try { data = JSON.parse(index.textContent); } catch { return; }

  const norm = (s) => (s || '').toString().toLowerCase().trim();
  const stars = (n) => { const r = Math.round(n); return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r); };

  const CONF = {
    'provider-verified': { label: 'Website verified', cls: 'is-verified' },
    'directory-listed': { label: 'Directory listed', cls: 'is-listed' },
    'needs-confirmation': { label: 'Needs confirmation', cls: '' },
  };

  function cardHtml(b) {
    const conf = CONF[b.confidence] || CONF['needs-confirmation'];
    const badges = b.services.map((s) => `<span class="badge svc">${s}</span>`).join('');
    const tel = (b.phone || '').replace(/[^0-9+]/g, '');
    const rating = b.rating > 0
      ? `<span class="rating"><span class="stars">${stars(b.rating)}</span> ${b.rating.toFixed(1)}${b.reviewCount > 0 ? ` <span class="cnt">(${b.reviewCount}${b.ratingSource ? ' · ' + b.ratingSource : ''})</span>` : ''}</span>`
      : '<span class="rating" style="color:var(--soft);font-weight:400">No public reviews listed</span>';
    const callBtn = tel
      ? `<a class="btn btn-primary btn-sm" href="tel:${tel}">Call</a>`
      : (b.sourceUrl ? `<a class="btn btn-gold btn-sm" href="${b.sourceUrl}" rel="nofollow noopener" target="_blank">See listing</a>` : '');
    return `
      <article class="biz-card reveal in">
        <div class="top">
          <div>
            <h3><a href="/business/${b.slug}/">${b.name}</a></h3>
            <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${b.city}, ${b.state}${b.county ? ' · ' + b.county + ' County' : ''}</div>
          </div>
          <span class="confidence-chip ${conf.cls}"><span class="dot"></span>${conf.label}</span>
        </div>
        <div class="badge-row">${badges}</div>
        <div class="row2">
          ${rating}
          <div class="actions">
            ${callBtn}
            <a class="btn btn-ghost btn-sm" href="/business/${b.slug}/">Profile</a>
          </div>
        </div>
        <div class="src">Source: <a href="${b.sourceUrl}" rel="nofollow noopener" target="_blank">${b.sourceLabel}</a></div>
      </article>`;
  }

  function search(qRaw) {
    const q = norm(qRaw);
    results.replaceChildren();
    if (!q) {
      results.hidden = true;
      emptyMsg.hidden = true;
      return;
    }
    const exact = [], county = [], wider = [], byName = [];
    for (const b of data) {
      const hay = [b.city, ...(b.serviceArea || [])].map(norm);
      const nameHit = norm(b.name).includes(q);
      const cityHit = hay.some((h) => h.includes(q) || (q.length >= 4 && h.includes(q.slice(0, 4))));
      if (cityHit) exact.push(b);
      else if (nameHit) byName.push(b);
      else wider.push(b);
    }
    const groups = [
      { list: byName, title: 'Matching businesses', note: '' },
      { list: exact, title: 'Serving your city', note: '' },
    ];
    let html = '';
    for (const g of groups) if (g.list.length) html += groupHtml(g) + `<div class="cards-grid">${g.list.map(cardHtml).join('')}</div>`;
    if (exact.length + byName.length === 0) {
      const nearby = wider.slice(0, 8);
      html = groupHtml({ list: nearby, title: 'No exact match — crews serving the wider Shoals', note: 'Every crew below serves surrounding areas. Confirm travel to your address when you call.' })
        + `<div class="cards-grid">${nearby.map(cardHtml).join('')}</div>`;
      emptyMsg.hidden = false;
    } else {
      emptyMsg.hidden = true;
    }
    results.insertAdjacentHTML('afterbegin', html);
    results.hidden = false;
    results.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function groupHtml(g) {
    return `<div class="group-head"><h2>${g.title}</h2><span class="count">${g.list.length}</span>${g.note ? `<span class="note">${g.note}</span>` : ''}</div>`;
  }

  let deb;
  input.addEventListener('input', () => {
    clearTimeout(deb);
    deb = setTimeout(() => search(input.value), 180);
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); search(input.value); } });
  if (searchBtn) searchBtn.addEventListener('click', () => search(input.value));

  document.querySelectorAll('.search-chips button[data-city]').forEach((btn) => {
    btn.addEventListener('click', () => { input.value = btn.dataset.city; search(btn.dataset.city); });
  });

  /* ---------- Stump cost estimator ---------- */
  const dia = document.getElementById('stump-dia');
  const out = document.getElementById('stump-out');
  const outNote = document.getElementById('stump-out-note');
  const diaRead = document.getElementById('dia-read');
  const stumpsRead = document.getElementById('stumps-read');
  const stumpCount = document.getElementById('stump-count');
  if (dia && out) {
    // Published industry ranges (Angi/HomeAdvisor-style): small ~$75–150,
    // medium ~$150–300, large ~$300–500+, per-inch heuristics vary.
    const calc = () => {
      const d = parseInt(dia.value, 10) || 0;
      const n = Math.max(1, parseInt(stumpCount ? stumpCount.value : '1', 10) || 1);
      if (diaRead) diaRead.textContent = `${d}″`;
      if (stumpsRead) stumpsRead.textContent = n;
      let lo, hi, note;
      if (d <= 12) { lo = 75; hi = 150; note = 'Small stump — quick job, most crews have a minimum charge around this size.'; }
      else if (d <= 24) { lo = 150; hi = 300; note = 'Medium stump — the most common residential job in the Shoals.'; }
      else if (d <= 36) { lo = 300; hi = 450; note = 'Large stump — heavier grinding head, slower work.'; }
      else { lo = 450; hi = 700; note = 'Extra-large stump — access and root spread push the price up.'; }
      lo = Math.round(lo * n * 0.9); hi = Math.round(hi * n * 0.95);
      out.textContent = `$${lo.toLocaleString()} – $${hi.toLocaleString()}`;
      if (outNote) outNote.textContent = note + (n > 1 ? ` Multi-stump discount applied roughly — crews usually drop the per-stump price past three or four.` : '');
    };
    dia.addEventListener('input', calc);
    if (stumpCount) stumpCount.addEventListener('input', calc);
    document.querySelectorAll('.tool-chips button[data-dia]').forEach((b) => {
      b.addEventListener('click', () => { dia.value = b.dataset.dia; calc(); });
    });
    calc();
  }
})();
