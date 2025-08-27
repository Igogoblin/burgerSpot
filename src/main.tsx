import { StrictMode } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { App } from './components/app/app';
import { store } from './services/store';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <DndProvider backend={HTML5Backend}> */}
        <App />
        {/* </DndProvider> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
