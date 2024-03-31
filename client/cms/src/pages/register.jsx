import Swal from 'sweetalert2'
import { useState } from "react"
import instance from '../config/instance';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';

export default function Register(){
    const [input,setInput] = useState({email:'', password:''})
    const [getLoading,setLoading] = useState(false)
    const navigate = useNavigate()
    
    async function handlerRegister(e){
        e.preventDefault()
        try {
            setLoading(true)
            await instance({method:'post', url:'/add-user', data:input,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success Add User",
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
            console.log(error,'<-err regiater');
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
       <div className='d-flex justify-content-center' style={{marginTop:'100px',height:'45vh'}}>
        <form style={{width:'35vw', background:'#f2bd72', padding:'20px', borderRadius:'10px'}} onSubmit={handlerRegister}>
        <h1 className='text-center'>Register Staff</h1><br />

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

        <button type="submit" className="btn" style={{backgroundColor:'#f24c05'}}>Register</button>
        
        </form>
        </div>
       </> 
    )
}