await Promise.allSettled([
  customElements.whenDefined("wa-avatar"),
]);
document.body.classList.add("ready");
