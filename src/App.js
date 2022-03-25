import Home from './components/Home'
import './App.css';
import { Router } from '@reach/router';
import SinglePost from './components/SinglePost';
import Login from './components/Login';

function App() {
  
  return (
    <div>
      <Router>
        <Home path="/"/>
        <SinglePost path="/post/:id" />
        <Login path="/login"/>
      </Router>
    </div>
  );
}

export default App;
