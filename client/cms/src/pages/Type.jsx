import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import instance from "../config/instance";
import Loading from "../components/loading";

export default function Type(){
    const [getLoading,setLoading] = useState(false)
    const [getType,setType] = useState([])

    async function dataType(){
        try {
            setLoading(true)
            let {data} = await instance({method:'get', url:'/types', 
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            setType(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<- data entitas kedua');
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        dataType()
    },[])

    if(getLoading){
        return (
            <Loading/>
        )
    }
    
    return (
        <>
        <center>
        <h1 style={{margin:'30px', marginTop:'40px', fontFamily:'initial'}}>Data  Type</h1>
        </center>
        <table className="table " style={{width:'50vw', margin:'auto'}}>
            <thead>
                <tr>
                    <th style={{backgroundColor:'#f24c05'}}>Id</th>
                    <th style={{backgroundColor:'#f24c05'}}>Name</th>
                </tr>
            </thead>

            <tbody>
            {
                getType.map(el=>(
                    <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}