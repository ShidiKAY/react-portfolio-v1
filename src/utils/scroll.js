/**
 * Instant scroll helpers that bypass the global `scroll-behavior: smooth` CSS rule
 * (see src/styles/globals.css). `window.scrollTo()` / `Element.scrollIntoView()` honor
 * that CSS property even when `behavior: "auto"` is passed and briefly toggling the
 * inline style back and forth around the call is unreliable (the browser can coalesce
 * the style changes and animate anyway). Directly assigning `scrollTop` is not a
 * "scrolling operation" under the CSSOM View spec, so it always jumps instantly.
 */

export const scrollToTopInstant = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0; // some browsers scroll the body instead of <html>
};

export const scrollElementToTopInstant = (el) => {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
};
