import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from "../config/instance"
import { useEffect, useState } from "react"
import Navbar from "../componen/navbar"
import Loading from "../componen/loading"


export default function Detail (){
    const {id} = useParams()
    const [getLoading,setLoading] = useState(false)
    const [detail,setDetail] = useState({})

    async function dataDetail(){
        try {
            setLoading(true)
            let {data} = await axios({method:"get",url:`/pub/${id}`})
            setDetail(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<=er di detail');
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        dataDetail()
    },[])

    if(getLoading){
        return (
            <Loading/>
        )
    }

    return (
        <>
        <Navbar/>
        <div className="row" style={{marginTop:'50px'}}>
            <div style={{marginTop:'30px', marginLeft:'30px'}}>
                <h2><strong>{detail.name}</strong></h2>
                <p>{detail.location}</p>
            </div>

            <div style={{display:'flex', justifyContent:'space-around'}}>
                <img src={detail.imgUrl} style={{width:'50vw', height:'400px'}}/>
                
                <div style={{marginTop:'20px', marginLeft:'50px'}}>
                    
                    <div className="row" style={{marginTop:'50px', backgroundColor:'#dae9eb', padding:'10px'}}>
                        <h5>Facility        : {detail.facility}</h5>
                        <h5>Room Capacicity : {detail.roomCapacity}</h5>
                        <h3 style={{marginLeft:'20px', marginTop:'20px'}}>Price   : {detail.price}</h3>
                    </div>
                
                </div>
            </div>
        </div>
        </>
    )
}