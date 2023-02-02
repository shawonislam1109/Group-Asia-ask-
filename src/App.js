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

function App()
{
  const queryClient = new QueryClient()
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/',
          element: <Home />
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
          element: <MyApply />
        },
        {
          path: '/emmployessApply',
          element: <Apply />
        },
        {
          path: '/allapply',
          element: <AllApply />
        },
        {
          path: '/createEmployees',
          element: <CrateEmployList />
        },
        {
          path: '/updateApplication/:id',
          element: <UpdateApplication/>,
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
