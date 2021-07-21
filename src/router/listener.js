
export let isBack = false;
window.addEventListener("popstate", (e)=> {
  isBack = true;
  window.removeEventListener('popstate', null, false);
}, false);

export function resetState() {
  isBack = false;
}