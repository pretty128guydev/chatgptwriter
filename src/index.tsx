// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(
//   document.getElementById('gpt-modal') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root: ReactDOM.Root | null = null;

// State to manage modal visibility
let isVisible = false;

// Toggle function for the modal
export function toggleModal(rootElement: HTMLElement, create: Boolean) {
  isVisible = !isVisible;
  if (root == null || create) {
    root = ReactDOM.createRoot(rootElement);
  }

  if (create) {
    isVisible = true;
  }
  if (isVisible) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    root.render(null); // Unmount the component to hide the modal
  }
};
