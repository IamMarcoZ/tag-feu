import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './router.css'


const RouterLayout = () => {
  return (

    <div className='row'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <div className="row">
                <Link to="/">Home</Link>
                <Link to="/issues">Issues</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />

    </div>

  )
};

export default RouterLayout;