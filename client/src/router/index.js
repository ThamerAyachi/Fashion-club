import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import UserLayout from "../layouts/UserLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import Home from "../views/user/Home.vue";
import Women from "../views/user/Women.vue";
import Men from "../views/user/Men.vue";
import Kids from "../views/user/Kids.vue";
import Party from "../views/user/Party.vue";
import Jewellery from "../views/user/Jewellery.vue";
import Watches from "../views/user/Watches.vue";
import Shoes from "../views/user/Shoes.vue";
import Handbags from "../views/user/Handbags.vue";
import About from "../views/user/About.vue";
import Contact from "../views/user/Contact.vue";
import Single from "../views/user/Single.vue";
import Cart from "../views/user/Cart.vue";

import Test from "../views/test.vue";
import PageNotFound from "../views/PageNotFound.vue";

import Login from "../views/admin/Login.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Orders from "../views/admin/Orders.vue";
import Products from "../views/admin/Products.vue";
import Profile from "../views/admin/Profile.vue";
import Users from "../views/admin/Users.vue";
import Messages from "../views/admin/Messages.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/",
    component: UserLayout,
    children: [
      { path: "/home", name: "Home", component: Home },
      { path: "/women", name: "Women", component: Women },
      { path: "/men", name: "Men", component: Men },
      { path: "/kids", name: "Kids", component: Kids },
      { path: "/party", name: "Party", component: Party },
      { path: "/jewellery", name: "Jewellery", component: Jewellery },
      { path: "/watches", name: "Watches", component: Watches },
      { path: "/shoes", name: "Shoes", component: Shoes },
      { path: "/handbags", name: "Handbags", component: Handbags },
      { path: "/about", name: "About", component: About },
      { path: "/contact", name: "Contact", component: Contact },
      { path: "/single/:id", name: "Single", component: Single },
      { path: "/cart", name: "Cart", component: Cart },
    ],
  },
  { path: "/admin", redirect: "dashboard" },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requireAuth: true },
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/orders", name: "Orders", component: Orders },
      { path: "/products", name: "Products", component: Products },
      { path: "/profile", name: "Profile", component: Profile },
      { path: "/users", name: "Users", component: Users },
      { path: "/messages", name: "Messages", component: Messages },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isGuest: true },
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: PageNotFound,
  },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.access_token) {
    next({ name: "Login" });
  } else if (store.state.access_token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
