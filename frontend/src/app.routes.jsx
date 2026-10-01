import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./features/interview/pages/Home.jsx"
const appRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: (
      <Protected>
        <Home/>
      </Protected>
    ),
  },
];

export default appRoutes;
