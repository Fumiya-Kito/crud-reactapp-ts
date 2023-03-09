import HttpContextProvider from './store/http-context'
import AllApplications from './pages/AllApplications';
import NewApplication from './components/NewApplication';

// TODO: Formを独立させる、APIフォルダを作ってPOST, PUTなどを外注させる
// TODO: MODELをプロパティ追加
function App() {

  return (
  <>
    <h1>Simple CRUD App <br/>with React+TypeScript+Firebase (No CSS)</h1>
    <HttpContextProvider>
      <NewApplication />
      <AllApplications />
    </HttpContextProvider>
  </>
  );
}

export default App;
