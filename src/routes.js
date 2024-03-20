export default [
  {
    path: "/",
    component: () => import("./pages/Home"),
  },
  {
    path: "/about",
    component: () => import("./pages/About"),
  },
];
