/**
 * Represents a node in a singly linked list.
 */
 export class Node {
    /**
     * Creates a new instance of Node.
     * @param {*} value - The value stored in the node (can be any data type).
     * @param {Node|null} [next=null] - Reference to the next node in the list.
     */
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * Assigns a node as the next node to this one.
     * @param {Node} node - The node to be set as the next.
     */
    setNextNode(node) {
        this.next = node;
    }

    /**
     * Updates the value stored in the node.
     * @param {*} value - The new value of the node.
     */
    updateValue(value) {
        this.value = value;
    }

    /**
     * Returns a string representation of the node.
     * @returns {string}
     */
    toString() {
        return `Node(value: ${this.value})`;
    }
}