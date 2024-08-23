import { MdOutlineCurrencyRupee } from "react-icons/md";
import Navbar from '../Navbar';
import './index.css'

const Pricing = () => {
  return (
    <>
    <Navbar/>
    <div className="pricing-container">
      <h1 className="page-title">Pick the plan that's right for you</h1>
      <hr className="styling-line"/>
      <ul className="pricing-cards">
        <li className="card-details">
          <p>Duration: <span>30 Mins</span></p>
          <div className="price-section"><MdOutlineCurrencyRupee size={25}/> <p className="price-text">3000</p></div>
        </li>
        <li className="card-details">
          <p>Duration: <span>45 Mins</span></p>
          <div className="price-section"><MdOutlineCurrencyRupee size={25}/> <p className="price-text">3000</p></div>
        </li>
        <li className="card-details">
          <p>Duration: <span>60 Mins</span></p>
          <div className="price-section"><MdOutlineCurrencyRupee size={25}/> <p className="price-text">3000</p></div>
        </li>
        <li className="card-details">
          <p className="premium-service">Premium Service</p>
          <div className="price-section"><MdOutlineCurrencyRupee size={25}/> <p className="price-text">3000</p></div>
        </li>
      </ul>
      <p>*Premium Mentors are well-equipped to guide students and got Good feedback from our alumni!. </p>
    </div>
    </>
  )
}
export default Pricing