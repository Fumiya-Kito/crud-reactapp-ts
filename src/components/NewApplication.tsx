import { useRef } from 'react';
import useHttp from '../hooks/use-http';
// import { ApplicationContext } from '../store/application-context';

const NewApplication: React.FC<{ onPostSuccess: () => void }> = (props) => {
  // const applicationCtx = useContext(ApplicationContext)
  const { isLoading, error, sendRequest } = useHttp()
  const nameInputRef = useRef<HTMLInputElement>(null)


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value

    if (enteredName.trim().length === 0) {
      return;
    }

    sendRequest({ 
      url: 'https://react-http-eb5ad-default-rtdb.firebaseio.com/applications.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: enteredName }
    })

    if (!error) {
      nameInputRef.current!.value = ''
    }
    setTimeout(props.onPostSuccess, 1000)
    
  }


  return  <>
    {isLoading ? <p>Pending...</p>
    :
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef}/>
      <button>Add Application</button> 
    </form>
    }
  </>
}

export default NewApplication;