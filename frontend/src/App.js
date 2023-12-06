import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root/root";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./components/Elements/ProtectedRoute";
import AuthRoute from "./components/Elements/AuthRoute";
import Profile from "./components/Root/Profile/Profile";
import SearchBar from "./components/Root/Search/SearchBar";

function App() {
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
        {
          path:'/search',
          element:<SearchBar/>
        }
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
