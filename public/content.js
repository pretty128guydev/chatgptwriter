if (!window.gptwriter || typeof toggleModal != 'function') {
  window.gptwriter = true;
  const loadScript = (element, src) => {
    return new Promise((resolve, reject) => {
      console.log("Loading script...");
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      element.appendChild(script);
    });
  };

  const loadCSS = async (url) => {
    const response = await fetch(url);
    return response.text();
  };

  const injectStylesIntoShadowRoot = (shadowRoot, css) => {
    const style = document.createElement('style');
    style.textContent = css;
    shadowRoot.appendChild(style);
  };

  const loadTailwindCSS = (shadowRoot) => {
    // const link = document.createElement('link');
    // link.rel = 'stylesheet';
    // link.href = chrome.runtime.getURL('style.css'); // Path to your compiled Tailwind CSS file
    // shadowRoot.appendChild(link);
    // Example usage
    loadCSS(chrome.runtime.getURL('styles.css')).then(css => {
        injectStylesIntoShadowRoot(shadowRoot, css);
    });
  };

  let wrapper;
  let rootElement;

  const tryToggleModal = () => {
    let create = false;
    if (rootElement == null || !document.contains(wrapper)) {
      wrapper = document.createElement('div');
      wrapper.style.position = "fixed";
      wrapper.style.display = "flex";
      wrapper.style.zIndex = "9999990";
      wrapper.style.left = "calc(50vw - 350px)";
      wrapper.style.top = "calc(50vh - 250px)";
      document.body.appendChild(wrapper);
      let shadowRoot = wrapper.attachShadow({mode: 'open'});

      loadTailwindCSS(shadowRoot);

      let element = document.createElement('div');
      element.style.position = "fixed";
      element.style.display = "flex";
      element.style.zIndex = "9999990";
      element.style.left = "calc(50vw - 350px)";
      element.style.top = "calc(50vh - 250px)";
      shadowRoot.appendChild(element);
      rootElement = element;
      create = true;
      loadReact(rootElement);
    }
    toggleModal(rootElement, create);
  }

  const loadReact = async (element) => {
    await loadScript(element, chrome.runtime.getURL('react.production.min.js')); // Local path to your bundled React component
    await loadScript(element, chrome.runtime.getURL('react-dom.production.min.js')); // Local path to your bundled React component
    await loadScript(element, chrome.runtime.getURL('modal.js')); // Local path to your bundled React component
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
