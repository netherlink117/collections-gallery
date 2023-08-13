import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from "vue-router";

import { useIndexStore } from "@/stores";
import { Item } from "@/classes/Item";
import { Directory } from "@/classes/Directory";
import { File } from "@/classes/File";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/explore",
    name: "Explorer",
    component: () => import("@/views/ExplorerView.vue")
    // props: (route) => ({ path: route.query.path || "/" })
  },
  {
    path: "/view",
    name: "Viewer",
    component: () => import("@/views/ViewerView.vue")
    // props: (route) => ({ path: route.query.path || "/" })
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutView.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const indexStore = useIndexStore();
  if (to.path === '/explore' && to.query.path !== undefined) {
    console.log('d')
    let item = indexStore.items.find((ite) => ite.path === to.query.path);
    if (!item) {
      item = new Item(to.query.path?.toString());
    }
    indexStore.explorer.directory = Directory.fromItem(item);
    indexStore.getChildrenFromDirectory();
    indexStore.viewer.file = undefined;
  }
  if (to.path === '/view' && to.query.path !== undefined) {
    console.log('f')
    let item = indexStore.items.find((ite) => ite.path === to.query.path);
    if (!item) {
      item = new Item(to.query.path?.toString());
    }
    indexStore.viewer.file = File.fromItem(item);
    indexStore.getDetailsFromFile();
  }
  return next();
});

export default router;
