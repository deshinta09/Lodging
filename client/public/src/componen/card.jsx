import { useNavigate } from "react-router-dom"

export default function Card({data}){
    const navigate = useNavigate()

    function keDetail(e){
        e.preventDefault()
        navigate(`/${data.id}`)
    }
    return (
        <div className="card" style={{width: "15rem", margin:'10px', border:0, marginBottom:'40px'}}>
            <img src={data.imgUrl} className="card-img-top" style={{width:'auto', height:'150px', marginTop:'8px'}}/>
            <div className="card-body">
                <div style={{height:'90px'}}>
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">{data.facility}</p>
                </div>
                <a href="" className="btn btn-primary" onClick={keDetail}>Detail</a>
            </div>
        </div>
    )
}