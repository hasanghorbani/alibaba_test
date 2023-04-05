import {createWebHistory, createRouter} from "vue-router";
import type {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: "/", name: "home", component: () => import("./components/Home.vue"),
}, {
    path: "/detail/:id", name: "detail", component: () => import("./components/detail.vue"),
}];

const router = createRouter({
    history: createWebHistory(), routes,
});

export default router;