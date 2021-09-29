import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
// import RepairPage from "./pages/RepairPage/RepairPage";
import CategoryPage from "./pages/mySpecialCare/CategoryPage";
import ArticlePage from "./pages/mySpecialCare/ArticlePage";

const routes = (isLogedin) => [
    {
      path: "admin",
      element: isLogedin ? <DashboardLayout /> : <Navigate to="/login" />,
      element: <DashboardLayout /> ,
      children: [      
        { path: "dashboard", element: <DashboardPage /> }, 
        // { path: "/", element: <Navigate to="/admin/dashboard" /> },  
        { path: "article", element: <ArticlePage /> },   
        { path: "category", element: <CategoryPage /> },   
        { path: "*", element: <Navigate to="/admin" /> },
      ],
    },
    {
      path: "/",
      element: isLogedin && <Navigate to="/admin/dashboard" />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: '/', element: <Navigate to="/login" /> },
        // { path: "404", element: <NotFoundPage /> },
        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // {
    //     path: "/*",
    //     // element: isLogedin && <Navigate to="/admin/dashboard" />,
    //     children: [
    //     //   { path: "login", element: <LoginPage /> },
    //       { path: "404", element: <NotFoundPage /> },
    //     //   { path: '/', element: <Navigate to="/login" /> },
    //     //   { path: "*", element: <Navigate to="/404" /> },
    //     ],
    //   },
  ];
  
  export default routes;