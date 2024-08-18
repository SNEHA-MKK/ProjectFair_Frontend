import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import image1 from '../assets/addPro.jpeg'
import { serverUrl } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectApi } from '../services/allAPI';
import { editProjectResponseStatus } from '../context/Context';



function EditProject({ project }) {

    const {setEditResponse} = useContext(editProjectResponseStatus)
    console.log(project);

    const [update, setUpdate] = useState({
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })

    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        handleClose1()

    };
    const handleShow = () => setShow(true);



    const handleClose1 = () => {
        setUpdate({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, language, github, website, overview, projectImage } = update
        if (!title || !language || !github || !website || !overview) {
            toast.info('please fill the form completely')
        } else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)

            const token = sessionStorage.getItem("token")

            if (preview) {

                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateProjectApi(project._id, reqBody, reqHeader)
   

                if (result.status == 200) {
                    setShow(false)
                    setEditResponse(result.data)
                } else {
                    console.log(result);
                    toast.error('Something Went Wrong')
                }

            } else {

                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateProjectApi(project._id, reqBody, reqHeader)

                if (result.status == 200) {
                    setShow(false)
                    setEditResponse(result.data)
                } else {
                    console.log(result);
                    toast.error('Something Went Wrong')
                }
            }

        }
    }

    useEffect(() => {
        if (update.projectImage) {
            setPreview(URL.createObjectURL(update.projectImage))
        }
    }, [update.projectImage])

    return (
        <>
            <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='me-3  text-info mx-3' />


            <Modal show={show} onHide={handleClose} size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} sm={12} className='p-5'>
                            <label htmlFor="image">
                                <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setUpdate({ ...update, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : `${serverUrl}/uploads/${project.projectImage}`} alt="no image" className='w-100' />
                            </label>
                        </Col>
                        <Col md={6} sm={12}>
                            <form>
                                <div className='mb-3 mt-5'><input value={update.title} onChange={(e) => setUpdate({ ...update, title: e.target.value })} type="text" className='form-control  w-100' placeholder=' Title' /></div>
                                <div className='mb-3'><input value={update.language} onChange={(e) => setUpdate({ ...update, language: e.target.value })} type="text" className='form-control  w-100 ' placeholder=' Language' /></div>
                                <div className='mb-3'><input value={update.github} onChange={(e) => setUpdate({ ...update, github: e.target.value })} type="text" className='form-control  w-100 ' placeholder=' Github' /></div>
                                <div className='mb-3'><input onChange={(e) => setUpdate({ ...update, website: e.target.value })} value={update.website} type="text" className='form-control  w-100 ' placeholder=' Website' /></div>
                                <div className='mb-3'><textarea onChange={(e) => setUpdate({ ...update, overview: e.target.value })} value={update.overview} rows={'20px'} className='form-control  w-100' placeholder=' Overview' /></div>
                            </form>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer >
                    <Button variant="warning" onClick={handleClose1}>Cancel</Button>
                    <Button variant="success" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default EditProject
