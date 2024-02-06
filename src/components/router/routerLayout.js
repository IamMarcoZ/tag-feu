import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './router.css'


const RouterLayout = () => {
  return (
    <div>
      <Navbar className="row" bg="dark" data-bs-theme="dark">
        <div className="row" >
          <div className="col-2 max-width-fit route-btn-home route-div">
            <Link className="route-btn" style={{ borderBottom: 0 }} to="/tag-feu">Home</Link>
          </div>
          <div className="col-2 max-width-fit route-div">
            <Link className="route-btn" to="/tag-feu/issues">Issues</Link>
          </div>
        </div>
      </Navbar>
      <Outlet />
    </div>
  )
};

export default RouterLayout;