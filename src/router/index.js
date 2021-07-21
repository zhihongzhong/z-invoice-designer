import Vue from 'vue'
import Router from 'vue-router'
import routeMap from './route.config';
import { RouterGuardFactory } from "./guard";
import { scrollBehaviorHandler } from "@router/scrollBehavior";
import './listener';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: scrollBehaviorHandler,
  routes: routeMap
});

const routerGuard = RouterGuardFactory(router);
router.beforeEach(routerGuard);

export default router;