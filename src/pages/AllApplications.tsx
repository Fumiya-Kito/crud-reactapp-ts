import { useContext, useEffect, useState } from "react"
import { ApplicationContext } from "../store/application-context"
import useHttp from "../hooks/use-http";
import ApplicationList from "../components/ApplicaionList";
import NewApplication from '../components/NewApplication';


const AllApplications: React.FC = () => {
  const [isHttpSuccess, setIsHttpSuccess] = useState(false)
  const applicationCtx = useContext(ApplicationContext);
  const { readApplications } = applicationCtx

  const httpData = useHttp();
  const { isLoading, error, sendRequest: fetchApplications } = httpData;

  const httpSuccessHandler = () => {
    setIsHttpSuccess(!isHttpSuccess)
  }


  useEffect(() => {
    const transformApplications = (responseData: { name: string }[]) => {
      const loadedApplications = [];
      for (const applicationKey in responseData) {
        loadedApplications.push({ id: applicationKey, name: responseData[applicationKey].name });
      }
      console.log(responseData)
      readApplications(loadedApplications);
    }
    fetchApplications({ url: 'https://react-http-eb5ad-default-rtdb.firebaseio.com/applications.json' }, transformApplications)
  }, [fetchApplications, readApplications, isHttpSuccess])

  return <>
    <NewApplication onPostSuccess={httpSuccessHandler}/>
    <ul>
      {error && <p>{error}</p>}
      {isLoading ? <p>Loading</p>
        : applicationCtx.items.length === 0 ? <p>No Items</p>
        : <ApplicationList applications={applicationCtx.items} onPutSuccess={httpSuccessHandler}/>
      }
    </ul>
  </>
}


export default AllApplications;