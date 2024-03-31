import { createBrowserRouter } from 'react-router-dom'
import Home from './page/home'
import Detail from './page/detail'

const router = createBrowserRouter([
    {path:'/', element:<Home/>},
    {path:'/:id', element:<Detail/>}
])

export default router