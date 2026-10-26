(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let veil = null;
  let scheduled = false;
  const clamp = value => Math.max(0, Math.min(1, value));

  function update() {
    scheduled = false;
    if (!veil) return;
    const viewport = innerHeight;
    const remaining = Math.max(0, document.documentElement.scrollHeight - viewport - scrollY);
    const feather = Math.max(1, viewport * 0.22);
    veil.style.setProperty('--edge-top', clamp(scrollY / feather).toFixed(3));
    veil.style.setProperty('--edge-bottom', clamp(remaining / feather).toFixed(3));
  }
  function schedule() {
    if (scheduled || !veil) return;
    scheduled = true;
    requestAnimationFrame(update);
  }
  function configure() {
    if (preference.matches) {
      veil?.remove();
      veil = null;
      return;
    }
    if (!veil) {
      veil = document.createElement('div');
      veil.className = 'scroll-vignette';
      veil.setAttribute('aria-hidden', 'true');
      document.body.append(veil);
    }
    update();
  }
  // The page passes through two feathered viewport edges in either direction.
  // No section rectangles, scroll interception or one-time reveal state.
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  preference.addEventListener?.('change', configure);
  configure();
})();
