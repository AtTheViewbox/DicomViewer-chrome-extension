import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
import {useChromeStorageLocal} from 'use-chrome-storage';


function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('test', "init");
  return (
    <div>
      <HeaderComp></HeaderComp>
      <Divider />
      <Button variant="outlined">Outlined</Button>
      <div>Persisted in chrome.storage.local: {value.toString()}</div>
    </div>
  );
}

export default App;
