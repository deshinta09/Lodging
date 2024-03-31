import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import axios from "../config/instance";
import Navbar from "../componen/navbar";
import Card from "../componen/card";
import Loading from "../componen/loading";

export default function Home(){
    const [getLodgings,setLodgings] = useState([])
    const [getLength,setLength] = useState(0)
    const [getLoading,setLoading] = useState(false)
    const [option,setOption] = useState({
        page:1,search:'',filter:'',sort:''
    })

    async function lodgings(){
        try {
            setLoading(true)
            let {data} = await axios({
                method:'get', 
                url:`/pub?sort=${option.sort}&search=${option.search}&filter=${option.filter}&page=${option.page}`
            })
            setLodgings(data.rows)
            setLength(data.count) // pagination
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              });
            console.log(error,'<-err di ambil data lodgings');
        } finally{
            setLoading(false)
        }
    }

    function pagination(){
        let page = []
        let jumlahPage = Math.ceil(getLength/10)
        for (let i = 1; i <= jumlahPage; i++) {
            page.push(
                <li className="page-item" key={i}><button className="page-link" value={i} onClick={(e)=>setOption({...option,page:e.target.value})}>
                    {i}
                </button></li>
            )
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {page}
                </ul>
            </nav>
        )
    }

    
    useEffect(()=>{
        lodgings()
    },[option])

    if(getLoading){
        return (
            <Loading/>
        )
    }

    return(
        <>
        <Navbar name='home' option={option} setOption={setOption}/>
        <img src="/bromo-unsplash.jpg" style={{width:'100vw'}} />
        <div className="row gap-1" style={{marginTop:'70px', justifyContent:'center'}}>
            {
                getLodgings.map(el=>(
                    <Card key={el.id} data={el}/>
                ))
            }
            
        {/* pagination */}
            <div  style={{display:'flex', justifyContent:'center'}}>
            {pagination()}
            </div>
        </div>
        </>
    )
}