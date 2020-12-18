class Node {

  constructor(tag, id, classes, children) {
    // Tag name of the node.
    this.tag = tag;
    // Tag id of the node.
    this.id = id;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
  }

  /**
   * @param {*} selector Selector is the html tag or class which we want to search in specic Node
   * @returns {*} array contains id's of all the elements which satistifies the search criteria
   */
  search(selector) {
    var array = [];
    if (selector == undefined || selector == null) {
      array.push("Error !!! search usage = search(selector)");
      return array;
    }
    var isClass = selector.startsWith('.');
    var node = this;
    if (isClass) {
      selector = selector.substring(1); // removing dot
      this.searchRecursiveClass(selector, node, array);
    } else {
      //search tag, given tag
      this.searchRecursiveTag(selector, node, array);
    }
    return array;
  }


  /**
   * @param {*} selector Selector is the html tag which we want to search on any html elements
   * @param {*} node node is the data structure which holds information about the the current html elements and its children
   * @param {*} arr This is user to store all node id which matches the selector
   */
  searchRecursiveTag(selector, node, arr) {
    var childNode;
    for (childNode of node.children) {
      if (childNode.tag == selector) {
        arr.push(childNode.id);
      }
      this.searchRecursiveTag(selector, childNode, arr);
    }
  }


  /**
   * 
   * @param {*} selector Selector is the class attribute which we want to search on html elements
   * @param {*} node node is the data structure which holds information about the the current html elements and its children
   * @param {*} arr This is user to store all node id which matches the selector
   * 
   */
  searchRecursiveClass(selector, node, arr) {
    var childNode;
    for (childNode of node.children) {
      var curClass;
      for (curClass of childNode.classes) {
        if (curClass == selector) {
          arr.push(childNode.id); // adding node id into array using 
          break;
        }
      }
      this.searchRecursiveClass(selector, childNode, arr);
    }
  }
}

let randomNode = new Node("span", "span-6", ["randomSpan"], []);
let spanNode5 = new Node("span", "span-5", ["note", "mania"], []);
let spanNode4 = new Node("span", "span-4", ["mania"], []);
let divNode4 = new Node("div", "div-4", [], [spanNode4, spanNode5]);
let labelNode1 = new Node("label", "lbl-1", [], []);
let sectionNode1 = new Node("section", "sec-1", [], [labelNode1]);
let divNode3 = new Node("div", "div-3", ["subContainer2"], [sectionNode1]);
let spanNode3 = new Node("span", "span-3", ["sub1-span3"], []);
let p1 = new Node("p", "para-1", ["sub1-p1", "note"], []);
let divNode2 = new Node("div", "div-2", ["subContainer1"], [p1, spanNode3]);
let spanNode2 = new Node("span", "span-2", [], []);
let spanNode1 = new Node("span", "span-1", ["note"], []);
let divNode1 = new Node("div", "div-1", ["mainContainer"], [spanNode1, spanNode2, divNode2, divNode3, divNode4]);
let body = new Node("body", "content", [], [divNode1, randomNode]);

// Testing
console.log("Started...");
// Test case 1 -
console.log("Test 1...");
console.log(divNode1.search("span"));
// Test case 2 -
console.log("Test 2...");
console.log(divNode1.search(".note"));
// Test case 3 -
console.log("Test 3...");
console.log(divNode1.search("label"));
// Test case 4 -
console.log("Test 4...");
console.log(p1.search(".note")); // output should be empty 
// Test case 5 -
console.log("Test 5...");
console.log(divNode1.search("div")); // only div 2,3,4
// Test case 6 -
console.log("Test 6...");
console.log(randomNode.search("div"));
// Test case 7 -
console.log("Test 7...");
console.log(divNode2.search("section"));
// Test case 8 -
console.log("Test 8...");
console.log(body.search());
// Error conditions need to be handled
// invalid input need to be handled
// Test case 9 -
console.log("Test 9...");
console.log(body.search("section"));
// Test case 10 -
console.log("Test 10...");
console.log(divNode1.search(".randomSpan"));
// randomSpan is some Span outside your divNode1 closed