import ApplicaionItem from "./ApplicationItem";
import Application from "../models/application";


const ApplicationList: React.FC<{ applications: Application[] }> = (props) => {
  return <>
    <ul>
      { props.applications.map(item => <ApplicaionItem key={item.id} name={item.name} />) }
    </ul>
  </>
}


export default ApplicationList