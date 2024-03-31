import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import instance from "../config/instance"

export default function Navbar({name,option, setOption}){
    const navigate = useNavigate()
    const [getSearch,setSearch] = useState('') // unt ambil inputan search
    const [type,setType] = useState([])

    async function dataType(){
        try {
            let {data} = await instance({method:'get', url:'/type'})
            setType(data)
        } catch (error) {
            console.log(error,'<-err type di navbar');
        }
    }

    function keHome(e){
        e.preventDefault()
        navigate('/')
    }

    function handlerSubmite(e){ //untuk ngeset search setelah di submite
        e.preventDefault()
        setOption({...option,search:getSearch})
    }

    useEffect(()=>{
        dataType()
    },[])

    return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{position:'fixed', left:0, right:0, top:0, zIndex:'1'}}>
        <div className="container-fluid">

            <img src="/logo-lodging.png" style={{width:'3vw', marginRight:'10px'}} />

            <a className="navbar-brand">Lodgings</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            {
                
            }
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {
                    name==='home'? '':
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* home */}
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href='' onClick={keHome}>Home</a>
                        </li>
                    </ul>
                }
                
                {/* unt search */}
                {
                    name==='home' ? 
                <form className="d-flex" role="search" onSubmit={handlerSubmite} style={{width:'50vw'}}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form> : ''
                }
                 {/* select option */}
                 {
                    name==='home' ? 
                    <div className="row gap-3">

                    <select name="filter" className="form-select" 
                    onChange={(e)=>setOption({...option,filter:e.target.value})} 
                    style={{marginLeft:'200px',border:0,width:'12vw'}}
                    >
                        <option defaultValue value={option.filter}>Type Lodging ?</option>
                        {
                            type.map(el=>(
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))
                        }
                    </select>
                    {/* sort */}
                    <select className="form-select" name="sort" 
                    onChange={(e)=>setOption({...option,sort:e.target.value})}
                    style={{width:'8vw',border:0}} aria-label="Default select example" 
                    >
                        <option defaultValue value={option.sort}>Sort By ?</option>
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                  </select>
                  </div>
                    :<></>
                    }
            </div>
        </div>
    </nav>
    )
}