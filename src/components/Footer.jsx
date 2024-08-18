import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'



function Footer() {
    return (
        <>
            <div className='mt-5 w-100 p-4' style={{ backgroundColor: 'rgb(115, 151, 180)' }} >
                <div className="row mx-md-5 mx-3">

                    <div className="col-md-4">

                        <h3 className='mb-3 text-light'><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h3>
                        <p className='mt-3' style={{ textAlign: 'justify', color: 'black' }} >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, porro. Mollitia nisi voluptatum iusto reiciendis architecto unde, voluptatibus ad quo aspernatur earum iste alias commodi accusamus ea suscipit, harum illo!</p>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <h3 className='text-light'>Links</h3>
                        <Link className='mt-3' style={{ textDecoration: 'none', color: 'black' }} to={'/'}><p>Home</p></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/project'}><p>Project</p></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/dashbord'}><p>Dashboard</p></Link>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-2 ">
                        <h3 className='text-light'>Guides</h3>
                        <Link className='mt-3' style={{ textDecoration: 'none', color: 'black' }} to={'/https://react.dev/'}><p>React</p></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/https://react-bootstrap.netlify.app/'}><p>React Bootstrap</p></Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/https://bootswatch.com/'}><p>React botswatch</p></Link>
                    </div>
                    <div className="col-md-3">
                        <h3 className='text-light'>Contact Us</h3>
                        <div className="d-flex mt-2">
                            <input type="text" placeholder='Enter MailId' className='form-control' />
                            <button className='btn btn-danger ms-2'>Subscribe</button>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />
                            <FontAwesomeIcon icon={faTwitter}  className='fa-2x text-light'/>
                            <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light' />
                        </div>

                    </div>

                </div>

                <p className='text-center text-light'>copyright © 2024 Project Fair.Built with react</p>
            </div>

        </>
    )
}

export default Footer
