import { useRef } from 'react';
import useHttp from '../hooks/use-http';
import { updateApplication } from '../lib/api';

const ApplicationForm: React.FC<{ id: string, onHttpSuccess: () => void }> = (props) => {
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
    setTimeout(props.onHttpSuccess, 1000)
  }

  return (
    <>
      { error ? <p>{error}</p> :
      status === 'pending' ? <p>Pending...</p> :
        <form onSubmit={submitHandler}>
          <label htmlFor='text'>Change Your Name to</label>
          <input type='text' id='name' ref={nameInputRef} />
          <button>Update Application</button>
        </form>
      }
    </>
  )
}

export default ApplicationForm;