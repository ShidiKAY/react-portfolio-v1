import React from "react";

export default [
  {
    path: "/",
    component: React.lazy(() => import("./components/Home")),
  },
  {
    path: "/about",
    component: React.lazy(() => import("./pages/AboutRedirect/AboutRedirect")),
  },
  {
    path: "/projects/:projectId",
    component: React.lazy(() => import("./pages/ProjectDetail/ProjectDetail")),
  },
  {
    path: "/labs",
    component: React.lazy(() => import("./pages/Labs/Labs")),
  },
  {
    path: "/labs/:labId",
    component: React.lazy(() => import("./pages/Labs/LabDetail")),
  },
  {
    path: "/privacy",
    component: React.lazy(() => import("./pages/Privacy/Privacy")),
  },
  {
    path: "/404",
    component: React.lazy(() => import("./pages/NotFound/NotFound")),
  },
  {
    path: "*",
    component: React.lazy(() => import("./pages/NotFound/NotFound")),
  },
];
