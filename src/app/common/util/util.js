export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function createDataTree(dataset) {
  let hashtable = Object.create(null);
  dataset.forEach(data => (hashtable[data.id] = { ...data, childNodes: [] }));
  let dataTree = [];
  dataset.forEach(data => {
    if (data.parentId) hashtable[data.parentId].childNodes.push(hashtable[data.id]);
    else dataTree.push(hashtable[data.id]);
  });
  return dataTree;
}
