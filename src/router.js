import Vue from 'vue'
import Router from 'vue-router'
import Days from './views/Days'
import Sports from "./views/Sports";
import Sport from "./views/Sport";
import Clubs from "./views/Clubs";
import Club from "./views/Club";
import Day from "./views/Day";
import Match from "./views/Match";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Days
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sports',
      name: 'sports',
      component: Sports
    },
    {
      path: '/sport/:id',
      name: 'sport',
      component: Sport,
      props: true
    },
    {
      path: '/clubs',
      name: 'clubs',
      component: Clubs
    },
    {
      path: '/club/:id',
      name: 'club',
      component: Club,
      props: true
    },
    {
      path: '/day',
      name: 'day',
      component: Day
    },
    {
      path: '/match/:id',
      name: 'match',
      component: Match,
      props: true
    }
  ]
})
