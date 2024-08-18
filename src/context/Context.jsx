import React, { createContext, useState } from 'react'

export const AddProjectResponseStatus = createContext()
export const editProjectResponseStatus = createContext()
export const isAuthorizedContext = createContext()

function Context({ children }) {
  const [AddResponse, setAddResponse] = useState({})
  const [editResponse, setEditResponse] = useState({})
  const [isAuthorized, setIsAuthorized] = useState(true)

  return (
    // to provide the context to all component
    <AddProjectResponseStatus.Provider value={{ AddResponse, setAddResponse }}>
      <editProjectResponseStatus.Provider value={{ editResponse, setEditResponse }}>
        <isAuthorizedContext.Provider value={{isAuthorized, setIsAuthorized}}>
          {children}
        </isAuthorizedContext.Provider>
      </editProjectResponseStatus.Provider>
    </AddProjectResponseStatus.Provider>
  )
}

export default Context
