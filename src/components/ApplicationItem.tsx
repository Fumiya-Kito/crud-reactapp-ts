

const ApplicaionItem: React.FC<{ name: string, onDelete: () => void }> = (props) => {
  return <li>
      { props.name }
      <button onClick={props.onDelete}> DELETE </button>
    </li>
}

export default ApplicaionItem