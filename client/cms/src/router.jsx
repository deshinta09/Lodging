import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import Navbar from './components/navbar.jsx'
import AddEdit from './pages/AddEdit.jsx'
import UploadImage from './pages/UploadImage.jsx'
import Type from './pages/Type.jsx'
import Register from './pages/register.jsx'

const router = createBrowserRouter([
    {path:'/', element:<Navbar/>,
    loader:()=>{
        if(!localStorage.access_token){
            return redirect('/login')
        }
        return null
    },
        children:[
            {path:'', element:<Home/>},
            {path:'add', element:<AddEdit page='add'/>},
            {path:'edit/:id', element:<AddEdit page='edit'/>},
            {path:'upload/:id', element:<UploadImage/>},
            {path:'/types', element:<Type/>},
            {path:'/add-user', element:<Register/>}
        ]
    },
    {path:'/login', element:<Login/>, 
        loader:()=>{
            if(localStorage.access_token){
                return redirect('/')
            }
            return null
        }
    }
])

export default router