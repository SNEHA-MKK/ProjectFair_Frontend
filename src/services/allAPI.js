

//register

import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"


export const registerAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverUrl}/user/register`,reqbody,"")
}


export const loginAPI = async(reqbody)=>{
    return await commonAPI('POST',`${serverUrl}/user/login`,reqbody,"")
}

//addProject
export const addProjectApi  = async(reqbody,reqHeader)=>{
    return await commonAPI('POST',`${serverUrl}/projects`,reqbody,reqHeader)
}

//getHomeProject
export const gethomeProjectApi = async()=>{
    return await commonAPI('GET',`${serverUrl}/home-project`,"","")
}

//get all projects
export const allProjectApi = async(searchkey)=>{
    return await commonAPI('GET',`${serverUrl}/all-product?search=${searchkey}`,"","")
}

//get user project
export const getUserProjectApi = async(reqHeader)=>{
    return await commonAPI('GET',`${serverUrl}/user/all-project`,"",reqHeader)
}

//delete a user project

export const deleteAProjectApi = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${serverUrl}/delete-project/${id}`,{},reqHeader)
}

//update project
export const updateProjectApi = async(id,reqbody,reqHeader)=>{
    return await commonAPI('PUT',`${serverUrl}/update-project/${id}`,reqbody,reqHeader)
}

//update profile

export const updateProfile = async(reqbody,reqHeader)=>{
    return await commonAPI('PUT',`${serverUrl}/update-profile`,reqbody,reqHeader)
}