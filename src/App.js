import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Layout/Main";
import Login from "./component/Login/Login";
import SignUp from "./component/signUp/SignUp";

function App() {
  const route = createBrowserRouter([
    {
      path : '/',
      element: <Main/>, 
      children: [
        {
          path: '/login',
          element: <Login/>,
        },
        {
          path: '/signup',
          element: <SignUp/>,
        }
      ]
    }
  ]) ;  
  return (
    <div>
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
