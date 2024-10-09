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
import React, { DOMElement, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root: ReactDOM.Root | null = null;

// State to manage modal visibility
let isVisible = false;

// Toggle function for the modal
export function toggleModal(rootElement: HTMLElement, create: Boolean) {
  isVisible = !isVisible;
  // if (create) {
  //   if (root != null) {
  //     root.unmount();
  //   }
  //   root = null;
  // }
  // if (root == null) {
  //   isVisible = true;
  //   element.style.position = "fixed";
  //   element.style.display = "flex";
  //   element.style.zIndex = "9999990";
  //   element.style.left = "calc(50vw - 350px)";
  //   element.style.top = "calc(50vh - 250px)";
  //   document.body.appendChild(element);
  //   root = ReactDOM.createRoot(element);
  // }

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
