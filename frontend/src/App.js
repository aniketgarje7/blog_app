import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Root from "./pages/Root/root";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slices/AuthSlice";
import ProtectedRoute from "./components/Elements/ProtectedRoute";
import AuthRoute from "./components/Elements/AuthRoute";
import Profile from "./components/Root/Profile/Profile";

function App() {
  const user = useSelector(selectUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      children:[
        {
          path:'/profile/:username',
          element:(
              <Profile/>
          )
        },
      ]
    },
  
    {
      path: "/auth",
      element: (
        <AuthRoute>
          <Auth />
        </AuthRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
