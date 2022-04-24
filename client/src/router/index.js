import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '../layouts/UserLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import Home from '../views/user/Home.vue'
import Women from '../views/user/Women.vue'
import Men from '../views/user/Men.vue'
import Kids from '../views/user/Kids.vue'
import Party from '../views/user/Party.vue'
import Jewellery from '../views/user/Jewellery.vue'
import Watches from '../views/user/Watches.vue'
import Shoes from '../views/user/Shoes.vue'
import Handbags from '../views/user/Handbags.vue'
import About from '../views/user/About.vue'
import Contact from '../views/user/Contact.vue'
import Test from '../views/test.vue'

const routes = [
  {path: '/', redirect: '/home'},
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '/home', name: 'Home', component: Home },
      { path: '/women', name: 'Women', component: Women },
      { path: '/men', name: 'Men', component: Men },
      { path: '/kids', name: 'Kids', component: Kids },
      { path: '/party', name: 'Party', component: Party },
      { path: '/jewellery', name: 'Jewellery', component: Jewellery },
      { path: '/watches', name: 'Watches', component: Watches },
      { path: '/shoes', name: 'Shoes', component: Shoes },
      { path: '/handbags', name: 'Handbags', component: Handbags },
      { path: '/about', name: 'About', component: About },
      { path: '/contact', name: 'Contact', component: Contact },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout
  },
  { path: '/test', name: 'test', component: Test },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
