console.log(window.studydata)
chrome.storage.local.set({ "test": "value" }).then(() => {
    console.log("Value is set");
  });
