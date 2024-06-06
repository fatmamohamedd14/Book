// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
// import './index.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//     <App />
  
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//  import ReactDOM from 'react-dom/client';
// import App from './App';
    
//   let root = ReactDOM.createRoot( document.getElementById('root'))

//   root.render(<App></App>)


import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App';
// import reportWebVitals from './reportWebVitals';
import CounterContextProvider from './Context/CounterContext';
import UserTokenContextProvider from './Context/UserTokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
        <UserTokenContextProvider>
            <CounterContextProvider>
                <App />
            </CounterContextProvider>
        </UserTokenContextProvider>
    </QueryClientProvider>


);

