import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './router.css'


const RouterLayout = () => {
  return (
    <div>
      <Navbar className="row" bg="dark" data-bs-theme="dark">
        <div className="col-4" >
          <Link className="col-2" style={{borderBottom:0}} to="/tag-feu">Home</Link>
          <Link className="col-2" to="/tag-feu/issues">Issues</Link>
        </div>

      </Navbar>
      <Outlet />
    </div>
  )
};

export default RouterLayout;