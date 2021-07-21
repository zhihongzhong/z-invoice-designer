
/**
 * It's no need to redirect route to login page
 * since this action is already done in 'request' method
 * and request method is included in store.dispatch.
 *
 * @notation The white list is not implemented by now
 * @param router{ VueRouter }
 * */
export function RouterGuardFactory(router) {
  return function(to, from, next) {
    next();
  }
}