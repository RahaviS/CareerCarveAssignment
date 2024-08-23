import {Link} from 'react-router-dom';
import './index.css'

const Navbar = () => {
  return (
    <nav className='nav-container'>
        <Link to="/" className='nav-link'><img src="logocc.png" alt="careercarve-logo" className="nav-logo"/></Link>
        <ul className='nav-list'>
          <Link to="/" className="nav-link"><li className='nav-item'>Home</li></Link>
          <Link to="/mentors" className="nav-link"><li className='nav-item'>Mentors</li></Link>
          <Link to="/pricing" className="nav-link"><li className='nav-item'>Pricing</li></Link>
        </ul>
    </nav>
  )
}
export default Navbar
