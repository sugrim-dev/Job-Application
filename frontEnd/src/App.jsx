import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from "./components/Home"
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDesciption from './components/JobDesciption';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import Postjob from './components/admin/Postjob';
import Applicants from './components/admin/Applicants';
import Protected from './components/admin/Protected';
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/Signup',
    element: <Signup />
  },
    {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDesciption/>

  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },

//Admin ke liye (Admin Pannel start)

{
  path:"/admin/companies",
  element:<Protected><Companies/></Protected> 
},
{
  path:"/admin/companies/create",
  element:<Protected><CompanyCreate/></Protected>
},
{
  path:"/admin/companies/:id",
  element:<Protected><CompanySetup/></Protected>
},
{
  path:"/admin/jobs",
  element:<Protected><AdminJobs/></Protected>
},
{
  path:"/admin/jobs/create",
  element:<Protected><Postjob/></Protected> 
},
{
  path:"/admin/jobs/:id/applicants",
  element:<Protected><Applicants/></Protected>
},

])
function App() {


  return (
    <>
  <RouterProvider router={appRouter}/>
    </>
  )
}

export default App                  
