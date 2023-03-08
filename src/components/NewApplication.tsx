import { useRef } from 'react';
import useHttp from '../hooks/use-http';
import { createApplication } from '../lib/api';

const NewApplication: React.FC<{ onPostSuccess: () => void }> = (props) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const { status, error, sendRequest } = useHttp(createApplication)

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value
    if (enteredName.trim().length === 0) {
      return;
    }

    sendRequest({ name: enteredName })

    if (!error) {
      nameInputRef.current!.value = ''
    }
    setTimeout(props.onPostSuccess, 1000)
  }


  return  <>
    { error ? <p>{error}</p> :
    status === 'pending' ? <p>Pending...</p> :
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef}/>
      <button>Add Application</button> 
    </form>
    }
  </>
}

export default NewApplication;