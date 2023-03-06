import { useCallback, useReducer } from 'react';
import { Reducer } from 'react';

type httpState = {
  status: string | null,
  error: string | null,
}

type ACTIONTYPE = { type: 'SEND' } | { type: 'SUCCESS' } | { type: 'ERROR' };

const httpReducer: Reducer<httpState, ACTIONTYPE> = (state: httpState, action: ACTIONTYPE ) => {
  if (action.type === 'SEND') {
    return {
      status: 'pending',
      error: null,
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      status: 'completed',
      error: null,
    }
  }
  if (action.type === 'ERROR') {
    return {
      status: 'completed',
      error: 'Something went wrong',
    }
  }

  return state;
}

const useHttp = (startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending': null,
    error: null,
  })

  const sendRequest = useCallback(async (requestConfig: { url: string, method?: string, headers?: HeadersInit, body?: {} }, applyData?: any) => {
    dispatch({ type: 'SEND' })
    try {
      const response = await fetch(
        requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
      
      if (!response.ok) {
          throw new Error('Request failed!');
        }
        
      const data = await response.json();
      if (applyData) {
        applyData(data);
      }

      dispatch({ type: 'SUCCESS'})
        
    } catch (err: unknown) {
      dispatch({ type: 'ERROR'})
    }
  }, []);

  return {
    ...httpState,
    sendRequest
  }
}

export default useHttp;