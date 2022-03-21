import Home from './components/Home'
import './App.css';
import { Router } from '@reach/router';
import SinglePost from './components/SinglePost';

function App() {
  return (
    <div>
      <Router>
        <Home path="/"/>
        <SinglePost path="/post/:id" />
      </Router>
    </div>
  );
}

export default App;
