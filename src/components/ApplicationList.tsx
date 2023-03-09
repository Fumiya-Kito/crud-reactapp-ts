import { useEffect, useContext } from "react";
import { HttpContext } from "../store/http-context";
import ApplicationItem from "./ApplicationItem";
import Application from "../models/application";
import useHttp from "../hooks/use-http";
import { deleteApplication } from "../lib/api";

const ApplicationList: React.FC<{applications: Application[]}> = (props) => {
  const isHttpComplete = useContext(HttpContext)
  const { changeStatus } = isHttpComplete;
  const { status, sendRequest } = useHttp(deleteApplication);

  const deleteApplicationHandler = (id: string) => {
    sendRequest(null, id);
  };

  useEffect(() => {
    if (status === 'completed') {
      changeStatus()
    }
  }, [status, changeStatus])
  

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
            />
          ))
        )}
      </ul>
    </>
  );
};

export default ApplicationList;
