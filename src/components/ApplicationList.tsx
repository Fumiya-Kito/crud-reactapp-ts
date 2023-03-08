import { useEffect } from "react";
import ApplicationItem from "./ApplicationItem";
import Application from "../models/application";
import useHttp from "../hooks/use-http";
import { deleteApplication } from "../lib/api";

const ApplicationList: React.FC<{
  applications: Application[];
  onHttpSuccess: () => void;
}> = (props) => {
  const { status, sendRequest } = useHttp(deleteApplication);

  const deleteApplicationHandler = (id: string) => {
    sendRequest(null, id);
  };

  useEffect(() => {
    if (status === 'completed') {
      props.onHttpSuccess()
    }
  }, [props, status])
  

  return (
    <>
      <ul>
        {status === "pending" ? (
          <p>Pending</p>
        ) : (
          props.applications.map((item) => (
            <ApplicationItem
              key={item.id}
              id={item.id}
              name={item.name}
              onDelete={deleteApplicationHandler.bind(null, item.id)}
              onHttpSuccess={props.onHttpSuccess}
            />
          ))
        )}
      </ul>
    </>
  );
};

export default ApplicationList;
