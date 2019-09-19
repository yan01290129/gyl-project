import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: () => import("../views/layout/index"),
    redirect: 'entrustorderlist',
    children: [
      {
        path: "entrustorderlist",
        component: () => import("../views/entrustorder/entrustorderlist")
      },
      {
        name: "entrustorderform",
        path: "/entrustorderform",
        component: () => import("../views/entrustorder/entrustorderform")
      }
    ]
  },
  {
    path: '/login',
    component: () => import("../views/login"),
  }
];

export default new VueRouter({
  routes
});
