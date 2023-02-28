import React, { useState, ReactNode } from "react"
import Application from "../models/application"


type ApplicationContextObj = {
  items: Application[],
  addApplication: (id: string, text: string) => void,
  readApplication: (id: string) => void,
  updateApplication: (id: string, text: string) => void,
  removeApplication: (id: string) => void,
}

export const TodoContext = React.createContext<ApplicationContextObj>({
  items: [],
  addApplication: (text: string) => {},
  readApplication: (id: string) => {},
  updateApplication: (id: string, text: string) => {},
  removeApplication: (id: string) => {},
})

interface BaseLayoutProps {
  children?: ReactNode;
}


const TodoContextProvider: React.FC<BaseLayoutProps> = (props) => {
  const [applications, setApplications] = useState<Application[]>([])

  const addApplicationHandler = (applicationId: string, applicationText: string) => {
    const newApplication = new Application(applicationId, applicationText);
    setApplications((prevApplications) => {
      return prevApplications.concat(newApplication)
    })
  }

  const removeApplicationHandler = (applicationId: string) => {
    setApplications((prevApplications) => {
      return prevApplications.filter(item => item.id !== applicationId)
    })
  }
  
  const readApplicationHandler = (applicationId: string) => {
    return applications.filter(item => item.id === applicationId)
  }

  const updateApplicationHandler = (applicationId: string, applicationText: string) => {
    const prevApplication = applications.filter(item => item.id === applicationId)[0]
    prevApplication.updateApplication(applicationText)
  }

  const contextValue: ApplicationContextObj = {
    items: applications,
    addApplication: addApplicationHandler,
    readApplication: readApplicationHandler,
    updateApplication: updateApplicationHandler,
    removeApplication: removeApplicationHandler,
  }
  

  return <TodoContext.Provider value={contextValue}>
    { props.children }
  </TodoContext.Provider>
}

export default TodoContextProvider;