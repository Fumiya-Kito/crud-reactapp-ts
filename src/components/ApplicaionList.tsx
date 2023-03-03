import ApplicaionItem from "./ApplicationItem";
import Application from "../models/application";
import useHttp from "../hooks/use-http";
import { useContext } from "react";
import { ApplicationContext } from "../store/application-context";


const ApplicationList: React.FC<{ applications: Application[], onPutSuccess: () => void }> = (props) => {
  const applicationCtx = useContext(ApplicationContext)
  const { removeApplication } = applicationCtx
  const { sendRequest} = useHttp()

  const deleteApplicationHandler = (id: string) => {
    sendRequest({ url: `https://react-http-eb5ad-default-rtdb.firebaseio.com/applications/${id}.json`, method: 'DELETE'}
    , removeApplication(id))
  }

  return <>
    <ul>
      { props.applications.map(item => <ApplicaionItem key={item.id} id={item.id} name={item.name} onDelete={deleteApplicationHandler.bind(null, item.id)} onPutSuccess={props.onPutSuccess}/>) }
    </ul>
  </>
}


export default ApplicationList