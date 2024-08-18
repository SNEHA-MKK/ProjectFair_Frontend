import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { deleteAProjectApi, getUserProjectApi } from '../services/allAPI'
import { AddProjectResponseStatus, editProjectResponseStatus } from '../context/Context'




function MyProject1() {

    const { AddResponse } = useContext(AddProjectResponseStatus)
    const { editResponse } = useContext(editProjectResponseStatus)
    const [userProjects, setUserProjects] = useState([])

    const getAllUserProject = async () => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await getUserProjectApi(reqHeader)
            console.log(result.data);
            setUserProjects(result.data)
        }

    }

    const deleteProject = async (id) => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await deleteAProjectApi(id, reqHeader)
            console.log(result);

            if (result.status == 200) {
                getAllUserProject()
            } else {
                alert('Something went wrong')
            }

        }

    }

    useEffect(() => {
        getAllUserProject()
    }, [AddResponse, editResponse])

    return (
        <div className='m-5 shadow p-4 rounded'>
            <div className="d-flex">
                <h3 className='text-success mt-4'>My Project</h3>
                <div className='ms-auto mt-4'>
                    <Add />
                </div>
            </div>


            {userProjects?.length > 0 ?
                userProjects?.map((item) => (
                    <div className=' mt-4 d-flex shadow p-3 rounded bg-light'>
                        <h5>{item.title}</h5>
                        <div className='ms-auto d-flex'>
                            <EditProject project={item} />
                            <Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='me-3 text-success mx-3' /></Link>
                            <FontAwesomeIcon icon={faTrash} className='text-danger mx-3' onClick={() => deleteProject(item._id)} />
                        </div>
                    </div>
                ))

                :
                <p className='text-danger mt-3'>No Projects Yet Added</p>
            }


        </div>
    )
}

export default MyProject1
