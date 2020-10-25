import { createRouter, createWebHistory } from "vue-router";
import * as firebase from "firebase/app";
import "firebase/auth";

import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/all_asteroids",
    name: "AllAsteroids",
    component: () =>
      import(
        /* webpackChunkName: "allasteroids" */ "../views/AllAsteroids.vue"
      ),
  },
  {
    path: "/saved_asteroids",
    name: "SavedAsteroids",
    component: () =>
      import(
        /* webpackChunkName: "savedasteroids" */ "../views/SavedAsteroids.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = firebase.auth().currentUser;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth) {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (requiresGuest) {
    if (isAuthenticated) {
      next({ name: "AllAsteroids" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
