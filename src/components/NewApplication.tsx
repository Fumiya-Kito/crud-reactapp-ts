
import { useEffect, useRef, useContext } from 'react';
import { HttpContext } from '../store/http-context';
import useHttp from '../hooks/use-http';
import { createApplication } from '../lib/api';

const NewApplication: React.FC = () => {
  const isHttpComplete = useContext(HttpContext)
  const { changeStatus } = isHttpComplete;

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

    // setTimeout(props.onPostSuccess, 1000)
  }

  useEffect(() => {
    if (status === 'completed') {
      changeStatus()
    }
  }, [status, changeStatus])
  

  return  <>
    { error ? <p>{error}</p> :
    status === 'pending' ? <p>Pending...</p> :
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Enter Text</label>
      <input type='text' id='name' ref={nameInputRef}/>
      <button>CREATE</button> 
    </form>
    }
  </>
}

export default NewApplication;