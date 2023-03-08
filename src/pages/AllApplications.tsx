import { useEffect, useState } from "react"
import useHttp from "../hooks/use-http";
import ApplicationList from "../components/ApplicationList";
import NewApplication from '../components/NewApplication';
import { readAllApplications } from "../lib/api";



const AllApplications: React.FC = () => {
  const [isHttpSuccess, setIsHttpSuccess] = useState(false)

  const httpData = useHttp(readAllApplications, true);
  const { status, error, sendRequest: fetchApplications, data } = httpData;

  const httpSuccessHandler = () => {
    setIsHttpSuccess(!isHttpSuccess)
  }

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications, isHttpSuccess])

  if (status === 'pending') {

    return <>
      <p>Loading</p>
    </>
  }

  if (error) {
    return <>
      <p>{error}</p>
    </>
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    return <>
      <p>No Items</p>
    </>
  }

  return <>
    <NewApplication onPostSuccess={httpSuccessHandler} />
    <ul>
      {data && <ApplicationList applications={data} onHttpSuccess={httpSuccessHandler} />}
    </ul>
  </>
}


export default AllApplications;