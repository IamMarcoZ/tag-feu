import { Outlet, Link } from "react-router-dom";
import './router.css'


const RouterLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/issues">Issues</Link>
          </li>          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default RouterLayout;