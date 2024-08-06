import { TreeNode } from "./TreeNode";

function invertBinaryTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    invertBinaryTree(root.left);
    invertBinaryTree(root.right);

    return root;
}

const tree = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4),
        new TreeNode(5)
    ),
    new TreeNode(3,
        new TreeNode(6),
        new TreeNode(7)
    )
);

console.log("Original Tree:");
console.log(JSON.stringify(tree, null, 2));

const invertedTree = invertBinaryTree(tree);

console.log("Inverted Tree:");
console.log(JSON.stringify(invertedTree, null, 2));