import React from 'react'
import '../CSS/Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="box-container">
                <div className="box">
                    <h3 className="text-white mb-3" >Contact</h3>
                    <p className="mb-2" style={{marginLeft:"0px"}}><i className="fa fa-map-marker-alt me-3"></i>Indian Institute of Information Technology Sricity</p>
                    <p className="mb-2" style={{marginLeft:"0px"}}><i className="fa fa-phone-alt me-3"></i>9998989989</p>
                    <p  style={{ textTransform: 'lowercase', marginLeft:"0px"}}><i className="fa fa-envelope me-3"></i>vihari@iiits.in</p>
                    <div className="share">
                        <Link to="https://www.facebook.com" ><i className="fab fa-facebook-f icon"></i></Link>
                        <Link to="https://www.twitter.com" ><i className="fab fa-twitter icon"></i></Link>
                        <Link to="https://www.instagram.com" ><i className="fab fa-instagram icon"></i></Link>
                        <Link to="https://in.linkedin.com" ><i className="fab fa-linkedin icon"></i></Link>
                    </div>
                </div>
                <div className="box">
                    <h3>Quick links</h3>
                    <Link to="/" className="links"><i className="fas fa-arrow-right"></i> home</Link>
                    <Link to="/tours" className="links"><i className="fas fa-arrow-right"></i> tours</Link>
                    <Link to="/about" className="links"><i className="fas fa-arrow-right"></i> about us</Link>
                    <Link to="/contact" className="links"><i className="fas fa-arrow-right"></i> contact us</Link>
                </div>
                <div className="box">
                    <h3>Newsletter</h3>
                    <p style={{marginLeft:"0px"}}>subscribe for latest updates</p>
                    <form action="">
                        <input type="email" name="" placeholder="enter your email" className="email" id="" />
                        {/* <input type="submit" value="subscribe" className="btn-subscribe" /> */}
                        <button type="submit" className="btn btn-info btn-subscribe">subscribe</button>
                    </form>
                </div>
            </div>
            <div className="credit">
                © 2023 <span>Vihari</span> all rights reserved !!
            </div>
        </div>
    )
}
export default Footer