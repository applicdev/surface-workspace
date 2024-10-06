sessionStorage.redirect = globalThis.location.href;

const { protocol, hostname, port } = globalThis.location;
const repo = '/' + globalThis.location.pathname.split('/')[1];
const suffix = port ? ':' + port : '';

globalThis.location.replace(protocol + '//' + hostname + suffix + repo);
