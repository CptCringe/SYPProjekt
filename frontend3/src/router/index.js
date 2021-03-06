import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Friends from "../components/Friends.vue";
import Vocablists from "../components/Vocablist.vue";
import ListView from "../components/ListView";
import EditUser from "../components/EditUser";
import ListEditor from "../components/ListEditor";
import GlobalChat from "../components/GlobalChat";
import StandardBattle from "../components/StandardBattle";

// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const BoardModerator = () => import("../components/BoardModerator.vue")
const BoardUser = () => import("../components/BoardUser.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/friends",
    component: Friends,
  },
  {
    path: "/vocablists",
    component: Vocablists,
  },
  {
    path: "/list/:id",
    name: "list",
    component: ListView
  },
  {
    path: "/editProfile",
    name: "edit",
    component: EditUser
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/listEditor",
    name: "listEditor",
    component: ListEditor,
  },
  {
    path: "/chat",
    name: "chat",
    component: GlobalChat
  },
  {
    path: "/battle",
    name: "battle",
    component: StandardBattle
  }
];

const index = createRouter({
  history: createWebHistory(),
  routes,
});

export default index;

index.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});