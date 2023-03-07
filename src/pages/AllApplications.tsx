import { useEffect, useState } from "react"
import useHttp from "../hooks/use-http";
import ApplicationList from "../components/ApplicationList";
import NewApplication from '../components/NewApplication';
import { readAllApplications } from "../lib/api";



const AllApplications: React.FC = () => {
  const [isHttpSuccess, setIsHttpSuccess] = useState(false)

  const httpData = useHttp(readAllApplications);
  const { status , error, sendRequest: fetchApplications, data } = httpData;

  const httpSuccessHandler = () => {
    setIsHttpSuccess(!isHttpSuccess)
  }

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications, isHttpSuccess])
  
  
  return <>
    <NewApplication onPostSuccess={httpSuccessHandler}/>
    <ul>
      {error && <p>{error}</p>}
      {status === 'pending' ? <p>Loading</p>
        : data?.length === 0 ? <p>No Items</p>
        : data && <ApplicationList applications={data} onHttpSuccess={httpSuccessHandler}/>
      }
    </ul>
  </>
}


export default AllApplications;