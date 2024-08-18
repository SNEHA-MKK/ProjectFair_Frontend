import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import lockImg from '../assets/loginImg.png'
import { allProjectApi } from '../services/allAPI';





function Project() {
  const [allProject, setAllProject] = useState([])
  const [token, setToken] = useState("")
  //state to hold searching word
  const [searchkey, setSearchkey] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      getAllProject()
    }
  }, [searchkey])

  const getAllProject = async () => {
    const result = await allProjectApi(searchkey)
    setAllProject(result.data)
  }
  console.log(allProject);
  console.log(searchkey);

  return (
    <>
      <Header />

      <div className='mt-5'>
        <h2 className='text-center'>All Projects</h2>
      </div>

      {token ? <div>
        <div className="col-md-4 p-4 d-flex  justify-content-center">
          <input onChange={(e) => setSearchkey(e.target.value)} type="text" className='form-control' placeholder='Search by Technologies' />
          <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} className='text-secondary' style={{ marginTop: '12px', marginLeft: '-30px' }} />
        </div>

        {allProject?.length > 0 ?
          <div>
            <div className='mt-5 row d-flex  justify-content-center w-100'>
              <div className="col-md-4"></div>

              <div className="col-md-4"></div>

            </div>

            <Row className='mt-5'>
              {allProject.map((item) => (
                <Col sm={12} md={6} lg={4} className='p-4'>
                  <ProjectCard project={item} />
                </Col>
              ))}
            </Row>

          </div>
          :
          <div className='mt-5'>
            <h1 className='text-center text-danger fs-3'>No projects to display</h1>
          </div>}
      </div>
        :
        <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
          <img src={lockImg} alt="no image" style={{ width: '16%' }} />
          <h3 className='mt-4 text-danger'>Please <Link style={{ textDecoration: 'none' }} to={'/login'}>Login</Link> To See More Projects</h3>
        </div>}
    </>
  )
}

export default Project
