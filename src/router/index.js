import { createRouter, createWebHistory } from "vue-router";
import * as firebase from "firebase/app";
import "firebase/auth";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AllAsteroids from "../views/AllAsteroids.vue";
import SavedAsteroids from "../views/SavedAsteroids.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/all_asteroids",
    name: "AllAsteroids",
    component: AllAsteroids,
  },
  {
    path: "/saved_asteroids",
    name: "SavedAsteroids",
    component: SavedAsteroids,
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
