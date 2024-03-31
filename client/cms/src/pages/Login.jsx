import Swal from 'sweetalert2'
import { useState } from "react"
import instance from '../config/instance'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/loading'

export default function Login(){
    const navigate = useNavigate()
    const [getLoading,setLoading] = useState(false)
    const [input,setInput] = useState({email:'', password:''})

    async function handlerLogin(e){
        e.preventDefault()
        try {
            setLoading(true)
            let {data} = await instance({method:'post', url:'/login', data:input})
            localStorage.setItem('access_token', data.access_token)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success Login",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-err login');
        } finally {
            setLoading(false)
        }
    }

    if(getLoading){
        return (
            <Loading/>
        )
    }

    return(
        <>
        <div className='d-flex justify-content-center align-items-center h-screen' style={{height:'100vh'}}>
        <form style={{width:'35vw', background:'#f2bd72', padding:'20px', borderRadius:'10px'}} onSubmit={handlerLogin}>
        <h1 className='text-center'>Login</h1><br />

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" 
            onChange={(e)=>setInput({...input,email:e.target.value})}/>
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            onChange={(e)=>setInput({...input,password:e.target.value})}/>
        </div>

        <button type="submit" className="btn" style={{backgroundColor:'#f24c05'}}>Submit</button>
        
        </form>
        </div>
        </>
    )
}