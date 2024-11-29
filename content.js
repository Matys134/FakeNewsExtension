chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === "warnUser") {
    alert(`Warning: You are visiting a disinformation website!\n\nReason: ${request.description}`);
  }
});