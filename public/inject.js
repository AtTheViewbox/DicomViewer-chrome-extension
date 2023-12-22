function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
    console.log(window.studydata)
}

injectScript(chrome.runtime.getURL('contentScripts.js'), 'body');
chrome.storage.local.set({ "test": "value" }).then(() => {
    console.log("Value is set");
  });