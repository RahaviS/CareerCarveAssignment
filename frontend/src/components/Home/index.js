import {Link} from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="home-container">
        <div className="left-section">
          <h1 className="heading">CareerCarve</h1>
          <p className="desc">Placement | Preparedness | Perfected</p>
        </div>
        <div className="right-section">
          <p className="title">From resume to final interview prep</p>
          <p className="desc">We've got you covered</p>
          <Link to="/form" className="nav-link"><button type="button" className="book-btn">Book 1X1</button></Link>
          <p className="about-text">Get ready for your MBA campus placements, summers, or finals with the guidance of the most experienced and renowned Placement Training Agency with over 12+ years of expertise in training top B-Schools across the country.</p>
        </div>
      </div>
    </>
  )
}
export default Home
