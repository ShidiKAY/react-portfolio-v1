import React from "react";

export default [
  {
    path: "/",
    component: React.lazy(() => import("./components/Home")),
  },
  {
    path: "/about",
    component: React.lazy(() => import("./components/About")),
  },
  {
    path: "/projects/:projectId",
    component: React.lazy(() => import("./pages/ProjectDetail/ProjectDetail")),
  },
];
