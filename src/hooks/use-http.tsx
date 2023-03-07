import { useCallback, useReducer } from 'react';
import { Reducer } from 'react';
import Application from '../models/application';

type httpState = {
  status: string | null,
  error: string | null,
  data?: Application[]
}

type httpAction = {
  type: 'SEND' | 'SUCCESS' | 'ERROR',
  payload?: Application[]
}


const httpReducer: Reducer<httpState, httpAction> = (state, action) => {
  if (action.type === 'SEND') {
    return {
      status: 'pending',
      error: null,
      data: [],
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      status: 'completed',
      error: null,
      data: action.payload
    }
  }
  if (action.type === 'ERROR') {
    return {
      status: 'completed',
      error: 'Something went wrong',
      data: []
    }
  }

  return state;
}

const useHttp = (requestAPI?: any, startWithPending?: boolean) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending': null,
    error: null,
    data: [],
  })

  const sendRequest = useCallback(async (requestData?: { name: string } | null, id?: string,) => {
    dispatch({ type: 'SEND' })
    try {
      const responseData = await requestAPI(requestData, id)
      dispatch({ type: 'SUCCESS', payload: responseData})
        
    } catch (err: unknown) {
      dispatch({ type: 'ERROR'})
    }
  }, [requestAPI]);

  return {
    ...httpState,
    sendRequest
  }
}

export default useHttp;