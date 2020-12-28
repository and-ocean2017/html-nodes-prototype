const elements = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];

const selectTag = document.querySelector('#select-html-elements');
const parentChildTree = document.querySelector('#pc-tree');
const properties = document.querySelector('#properties');
let pcTreeData = [];

function createOptionElement(text, value) {
  let option = document.createElement('option');
  option.text = text;
  option.value = value;
  return option;
}

function addOptionsToSelect(selectTag, elements) {
  elements.forEach(function addingElement(element) {
    selectTag.appendChild(createOptionElement(element, element));
  });
}

function getParentChildRelationData(element, name) {
  const result = [{
    e: element,
    name: name
  }];

  while (element !== null) {
    element = Object.getPrototypeOf(element);
    if (element) {
      result.push({
        e: element,
        name: element.constructor.name
      });
    }
  }
  return result.reverse();
}

function createRelationNode(text) {
  const node = document.createElement('div');
  node.classList.add(...['btn', 'btn-secondary', 'btn-block']);
  const textNode = document.createTextNode(text);
  node.appendChild(textNode);
  return node;
}

function createListElement(text) {
  const list = document.createElement('li');
  const textNode = document.createTextNode(text);
  list.appendChild(textNode);
  return list;
}

function addPropertiesElements() {}

function addElementsClickListeners() {}

function removePCNodes() {
  while (parentChildTree.firstChild) {
    parentChildTree.removeChild(parentChildTree.lastChild);
  }
}

function createPCRelationElements() {
  pcTreeData.forEach((ele) => {
    parentChildTree.appendChild(createRelationNode(ele.name));
  });
}

function changeSelectOption(name) {
  // removeAllElementsClickListeners();
  let element = document.createElement(name);
  pcTreeData = getParentChildRelationData(element, name);
  removePCNodes();
  createPCRelationElements();
  addElementsClickListeners();
}

addOptionsToSelect(selectTag, elements);
selectTag.addEventListener('change', function changeOption() {
  changeSelectOption(selectTag.value);
})