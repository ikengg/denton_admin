import './App.css';
import Dashboard from './pages/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Dashboard />
    </>
  );
}

export default App;
