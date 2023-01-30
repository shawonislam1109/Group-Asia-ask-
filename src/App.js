import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Layout/Main";
import Login from "./component/Login/Login";
import SignUp from "./component/signUp/SignUp";
import Home from "./Page/Home/Home";

function App() {
  const route = createBrowserRouter([
    {
      path : '/',
      element: <Main/>, 
      children: [
        {
          path : '/',
          element: <Home/>
        }
        ,
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
