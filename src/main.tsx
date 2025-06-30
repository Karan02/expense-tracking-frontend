// src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { store } from './redux/store';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ChakraProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ChakraProvider>
//     </Provider>
//   </React.StrictMode>
// );
// main.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { store, persistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
