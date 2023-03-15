
import { useContext, useEffect } from "react"
import useHttp from "../hooks/use-http";
import ApplicationList from "../components/ApplicationList";
import { readAllApplications } from "../lib/api";
import { HttpContext } from "../store/http-context";



const AllApplications: React.FC = () => {
  const isHttpComplete = useContext(HttpContext)
  const { isComplete } = isHttpComplete;

  const httpData = useHttp(readAllApplications, true);
  const { status, error, sendRequest: fetchApplications, data } = httpData;

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications, isComplete])

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
    <ul>
      {data && <ApplicationList applications={data} />}
    </ul>
  </>
}


export default AllApplications;