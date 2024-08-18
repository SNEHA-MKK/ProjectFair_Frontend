import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import userIcon from '../assets/userIcon.jpeg'
import { useState } from 'react';
//collapse of react bootstrap
import Collapse from 'react-bootstrap/Collapse';
import { serverUrl } from '../services/baseUrl';
import { updateProfile } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
       
       
        username: "",
        email: "",
        password: "",
        github: "",
        linkedin: "",
        profile: ""
    })

    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")
    const [updateStatus, setUpdateStatus] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ ...userDetails, username: user.username, email: user.mailId, password: user.password, github: user.github, linkedin: user.linkedIn })
            setExistingImage(user.profile)
        }

    }, [updateStatus])

    useEffect(() => {
        if (userDetails.profile) {
            setPreview(URL.createObjectURL(userDetails.profile))
        } else {
            setPreview("")
        }
    }, [userDetails.profile])

    console.log(userDetails);

    const handleUpdate = async (e) => {
        e.preventDefault()
        const {username, email, password, github, profile, linkedin } = userDetails

        if (!github || !linkedin) {
            alert('please fill the form completely')
        } else {
            const reqBody = new FormData()

           
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)

            const token = sessionStorage.getItem("token")

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await updateProfile(reqBody, reqHeader)

                if (result.status == 200) {
                    alert('Profile updated successfully')
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setUpdateStatus(!updateStatus)
                } else {
                    console.log(result);
                    toast.error('Something went wrong')
                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProfile(reqBody, reqHeader)

                if (result.status == 200) {
                    alert('Profile updated successfully')
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setUpdateStatus(!updateStatus)
                } else {
                    console.log(result);
                    toast.error('Something went wrong')
                }
            }
        }

    }

    return (
        <>
            <div className='my-5 mx-4 shadow p-4 rounded' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <div className='d-flex justify-content-between'>
                    <h3 className='mt-3'>Profile</h3>
                    <div className='mt-3'>
                        <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><FontAwesomeIcon icon={faAngleDown} /></button>
                    </div>
                </div>

                <Collapse in={open}>

                    <div>
                        <div className=' d-flex justify-content-center align-items-center flex-column'>

                            <label htmlFor='image'>

                                <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })} />

                                {existingImage == "" ?
                                    <img src={preview ? preview : userIcon} alt="no image" width={'200px'} height={'200px'} style={{ borderRadius: '50%' }} />
                                    :
                                    <img src={preview ? preview : `${serverUrl}/uploads/${existingImage}`} alt="no image" width={'200px'} height={'200px'} style={{ borderRadius: '50%' }} />
                                }

                            </label>

                            <div className='mb-3 w-100 mt-4'>
                                <input type="text" value={userDetails.github} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} placeholder='Github' className='form-control w-100' />
                            </div>

                            <div className='mb-3 w-100'>
                                <input type="text" value={userDetails.linkedin} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} placeholder='linkedin' className='form-control w-100' />
                            </div>

                            <div className='mb-3 w-100'>
                                <button onClick={handleUpdate} className='btn w-100' style={{ backgroundColor: 'green', color: 'white' }}>Update</button>
                            </div>

                        </div>
                    </div>

                </Collapse>

            </div>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />
        </>
    )
}

export default Profile


