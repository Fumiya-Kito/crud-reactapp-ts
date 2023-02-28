import { useContext, useEffect } from "react"
import { ApplicationContext } from "../store/application-context"
import useHttp from "../hooks/use-http";
import ApplicationList from "../components/ApplicaionList";


const AllApplications: React.FC = () => {
  const applicationCtx = useContext(ApplicationContext);
  const { readApplications } = applicationCtx

  const httpData = useHttp();
  const { isLoading, error, sendRequest: fetchApplications } = httpData;


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
  }, [fetchApplications, readApplications])

  return <ul>
    {error && <p>{error}</p>}
    {isLoading ? <p>Loading</p>
      : applicationCtx.items.length === 0 ? <p>No Items</p>
      : <ApplicationList applications={applicationCtx.items} />
    }
  </ul>
}


export default AllApplications;