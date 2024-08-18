import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allAPI';
import { AddProjectResponseStatus } from '../context/Context';



function Add() {

    const {setAddResponse} = useContext(AddProjectResponseStatus)

    //state to hold video details
    const [videoDetails, setVideoDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    const [show, setShow] = useState(false);

    // function to hold the url of file uploaded
    const [preview, setPreview] = useState("")

    /* key attribute can invoke onchange event*/
    const [key, setKey] = useState(false)

    //state to hold the token
    const [token, setToken] = useState("")

    //function to close the modal
    const handleClose = () => setShow(false);

    //function to open the modal
    const handleShow = () => setShow(true);

    //to clear  all data entered in the modal(cancel button)
    const handleClose1 = () => {
        setVideoDetails(
            {
                title: "",
                language: "",
                github: "",
                website: "",
                overview: "",
                projectImage: ""
            }
        )
        setPreview("")
        /* key attribute can invoke onchange event */
        setKey(!key)
    }

    //function to add project details
    const handleAdd = async (e) => {
        //avoid data loss
        e.preventDefault()

        const { title, language, github, website, overview, projectImage } = videoDetails
        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.info('please fill the form completely')
        } else {
            //handle uploaded content
            //1) create an object from formData class
            const reqBody = new FormData()
            //2) append method - to add data to the body
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            if (token) {
                let reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await addProjectApi(reqBody, reqHeader)
                // console.log(result);
                if (result.status == 200) {
                    handleClose1()
                    handleClose()
                    setAddResponse(result.data)
                } else {
                    toast.error('something went wrong')
                    handleClose1()
                    handleClose()
                }
            }
        }



    }

    console.log(videoDetails);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        } else {
            setToken("")
        }

    }, [])
    console.log(token);

    useEffect(() => {
        //file converted url
        if (videoDetails.projectImage) {
            setPreview(URL.createObjectURL(videoDetails.projectImage))
        }
    }, [videoDetails.projectImage])

    console.log(preview);

    return (
        <>
            <Button onClick={handleShow} variant="primary">Add Project</Button>


            <Modal show={show} onHide={handleClose} size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} sm={12} className='p-5'>
                            <label htmlFor="image">
                                {/* key attribute can invoke onchange event*/}
                                <input id='image' key={key} type="file" style={{ display: 'none' }} onChange={(e) => setVideoDetails({ ...videoDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview :
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzv7wiH8iCx0hammS-Cb65wYtcEUGPfUZZbg&usqp=CAU'} alt="no image" className='w-100' />
                            </label>
                        </Col>
                        <Col md={6} sm={12}>
                            <form>
                                <div className='mb-3 mt-5'><input onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })} value={videoDetails.title} type="text" className='form-control  w-100' placeholder=' Title' /></div>
                                <div className='mb-3'><input value={videoDetails.language} onChange={(e) => setVideoDetails({ ...videoDetails, language: e.target.value })} type="text" className='form-control  w-100 ' placeholder=' Language' /></div>
                                <div className='mb-3'><input value={videoDetails.github} onChange={(e) => setVideoDetails({ ...videoDetails, github: e.target.value })} type="text" className='form-control  w-100 ' placeholder=' Github' /></div>
                                <div className='mb-3'><input value={videoDetails.website} onChange={(e) => setVideoDetails({ ...videoDetails, website: e.target.value })} type="text" className='form-control  w-100 ' placeholder=' Website' /></div>
                                <div className='mb-3'><textarea value={videoDetails.overview} onChange={(e) => setVideoDetails({ ...videoDetails, overview: e.target.value })} rows={'20px'} className='form-control  w-100' placeholder=' Overview' /></div>
                            </form>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer >
                    <Button onClick={handleClose1} variant="warning">Cancel</Button>
                    <Button onClick={handleAdd} variant="success">Add</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>

    )
}

export default Add
