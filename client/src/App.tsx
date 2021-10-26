import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './store';
import Navbar from './components/layout/Navbar';
import './assets/styles/index.css';

const { store } = createStore();

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <div className="pt-4 min-h-screen bg-gray-800">
        { renderRoutes(routes) }
      </div>
    </Router>
  </Provider>
);

export default App;
