import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  console.info("Router-location:", location);
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: require("@/views/Home").default,
    },
    {
      path: "/file",
      name: "file",
      component: () =>
        import(/* webpackChunkName:'tools'*/ "@/views/tools/FileDeal.vue"),
    },
    {
      path: "/appstore",
      name: "appstore",
      component: () =>
        import(/* webpackChunkName:'appstore'*/ "@/views/tools/AppStore.vue"),
    },
    {
      path: "/notfound",
      name: "notfound",
      component: () =>
        import(/* webpackChunkName:'appstore'*/ "@/views/NotFound.vue"),
    },
    {
      path: "*",
      redirect: "/NotFound",
    },
  ],
});
