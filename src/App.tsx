import ApplicationContextProvider from './store/application-context'
import AllApplications from './pages/AllApplications';

function App() {

  return (
    <ApplicationContextProvider>
      <AllApplications />
    </ApplicationContextProvider>
  );
}

export default App;
