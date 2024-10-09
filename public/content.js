if (!window.gptLoaded) {
  window.gptLoaded = true;
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      console.log("Loading script...");
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  let rootElement;

  const tryToggleModal = () => {
    let create = false;
    if (rootElement == null || !document.contains(rootElement)) {
      let element = document.createElement('div');
      element.style.position = "fixed";
      element.style.display = "flex";
      element.style.zIndex = "9999990";
      element.style.left = "calc(50vw - 350px)";
      element.style.top = "calc(50vh - 250px)";
      document.body.appendChild(element);
      rootElement = element;
      create = true;
      loadReact();
    }
    toggleModal(rootElement, create);
  }

  const loadReact = async () => {
    await loadScript(chrome.runtime.getURL('react.production.min.js')); // Local path to your bundled React component
    await loadScript(chrome.runtime.getURL('react-dom.production.min.js')); // Local path to your bundled React component
    await loadScript(chrome.runtime.getURL('modal.js')); // Local path to your bundled React component
  };

  // Listen for messages to open the modal
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDialog') {
      // if (!window.scriptLoaded) {
      //   loadReact();
      //   window.scriptLoaded = true;
      // }
      tryToggleModal();
    }
  });

  window.addEventListener('message', (event) => {
    // Security check: Ensure the message is from a trusted source
    if (event.origin !== window.location.origin) {
      return; // Ignore messages from untrusted sources
    }

    // Handle the message
    const { type } = event.data;

    if (type === 'TOGGLE_DIALOG') {
      // Perform actions for 'toggleDialog'
      console.log('Toggle dialog received');
      tryToggleModal();  // Call your modal toggling logic here
    }
  });
}
