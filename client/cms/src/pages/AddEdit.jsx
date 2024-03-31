import Swal from 'sweetalert2'
import { useState,useEffect } from "react"
import instance from '../config/instance';
import { useParams,useNavigate } from 'react-router-dom'
import Loading from '../components/loading';

export default function AddEdit({page}){
    const {id} = useParams()
    const navigate = useNavigate()
    const [getType,setType] = useState([])
    const [getLoading,setLoading] = useState(false)
    const [dataLodging,setDataLodgin] = useState({
        name:'', facility:'', roomCapacity:'', imgUrl:'', price:0, typeId:0, location:''
    })

    async function lodgingById(){
        try {
            setLoading(true)
            let {data} = await instance({method:'get', url:`/lodgings/${id}`,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            setDataLodgin(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-er data detail di edit');
        } finally {
            setLoading(false)
        }
    }

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
            console.log(error,'<-err data type di add edit');
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        dataType()
        if(page==='edit'){
            lodgingById()
        } 
    },[])

    async function handlerData(e){
        e.preventDefault()
        try {
            setLoading(true)
            if(page==='add'){
                await instance({method:'post', url:'/lodgings', data:dataLodging, 
                    headers:{
                        Authorization:`Bearer ${localStorage.access_token}`
                    }
                })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Success Add Lodging",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/')
            } else {
                await instance({method:'put', url:`/lodgings/${id}`, data:dataLodging,
                    headers:{
                        Authorization:`Bearer ${localStorage.access_token}`
                    }
                })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Success Edit Lodging",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/')
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<- err jalanin add/edit');
        } finally {
            setLoading(false)
        }
    }

    if(getLoading){
        return (
            <Loading/>
        )
    }

    return (
        <>
        <center>
        {
            page==='add' ? 
            <h1 style={{margin:'40px'}}>Add Lodgings</h1>:
            <h1 style={{margin:'40px'}}>Edit Lodging {dataLodging.name}</h1>
        }
        </center>
        
        <form style={{width:'40vw', margin:'auto'}} onSubmit={handlerData}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control"
            value={dataLodging.name}
            onChange={(e)=>setDataLodgin({...dataLodging,name:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Facility</label>
            <input type="text" className="form-control"
            value={dataLodging.facility}
            onChange={(e)=>setDataLodgin({...dataLodging,facility:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Room Capacity</label>
            <input type="number" className="form-control"
            value={dataLodging.roomCapacity}
            onChange={(e)=>setDataLodgin({...dataLodging,roomCapacity:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Image Url</label>
            <input type="text" className="form-control"
            value={dataLodging.imgUrl}
            onChange={(e)=>setDataLodgin({...dataLodging,imgUrl:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control"
            value={dataLodging.location}
            onChange={(e)=>setDataLodgin({...dataLodging,location:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control"
            value={dataLodging.price}
            onChange={(e)=>setDataLodgin({...dataLodging,price:e.target.value})}
            />
        </div>
        <div className="mb-3">
            <select value={dataLodging.typeId} className="form-select" aria-label="Default select example"
            onChange={(e)=>setDataLodgin({...dataLodging,typeId:e.target.value} )}
            >
                {/* {
                    page ==='add' && <option selected disabled value="">Type ?</option>
                } */}
                {
                    getType.map(el=>(
                        dataLodging.typeId===el.id ?
                        <option key={el.id} selected value={el.id}>{el.name}</option>:
                        <option key={el.id} value={el.id}>{el.name}</option>
                    ))
                }
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}