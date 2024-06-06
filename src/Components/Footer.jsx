import React from "react";
import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="container">
            <div className="footer">
                <div className="sb_footer section_padding">
                    <div className="sb_footer-links">
                        <div className="sb_footer-links-div">
                            <h4>Library</h4>
                            <Link to='/Geners'><a className="dropdown-item blackText" href="#">Genres</a></Link>
                           <Link to='/AllLang'><a className="dropdown-item blackText" href="#">Languages</a></Link>
                            
                            <Link to='/Authors'><a className="dropdown-item blackText" href="#">Authors</a></Link>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Community</h4>
                            <a href="#Articles">
                                <p>Articles</p>
                            </a>
                            <a href="#Author Interviews">
                                <p>Author Interviews</p>
                            </a>
                            <a href="#Newslrtter">
                                <p>Newsletter</p>
                            </a>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Company</h4>
                            <a href="Author Services">
                                <p>Author Services</p>
                            </a>
                            <a href="#About/Contact">
                                <p>About/Contact</p>
                            </a>
                            <a href="#Accessibility Atatement">
                                <p>Accessibility Statement</p>
                            </a>
                        </div>
                        <div className="sb_footer-links-div">
                            <h4>Follow</h4>
                            <div className="socialmedia">
                                <a href="https://www.facebook.com/"><i className='fa-brands fa-facebook'></i></a>
                                <a href="https://www.instagram.com/?hl=en"><i className='fa-brands fa-instagram'></i></a>
                                <a href="https://x.com/?mx=2"><i className='fa-brands fa-twitter'></i></a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="sb_footer-below">
                        <div className="sb_footer-copyright">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <a className="footer-brand" href="/">
                                    {/* Your logo image here if needed */}
                                </a>
                                <p>© 2023 Advertical Media LLC. All Rights Reserved.</p>
                            </div>
                        </div>
                        <div className="sb_footer-below-links">
                            <a href="#terms"><div><p>Terms & Conditions </p></div></a>
                            <a href="#privacy"><div><p>Privacy</p></div></a>
                            <a href="#Security"><div><p>Security</p></div></a>
                            <a href="#Cookie"><div><p>Cookie Declaration</p></div></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;