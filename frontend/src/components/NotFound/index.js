import {Link} from 'react-router-dom';
import './index.css'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>Page Not Found!</h1>
      <img src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png" alt="not-found-img" className='not-found-img'/>
      <Link to="/" className='nav-link'><button type="button" className='go-home-btn'>Go Home</button></Link>
    </div>
  )
}
export default NotFound