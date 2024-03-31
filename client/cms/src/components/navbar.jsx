import Swal from 'sweetalert2'
import { Outlet, useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()

    function anotherPage(e, path){
        e.preventDefault()
        navigate(path)
    }

    function logoutHandler(e){
        e.preventDefault()
        localStorage.removeItem('access_token')
        navigate('/login')
        Swal.fire({
            position: "center",
            icon: "success",
            title: "You Are LogOut",
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <img src="/logo-lodging.png" style={{width:'3vw', marginRight:'10px'}} />
        
        <a className="navbar-brand" style={{marginLeft:'10px'}}>Lodging</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="" onClick={(e)=>anotherPage(e,'/')}>Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="" onClick={(e)=>anotherPage(e,'/types')}>Type</a>
            </li>
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="" onClick={(e)=>anotherPage(e,'/add')}> Add Lodging </a>
            </li>
        </ul>
        </div>
        <div style={{marginRight:'10px'}}>
        <button type="button" class="btn btn-outline-primary" onClick={()=>navigate('/add-user')}>Add Staff</button>
        </div>
        <button type="button" className="btn btn-danger"
        onClick={logoutHandler}>LogOut</button>
    </div>
    </nav>

    <Outlet/>
    </>
    )
}