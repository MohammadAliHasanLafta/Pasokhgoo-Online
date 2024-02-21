import { createRouter, createWebHistory } from "vue-router";
import searchresult from "../Searchresult.vue";
import searchhome from "../Searchhome.vue";
const routes = [
  { path: "/searchresult", component: searchresult, name: "searchresult" },
  { path: "/", component: searchhome, name: "searchhome" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
