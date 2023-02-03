import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Layout/Main";
import Login from "./component/Login/Login";
import SignUp from "./component/signUp/SignUp";
import Home from "./Page/Home/Home";
import MyApply from "./Page/MyApply/MyApply";
import Apply from "./Page/Apply/Apply";
import AllApply from "./Page/AllApply/AllApply";
import CrateEmployList from "./Page/CrateApplyLisst/CrateEmployList";
import
  {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import UpdateApplication from "./Page/MyApply/UpdateApplication";
import PageError from "./component/ErrorPage/ErrorPage";
import Approve from "./Page/AllApply/Approve";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App()
{
  const queryClient = new QueryClient()
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <PageError/>,
      children: [
        {
          path: '/',
          element: <PrivateRoute><Home /></PrivateRoute>
        }
        ,
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/myapply',
          element: <PrivateRoute><MyApply /></PrivateRoute>
        },
        {
          path: '/emmployessApply',
          element: <PrivateRoute><Apply /></PrivateRoute>
        },
        {
          path: '/allapply',
          element: <PrivateRoute><AllApply /></PrivateRoute>
        },
        {
          path: '/createEmployees',
          element: <PrivateRoute><CrateEmployList /></PrivateRoute>
        },
        {
          path: '/updateApplication/:id',
          element: <PrivateRoute><UpdateApplication/></PrivateRoute>,
          loader:  ({params}) => fetch(`http://localhost:5000/application/${params.id}`) 
        },
        {
          path: '/approve/:id',
          element: <PrivateRoute><Approve/></PrivateRoute>,
          loader:  ({params}) => fetch(`http://localhost:5000/application/${params.id}`)
        }
      ]
    }
  ]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={ route }></RouterProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
