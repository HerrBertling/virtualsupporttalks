// This function processes each individual node of the Rich Text document
export function documentContentToSimpleString(nodes: any) {
  // Initialize an empty string to hold the result
  let result = "";

  // Loop through each node in the input content array
  nodes.forEach((node: any) => {
    // If the node type is 'text', we append its value to the result
    if (node.nodeType === "text" && node.value) {
      result += node.value;
    }

    // If the node type is a list or list-item, recurse into its content
    else if (
      node.nodeType === "unordered-list" ||
      node.nodeType === "list-item"
    ) {
      if (node.content) {
        // Recursively process the content of the list or list-item node
        result += documentContentToSimpleString(node.content);
      }
    }

    // If the node type is paragraph, recurse into its content
    else if (node.nodeType === "paragraph" && node.content) {
      result += documentContentToSimpleString(node.content);
    }
  });

  // Return the concatenated string
  return result;
}
