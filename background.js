let disinformationWebsites = [];

fetch('https://raw.githubusercontent.com/Matys134/DezinformaceList/refs/heads/main/disinformation_websites.json')
  .then(response => response.json())
  .then(data => {
    // Normalize hostnames in the JSON file
    disinformationWebsites = data.map(site => {
      if (site.hostname.startsWith('www.')) {
        site.hostname = site.hostname.substring(4);
      }
      return site;
    });
  })
  .catch(error => console.error('Error fetching disinformation websites:', error));

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    let hostname = url.hostname;

    // Normalize the hostname by removing 'www.' prefix if present
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }

    const website = disinformationWebsites.find(site => site.hostname === hostname);
    if (website) {
      chrome.tabs.sendMessage(tabId, {
        action: 'warnUser',
        description: website.description
      });
    }
  }
});