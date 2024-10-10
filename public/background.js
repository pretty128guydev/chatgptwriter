chrome.action.onClicked.addListener((tab) => {
  console.log("Click received.");
  if (tab.url.match(/chrome:\/\//)) {
    console.error("cannot use this plugin in this page!")
    return
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
  try {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleDialog' });
  } catch (e) {
    console.log(e)
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchIndex') {
    // Fetch the index.html file from the extension's resources
    try {
      fetch(chrome.runtime.getURL('index.html'))
        .then(response => response.text())
        .then(data => sendResponse({ content: data }))
        .catch(error => sendResponse({ error: 'Failed to load content.' }));

      // Return true to indicate the response will be sent asynchronously
      return true;
    } catch (e) {
      console.log(e)
    }
    return false;
  }
});
