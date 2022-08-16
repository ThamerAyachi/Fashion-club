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
import SingleProduct from "../views/admin/SingleProduct.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/",
    component: UserLayout,
    children: [
      { path: "/home", name: "Home", component: Home },
      {
        path: "/women",
        name: "Women",
        component: Women,
        meta: { title: "Women's Clothing" },
      },
      {
        path: "/men",
        name: "Men",
        component: Men,
        meta: { title: "Men's Clothing" },
      },
      {
        path: "/kids",
        name: "Kids",
        component: Kids,
        meta: { title: "Kid's Wear" },
      },
      {
        path: "/party",
        name: "Party",
        component: Party,
        meta: { title: "Party Wear" },
      },
      {
        path: "/jewellery",
        name: "Jewellery",
        component: Jewellery,
        meta: { title: "Jewellery" },
      },
      {
        path: "/watches",
        name: "Watches",
        component: Watches,
        meta: { title: "Watches" },
      },
      {
        path: "/shoes",
        name: "Shoes",
        component: Shoes,
        meta: { title: "Shoes" },
      },
      {
        path: "/handbags",
        name: "Handbags",
        component: Handbags,
        meta: { title: "Handbags" },
      },
      {
        path: "/about",
        name: "About",
        component: About,
        meta: { title: "About" },
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
        meta: { title: "Contact" },
      },
      {
        path: "/single/:id",
        name: "Single",
        component: Single,
        meta: { title: "Product" },
      },
      { path: "/cart", name: "Cart", component: Cart },
    ],
  },
  { path: "/admin", redirect: "dashboard" },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requireAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard" },
      },
      {
        path: "/orders",
        name: "Orders",
        component: Orders,
        meta: { title: "Orders" },
      },
      {
        path: "/products",
        name: "Products",
        component: Products,
        meta: { title: "Products" },
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { title: "Profile" },
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
        meta: { title: "Users" },
      },
      {
        path: "/messages",
        name: "Messages",
        component: Messages,
        meta: { title: "Messages" },
      },
      {
        path: "/product/:id",
        name: "SingleProduct",
        component: SingleProduct,
        meta: { title: "Product" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isGuest: true, title: "Sign In" },
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
    meta: { title: "404" },
  },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " | Fashion Club";
  } else {
    document.title = "Fashion Club";
  }

  if (to.meta.requireAuth && !store.state.access_token) {
    next({ name: "Login" });
  } else if (store.state.access_token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
