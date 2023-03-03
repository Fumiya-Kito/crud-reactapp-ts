import { useState } from 'react'
import ApplicationForm from './ApplicationForm'

const ApplicaionItem: React.FC<{ id: string, name: string, onDelete: () => void, onPutSuccess: () => void }> = (props) => {
  const [isClicked, setIsClicked] = useState(false)

  const isClickedHandler = ()=> {
    setIsClicked(true)
  }

  return <li>
      { props.name }
      { isClicked ? <ApplicationForm id={props.id} onPutSuccess={props.onPutSuccess} />
        : <>
          <button onClick={isClickedHandler}> UPDATE </button>
          <button onClick={props.onDelete}> DELETE </button>
        </>
      }
    </li>
}

export default ApplicaionItem