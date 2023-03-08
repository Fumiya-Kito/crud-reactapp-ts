import ApplicationContextProvider from './store/application-context'
import AllApplications from './pages/AllApplications';

// TODO: Formを独立させる、APIフォルダを作ってPOST, PUTなどを外注させる
// TODO: MODELをプロパティ追加
function App() {

  return (
    <ApplicationContextProvider>
      <AllApplications />
    </ApplicationContextProvider>
  );
}

export default App;
