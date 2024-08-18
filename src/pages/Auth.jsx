import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, json, useNavigate } from 'react-router-dom'
import logo from '../assets/loginImg1.png'
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { isAuthorizedContext } from '../context/Context'



function Auth({ register }) {

  const {setIsAuthorized} = useContext(isAuthorizedContext)

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  console.log(user);

  const navigate = useNavigate()


  //function to all register api 

  const getregister = async (e) => {

    e.preventDefault()
    const { username, email, password } = user

    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    } else {
      const result = await registerAPI(user)
      console.log(result);
      if (result.status == 200) {
        toast.success("registration successfull")
        setUser({
          username: "",
          email: "",
          password: ""
        })

        navigate('/login')
      } else {
        toast.error(result.response.data)
      }
    }

  }


  //function to login
  const userLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {
      toast.info('please fill the form completely')
    } else {
      const result = await loginAPI(user)
      console.log(result);
      if (result.status == 200) {
        toast.success('Login successfull')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUser({         
          email: "",
          password: ""
        })
        setTimeout(()=>{
          navigate('/')
        },3000)
        setIsAuthorized(true)
      } else {
        toast.error('something went wrong')
        console.log(result);
      }
    }
  }


  const registerForm = register ? true : false

  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>

      <div className='w-75 container'>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><h5><FontAwesomeIcon icon={faArrowLeft} />Back to home</h5></Link>
        <div style={{ backgroundColor: 'rgb(115, 151, 180)' }} className='rounded  mt-3'>
          <Row>
            <Col sm={12} md={6} className='p-5'>
              <img src={logo} alt="no image" className='w-100' />
            </Col>

            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
              <h2 className='text-light'><FontAwesomeIcon className='fa-2x' icon={faStackOverflow} />Project Fair</h2>

              {registerForm ?
                <h5 className='text-light'>Sign Up to Your Account</h5>
                :
                <h5 className='text-light'>Sign In to Your Account</h5>}


              <Form className='mt-5 w-75'>

                {registerForm &&
                  <Form.Group className="mb-3" controlId="formPlaintextEmail">
                    <Form.Control onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" placeholder="Username" value={user.username} className='form-control' />
                  </Form.Group>}

                <Form.Group className="mb-3" controlId="formPlaintextEmail">
                  <Form.Control onChange={(e) => setUser({ ...user, email: e.target.value })} type="Email" placeholder="Email id " value={user.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPlaintextEmail">
                  <Form.Control onChange={(e) => setUser({ ...user, password: e.target.value })} type='password' placeholder="Password" value={user.password} />
                </Form.Group>

                {registerForm ?
                  <div>
                    <Button onClick={getregister} variant='warning' type='submit' className='w-100'>Register</Button>
                    <p className='text-light mt-3'>Already a user? click here to  <Link style={{ textDecoration: 'none', color: 'black' }} to={'/login'} className='text-denger'>Login</Link></p>
                  </div>
                  :
                  <div>
                    <Button onClick={userLogin} variant='warning' type='submit' className='w-100'>login</Button>
                    <p className='text-light mt-3'>New user? click here to <Link style={{ textDecoration: 'none', color: 'black' }} to={'/register'} className='text-denger'>Register</Link></p>
                  </div>}

              </Form>

            </Col>
          </Row>
        </div>
      </div>


      <ToastContainer theme='colored' autoClose={2000} position='top-center' />
    </div>
  )
}

export default Auth
