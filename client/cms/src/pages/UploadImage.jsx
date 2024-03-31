import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import instance from '../config/instance';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/loading';

export default function UploadImage(){
    const [img,setImg] = useState('')
    const [lodgin,setLodgin] = useState({})
    const [getLoading,setLoading] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    async function dataUploadImg(){
        try {
            setLoading(true)
            let {data} = await instance({method:'get', url:`/lodgings/${id}`,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            setLodgin(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
            console.log(error,'<- err data yg diupload gambar');
        } finally {
            setLoading(false)
        }
    }

    async function uploadImg(e){
        e.preventDefault()
        try {
            setLoading(true)
            const file = new FormData()
            file.append('imageUrl',img)
            let {data} = await instance({method:'patch', url:`/lodgings/${id}`, data:file, 
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
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-err upload gambar');
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        dataUploadImg()
    },[])

    if(getLoading){
        return (
            <Loading/>
        )
    }
    
    return (
        <>
        <h1 style={{display:'flex', justifyContent:'center', marginTop:'60px', fontFamily:'initial'}}>Upload Image {lodgin.name}</h1>
        <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'30px'}}>
            <img src={lodgin.imgUrl} style={{width:'50vw', height:'500px'}}/>

            <div style={{marginTop:'20px', marginLeft:'50px'}}>
                <div className='card border-warning mb-3' style={{width:'25rem', marginRight:'180px', marginTop:'50px'}}>
                    <form onSubmit={uploadImg} style={{padding:'30px'}}>

                    <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input type="file" className="form-control" onChange={(e)=>setImg(e.target.files[0])}/>

                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-warning">Upload</button>
                    </div>


                    </form>
                </div>
            </div>
        </div>
        </>
    )
}