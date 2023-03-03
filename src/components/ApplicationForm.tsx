import { useRef } from 'react';
import useHttp from '../hooks/use-http';

const ApplicationForm: React.FC<{ id: string, onPutSuccess: () => void }> = (props) => {
  const { isLoading, error, sendRequest } = useHttp()
  const nameInputRef = useRef<HTMLInputElement>(null)


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value

    if (enteredName.trim().length === 0) {
      return;
    }

    sendRequest({
      url: `https://react-http-eb5ad-default-rtdb.firebaseio.com/applications/${props.id}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { name: enteredName }
    })

    if (!error) {
      nameInputRef.current!.value = ''
    }
    setTimeout(props.onPutSuccess, 1000)
  }

  return (
    <>
      {isLoading ? <p>Pending...</p>
        :
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