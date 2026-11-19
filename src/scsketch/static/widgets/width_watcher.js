// Sets data-sc-width="wide" | "medium" | "narrow" on the nearest .sc-root
// ancestor, following that element's width. Breakpoints match scsketch.css.
const MEDIUM_MAX = 1000;
const NARROW_MAX = 760;

function bucket(width) {
  if (width <= NARROW_MAX) return "narrow";
  if (width <= MEDIUM_MAX) return "medium";
  return "wide";
}

function render({ el }) {
  el.style.display = "none";
  let observer = null;
  let frame = null;
  let attempts = 0;

  const attach = () => {
    const root = el.closest(".sc-root");
    if (!root) {
      // Not attached to the DOM yet; try again for a short while.
      if (attempts++ < 60) frame = requestAnimationFrame(attach);
      return;
    }
    const apply = () => {
      root.dataset.scWidth = bucket(root.getBoundingClientRect().width);
    };
    apply();
    observer = new ResizeObserver(apply);
    observer.observe(root);
  };
  attach();

  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    if (observer) observer.disconnect();
  };
}
export default { render };
