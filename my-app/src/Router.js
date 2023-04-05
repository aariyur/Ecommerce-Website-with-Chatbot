import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

function Router() {
  return (
    <BrowserRouter>
      <div className='App'>
        
        <Routes>
          <Route exact path='/'>
            <App/>
          </Route>
          <Route path='/about'>
            <p>Hello</p>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
