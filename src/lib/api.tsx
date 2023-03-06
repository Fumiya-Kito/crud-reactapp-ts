// import { useContext } from 'react';
// import { ApplicationContext } from '../store/application-context';


export const FIREBASE_DOMEIN = 'https://react-http-eb5ad-default-rtdb.firebaseio.com/';


export const useGetAllApplications = async() => {
  console.log('before fetch')
  // const applicationCtx = useContext(ApplicationContext)
  // const { readApplications } = applicationCtx
  
  const response = await fetch(`${FIREBASE_DOMEIN}/applications.json`);
  const responseData: any = await response.json();
  console.log(responseData)
  console.log('ok?', response.ok)

  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong')
  }

  const transformedApplications = [];

  for (const key in responseData) {
    transformedApplications.push({ id: key, name: responseData[key].name })
  }

  console.log('trans:', transformedApplications)

  // readApplications(transformedApplications)

  return transformedApplications

}
