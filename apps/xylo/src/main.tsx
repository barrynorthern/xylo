import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import App from './app/App';
import { AppStateProvider } from "./app/AppStateContext";

ReactDOM.render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
  document.getElementById('root')
);
