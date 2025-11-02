import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import PhotoList from "./routes/PhotoList";
import PhotoDetail from "./routes/PhotoDetail";
import ErrorPage from "./routes/ErrorPage";

const basename = new URL(process.env.PUBLIC_URL).pathname;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PhotoList />,
        },
        {
          path: "photos/:id",
          element: <PhotoDetail />,
        },
      ],
    },
  ],
  {
    basename: basename,
  }
);

export default router;
