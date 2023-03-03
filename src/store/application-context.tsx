import React, { useState, useCallback, ReactNode } from "react"
import Application from "../models/application"


type ApplicationContextObj = {
  items: Application[],
  readApplications: (objs: {id: string, name: string}[]) => void,
  updateApplication: (id: string, text: string) => void,
  removeApplication: (id: string) => void,
}

export const ApplicationContext = React.createContext<ApplicationContextObj>({
  items: [],
  readApplications: (objs: {id: string, name: string}[]) => {},
  updateApplication: (id: string, name: string) => {},
  removeApplication: (id: string) => {},
})

interface BaseLayoutProps {
  children?: ReactNode;
}


const TodoContextProvider: React.FC<BaseLayoutProps> = (props) => {
  const [applications, setApplications] = useState<Application[]>([])

  // const addApplicationHandler = (applicationId: string, applicationText: string) => {
  //   const newApplication = new Application(applicationId, applicationText);
  //   setApplications((prevApplications) => {
  //     return prevApplications.concat(newApplication)
  //   })
  // }

  const removeApplicationHandler = (applicationId: string) => {
    setApplications((prevApplications) => {
      return prevApplications.filter(item => item.id !== applicationId)
    })
  }

  const readApplicationsHandler = useCallback((applicationObjs: {id:string, name: string}[]) => {
    setApplications(applicationObjs.map(obj => new Application(obj.id, obj.name)))
    console.log(applicationObjs[0].id)
  }, [])

  const updateApplicationItemHandler = (applicationId: string, applicationText: string) => {
    const prevApplicationItem = applications.filter(item => item.id === applicationId)[0]
    prevApplicationItem.updateApplication(applicationText)
  }

  const contextValue: ApplicationContextObj = {
    items: applications,
    readApplications: readApplicationsHandler,
    updateApplication: updateApplicationItemHandler,
    removeApplication: removeApplicationHandler,
  }
  

  return <ApplicationContext.Provider value={contextValue}>
    { props.children }
  </ApplicationContext.Provider>
}

export default TodoContextProvider;