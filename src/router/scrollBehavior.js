
import { cacheRuleMap } from './route.config';

function validateCacheRule(to, from) {
  const toName = to.name;
  const fromName = from.name;
  if(cacheRuleMap[toName]) {
    return cacheRuleMap[toName]
      .pairedRoutes
      .findIndex((item)=> item === fromName) !== -1;
  }
  return false;
}

export function scrollBehaviorHandler(to, from, savedPosition) {
  if(savedPosition && validateCacheRule(to, from)) {
    return savedPosition;
  } else {
    return { y: 0 };
  }
}