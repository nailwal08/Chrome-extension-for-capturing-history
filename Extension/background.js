// Function to clean up captured links older than 24 hours
function cleanUpLinks() {
    chrome.storage.local.get({ links: [] }, function (data) {
      const currentTime = Date.now();
      const linksArray = data.links.filter(link => (currentTime - new Date(link.timestamp)) < (24 * 60 * 60 * 1000));
      chrome.storage.local.set({ links: linksArray });
    });
  }
  
  // Call the cleanUpLinks function initially when the extension starts
  cleanUpLinks();
  
  // Schedule the cleanUpLinks function to run periodically every 24 hours
  setInterval(cleanUpLinks, 24 * 60 * 60 * 1000);
  
  // Listen for visited page events and capture links with timestamps
  chrome.history.onVisited.addListener(function (result) {
    chrome.storage.local.get({ links: [] }, function (data) {
      const linksArray = data.links || [];
      const timestamp = new Date().toISOString();
      linksArray.push({ url: result.url, title: result.title, timestamp: timestamp });
      chrome.storage.local.set({ links: linksArray });
    });
  });
  