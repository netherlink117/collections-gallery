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
    component: () => import("@/views/ExplorerView.vue")
    // props: (route) => ({ path: route.query.path || "/" })
  },
  {
    path: "/view",
    name: "Viewer",
    component: () => import("@/views/ViewerView.vue")
    // props: (route) => ({ path: route.query.path || "/" })
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('to: ' + to.query.path)
  console.log('from: ' + from.query.path)
  const indexStore = useIndexStore();
  if (to.path === '/' && (to.query.path === null || to.query.path === undefined || to.query.path === '')) {
    return next({ path: "/explore", name: "Explorer", query: { path: "/" } });
  }
  if (to.query.path === indexStore.explorer.directory?.path ||to.query.path === indexStore.viewer.file?.path){
    // finally go to the right path after all redirects
    return next();
  } else {
    // get the logic for redirects
    let itemType = /\.[a-z34]{0,4}$/.test(to.query.path as string)
      ? "file"
      : "directory";
    console.log(itemType);
    let item = indexStore.items.find((ite) => ite.path === to.query.path);
    if (!item) {
      item = new Item(to.query.path?.toString());
    }
    if (itemType === "file") {
      indexStore.viewer.file = File.fromItem(item);
      indexStore.getDetailsFromFile();
      console.log('entra y manda a: ?path=' + to.query.path)
      return next({
        path: "/view",
        name: "Viewer",
        query: { path: to.query.path }
      });
    }
    if (itemType === "directory") {
      indexStore.explorer.directory = Directory.fromItem(item);
      indexStore.getChildrenFromDirectory();
      indexStore.viewer.file = undefined;
      console.log('entra y manda a: ?path=' + to.query.path)
      return next({
        path: "/explore",
        name: "Explorer",
        query: { path: to.query.path }
      });
    }
  }
});

export default router;
