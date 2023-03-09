import React, { useState, useCallback, ReactNode } from "react"


type httpObj = {
  isComplete: boolean,
  changeStatus: () => void,
}

export const HttpContext = React.createContext<httpObj>({
  isComplete: false,
  changeStatus: () => {},
})


interface BaseLayoutProps {
  children?: ReactNode;
}

const HttpContextProvider: React.FC<BaseLayoutProps> = (props) => {
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const changeStatusHandler = useCallback(() => {
    setIsComplete(isComplete => !isComplete);
  }, [])

  const contextValue: httpObj = {
    isComplete: isComplete,
    changeStatus: changeStatusHandler,
  }
  
  return <HttpContext.Provider value={contextValue}>
    { props.children }
  </HttpContext.Provider>
}

export default HttpContextProvider;