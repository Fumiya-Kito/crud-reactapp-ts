import { useState } from 'react'
import ApplicationForm from './ApplicationForm'

const ApplicationItem: React.FC<{ id: string, name: string, onDelete: () => void }> = (props) => {
  const [isClicked, setIsClicked] = useState(false)

  const isClickedHandler = ()=> {
    setIsClicked(isClicked => !isClicked)
  }

  return <li>
      { props.name }
      { isClicked ? <>
        <ApplicationForm id={props.id} />
        <button onClick={isClickedHandler}> BACK </button>
      </>
        : <>
          <button onClick={isClickedHandler}> UPDATE </button>
          <button onClick={props.onDelete}> DELETE </button>
        </>
      }
    </li>
}

export default ApplicationItem