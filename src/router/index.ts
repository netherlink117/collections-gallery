import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from "vue-router";

import { useIndexStore } from "@/stores";
const indexStore = useIndexStore();

const routes: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutView.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView.vue")
  },
  {
    path: "/explore",
    name: "Explorer",
    component: () => import("@/views/ExplorerView.vue"),
    props: (route) => ({ path: route.query.path || "/" })
  },
  {
    path: "/view",
    name: "Viewer",
    component: () => import("@/views/ViewerView.vue"),
    props: (route) => ({ path: route.query.path || "/" })
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") next({ name: "Explorer", query: { path: "/" } });
  if (to.query.path !== from.query.path) {
    const item = indexStore.items.find((ite) => ite.path === to.path);
    if (item !== undefined) {
      indexStore.current = item;
    }
  }
  //
  // if (to.path === "/view") next({ name: "Explorer", query: { directory: "/" } })
  else next();
});

// router.afterEach((to, from, failure) => {
// });

export default router;
