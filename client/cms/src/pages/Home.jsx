import Swal from 'sweetalert2'
import { useState } from "react"
import instance from '../config/instance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';


export default function Home(){
    const [getLodgings,setLodgings] = useState([])
    const [getLoading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function allLodgings(){
        try {
            setLoading(true)
            let {data} = await instance({method:'get', url:'/lodgings',
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            setLodgings(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-err semua lodging');
        } finally {
            setLoading(false)
        }
    }

    async function handlerDelete(id){
        try {
            setLoading(true)
            let {data} = await instance({method:'delete', url:`/lodgings/${id}`, 
               headers:{
                Authorization:`Bearer ${localStorage.access_token}`
               } 
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
              });
            allLodgings()
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-err delete');
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        allLodgings()
    },[])

    if(getLoading){
        return (
            <Loading/>
        )
    }

    return(
        <>
        <center>
        <h2 style={{margin:'30px', marginTop:'40px', fontFamily:'initial'}}>Data  Lodgings</h2>
        </center>
        <table className="table " style={{width:'98vw', margin:'auto'}}>
            <thead>
                <tr>
                    <th style={{backgroundColor:'#f24c05'}}>Name</th>
                    <th style={{backgroundColor:'#f24c05'}}>Facility</th>
                    <th style={{backgroundColor:'#f24c05'}}>Room Capacity</th>
                    <th style={{backgroundColor:'#f24c05'}}>Image Url</th>
                    <th style={{backgroundColor:'#f24c05'}}>Location</th>
                    <th style={{backgroundColor:'#f24c05'}}>Price</th>
                    <th style={{backgroundColor:'#f24c05'}}>TypeId</th>
                    <th style={{backgroundColor:'#f24c05'}}>Author</th>
                    <th style={{backgroundColor:'#f24c05'}}>Action</th>
                </tr>
            </thead>

            <tbody>
            {
                getLodgings.map(el=>(
                    <tr key={el.id}>
                        <td>{el.name}</td>
                        <td>{el.facility}</td>
                        <td>{el.roomCapacity}</td>
                        <td><a href={el.imgUrl}>{el.name}</a></td>
                        <td>{el.location}</td>
                        <td>{el.price}</td>
                        <td>{el.typeId}</td>
                        <td>{el.User?.username}</td>
                        <td>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                        <button type="button" className="btn btn-primary" onClick={()=>navigate(`/upload/${el.id}`)}>Upload Image</button>
                        <button type="button" className="btn btn-warning" 
                        onClick={()=>navigate(`/edit/${el.id}`)}>Edit</button>
                        <button type="button" className="btn btn-outline-danger" onClick={()=>handlerDelete(el.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}