function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

let a = injectScript(chrome.runtime.getURL("inject.js"), "body");

window.addEventListener(
  "message",
  (message) => {
    console.log(message.data);
    let metadata = message.data.data.map((x) => ({
      label: x.label,
      modality: x.modality,
      id: x._id,
      images: x.instances.map((y) => y.url),
    }));

    console.log(generateMetaData(metadata));
    chrome.storage.local.set({ PAC_DATA: generateMetaData(metadata) });
  },
  { once: true }
);

function generateMetaData(list) {
  var objs = list.map((x) => ({
    thumbnail: x.images[0],
    label: x.label,
    modality: x.modality,
    id: x.id,
    prefix: longestCommonPrefix(x.images),
    suffix: longestCommonSuffix(x.images),
    start_slice: 1,
    end_slice: x.images.length,
    max_slice: x.images.length,
    ww: 1400,
    wc: 1200,
    ci: 1,
    z: 1,
    px: "0",
    py: "0",
    r: 0,
    pad: x.images[0].split("/").pop()?.split(".")[0].length || 0,
    cord: [-1, -1],
  }));
  return objs;
}
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  strs.sort();

  let prefix = "";
  let first = strs[0];
  let last = strs[strs.length - 1];

  for (let i = 0; i < first.length; i++) {
    if (first[i] === last[i]) {
      prefix += first[i];
    } else {
      break;
    }
  }

  return prefix;
}
function longestCommonSuffix(strs) {
  const reversedStrs = strs.map((str) => str.split("").reverse().join(""));
  const suffix = longestCommonPrefix(reversedStrs);
  return suffix.split("").reverse().join("");
}
