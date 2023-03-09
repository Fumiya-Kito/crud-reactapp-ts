import { useRef, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import { updateApplication } from '../lib/api';
import { HttpContext } from '../store/http-context';

const ApplicationForm: React.FC<{ id: string }> = (props) => {
  const isHttpComplete = useContext(HttpContext)
  const { changeStatus } = isHttpComplete;
  const { status, error, sendRequest } = useHttp(updateApplication)
  const nameInputRef = useRef<HTMLInputElement>(null)

  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value
    
    if (enteredName.trim().length === 0) {
      return;
    }
    sendRequest({ name: enteredName }, props.id)

    if (!error) {
      nameInputRef.current!.value = ''
    }
  }

  useEffect(() => {
    if (status === 'completed') {
      changeStatus()
    }
  }, [status, changeStatus])

  return (
    <>
      { error ? <p>{error}</p> :
      status === 'pending' ? <p>Pending...</p> :
        <form onSubmit={submitHandler}>
          <label htmlFor='text'>Change Text to</label>
          <input type='text' id='name' ref={nameInputRef} />
          <button>UPDATE</button>
        </form>
      }
    </>
  )
}

export default ApplicationForm;