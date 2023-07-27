
//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';
import NewAppRouter from './components/NewAppRouter';

function App() {
  return (
    <DataProvider>

        <Home>
        </Home>
      
     
    </DataProvider>
  );
}

export default App;
