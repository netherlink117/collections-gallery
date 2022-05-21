import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from "vue-router";

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
    props: (route) => ({ directory: route.query.directory || "/" })
  },
  {
    path: "/view",
    name: "Viewer",
    component: () => import("@/views/ViewerView.vue"),
    props: (route) => ({ file: route.query.file || "/" })
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") next({ name: "Explorer", query: { directory: "/" } });
  // if (to.path === "/view") next({ name: "Explorer", query: { directory: "/" } })
  else next();
});

export default router;
