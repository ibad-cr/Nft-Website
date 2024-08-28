import React from 'react'
import { Link } from 'react-router-dom'

const currentDate = new Date().getFullYear();

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className="footer-container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2 border-top">
          <p class="col-md-4 mb-0 footer-date">© {currentDate} Company, Inc</p>

          <Link to="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <img src="../src/assets/img/pngwing.png" alt="" />
          </Link>

          <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><Link to='/' onClick={() => { window.location.replace('#top') }} class="nav-link px-2">Home</Link></li>
            <li class="nav-item"><Link to='/shop/c' onClick={() => { window.location.replace('#top') }} class="nav-link px-2">Shop</Link></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default Footer