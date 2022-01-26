import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryPage from "./pages/mySpecialCare/CategoryPage";
import ArticlePage from "./pages/mySpecialCare/ArticlePage";
import FAQPage from "./pages/mySpecialCare/FAQPage";
import VideoPage from "./pages/mySpecialCare/VideoPage/";
import NewsPage from "./pages/mySpecialCare/NewsPage";

import ClinicAddPage from "./pages/myDentist/ClinicAddPage";
//NewsPage

const routes = (isLogedin) => [
  {
    path: "admin",
    element: isLogedin ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },

      // my special care
      { path: "news", element: <NewsPage /> },
      { path: "article", element: <ArticlePage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "video", element: <VideoPage /> },

      // my clinic
      { path: "clinic", element: <ClinicAddPage /> },
      
      // { path: "*", element: <Navigate to="/admin" /> },
    ],
  },
  {
    path: "/",
    element: isLogedin && <Navigate to="/admin" />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: '/', element: <Navigate to="/admin" /> },
      { path: "404", element: <NotFoundPage /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },   
  { path: '*', element: <Navigate to="/404" replace /> }
];

export default routes;