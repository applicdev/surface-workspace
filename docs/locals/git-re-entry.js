const href = globalThis.sessionStorage.redirect;
delete sessionStorage.redirect;

if (href && href != globalThis.location.href) {
  globalThis.history.replaceState(null, null, href);
}
