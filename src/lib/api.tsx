import Application from "../models/application";


export const FIREBASE_DOMAIN = 'https://react-http-eb5ad-default-rtdb.firebaseio.com';


export const createApplication = async(sendData: { name: string}) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/applications.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sendData)
  });
  if (!response.ok) {
    throw new Error('POST failed')
  }
  return null
}

export const readAllApplications = async() => {
  const response = await fetch(`${FIREBASE_DOMAIN}/applications.json`);
  const responseData: any[] = await response.json();

  if (!response.ok) {
    throw new Error('Something went wrong!')
  }
  const transformedApplications = []
  for (const key in responseData) {
    transformedApplications.push(new Application(key, responseData[key].name))
  }
  return transformedApplications
}

export const updateApplication = async( sendData: { name: string }, id: string) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/applications/${id}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sendData)
  });
  if (!response.ok) {
    throw new Error('PUT failed')
  }
  return null
}


export const deleteApplication = async(sendData = null, id: string) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/applications/${id}.json`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('DELETE failed')
  }
  return null
}