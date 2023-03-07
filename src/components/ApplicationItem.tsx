import { useState } from 'react'
import ApplicationForm from './ApplicationForm'

const ApplicationItem: React.FC<{ id: string, name: string, onDelete: () => void, onHttpSuccess: () => void }> = (props) => {
  const [isClicked, setIsClicked] = useState(false)

  const isClickedHandler = ()=> {
    setIsClicked(true)
  }

  return <li>
      { props.name }
      { isClicked ? <ApplicationForm id={props.id} onHttpSuccess={props.onHttpSuccess} />
        : <>
          <button onClick={isClickedHandler}> UPDATE </button>
          <button onClick={props.onDelete}> DELETE </button>
        </>
      }
    </li>
}

export default ApplicationItem