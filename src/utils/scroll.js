/**
 * Instant scroll helpers that bypass the global `scroll-behavior: smooth` CSS rule
 * (see src/styles/globals.css).
 *
 * `behavior: "auto"` passed to `scrollTo()` / `scrollIntoView()` does NOT force an
 * instant jump: per the CSSOM View spec, "auto" means "defer to the element's
 * `scroll-behavior` CSS property", so it still scrolls smoothly whenever that CSS rule
 * is "smooth" (same for direct `scrollTop`/`scrollLeft` assignment). The only reliable
 * way to force an instant scroll is to temporarily override `scroll-behavior` to
 * "auto" via inline style *before* scrolling, then restore it right after.
 */
const withInstantScrollBehavior = (fn) => {
  const html = document.documentElement;
  const { body } = document;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  fn();
  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
};

export const scrollToTopInstant = () => {
  withInstantScrollBehavior(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  });
};

export const scrollElementToTopInstant = (el) => {
  if (!el) return;
  withInstantScrollBehavior(() => {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  });
};
