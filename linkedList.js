import { Node } from './node.js';

/**
 * Represents a singly linked list.
 */
 export class LinkedList {
    /**
     * Creates a new empty linked list.
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Adds a new node to the end of the list.
     * @param {*} value - The value to store in the new node.
     */
    addNode(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.setNextNode(newNode);
            this.tail = newNode;
        }
    }

    /**
     * Removes the first node that contains the specified value.
     * Comparison is done by reference (===).
     * @param {*} value - The value of the node to delete.
     * @returns {boolean} - `true` if a node was removed, `false` if not found.
     */
    removeNode(value) {
        if (!this.head) return false;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                if (!current.next) this.tail = current;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    /**
     * Searches for a node by exact value (reference or primitive).
     * @param {*} value - The value to search for.
     * @returns {Node|null} - The found node or `null` if not found.
     */
    findNode(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    /**
     * Searches for a node containing an object with an `id` property equal to the given value.
     * @param {number|string} id - The ID to search for.
     * @returns {Node|null} - The found node or `null` if not found.
     */
    findById(id) {
        let current = this.head;
        while (current) {
            if (current.value && current.value.id === id) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    /**
     * Prints the linked list to the console in a readable format.
     */
    print() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.value + ' -> ';
            current = current.next;
        }
        console.log(result + 'null');
    }

    /**
     * Reverses the order of the nodes in the list.
     */
    reverse() {
        let previous = null;
        let current = this.head;
        this.tail = this.head;

        while (current) {
            const next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this.head = previous;
    }

    /**
     * Inserts a new node at the beginning of the list.
     * @param {*} value - The value to store in the new node.
     */
    insertAtStart(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    /**
     * Removes the first node from the list and returns its value.
     * @returns {*} - The value of the removed node, or `null` if the list was empty.
     */
    removeFromStart() {
        if (!this.head) return null;
        const removedValue = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        return removedValue;
    }

    /**
     * Inserts a node at a specific position in the list.
     * If the position is less than or equal to 0, inserts at the start.
     * If the position is greater than the list length, inserts at the end.
     * 
     * @param {*} value - The value to store in the new node.
     * @param {number} position - The position where to insert (0 is the head).
     */
    insertAtPosition(value, position) {
        if (position <= 0 || !this.head) {
            this.insertAtStart(value);
            return;
        }

        let current = this.head;
        let index = 0;

        while (current && index < position - 1) {
            current = current.next;
            index++;
        }

        const newNode = new Node(value);

        if (!current || !current.next) {
            this.tail.setNextNode(newNode);
            this.tail = newNode;
        } else {
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    /**
     * Removes the last node from the list and returns its value.
     * @returns {*} - The value of the removed node, or `null` if the list is empty.
     */
    removeFromEnd() {
        if (!this.head) return null;

        if (this.head === this.tail) {
            const removedValue = this.head.value;
            this.head = null;
            this.tail = null;
            return removedValue;
        }

        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }

        const removedValue = this.tail.value;
        current.next = null;
        this.tail = current;

        return removedValue;
    }

    /**
     * Returns the number of nodes in the linked list.
     * @returns {number} - The total number of nodes in the list.
     */
    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    /**
     * Checks whether the linked list is empty.
     * @returns {boolean} - True if the list has no nodes, false otherwise.
     */
    isEmpty() {
        return this.head === null;
    }

    /**
    * Returns the value of the last node in the list.
    * @returns {*} - The value of the tail node, or null if the list is empty.
    */
    getLast() {
        return this.tail ? this.tail.value : null;
    }

    /**
    * Returns the value of the first node in the list.
    * @returns {*} - The value of the head node, or null if the list is empty.
    */
    getFirst() {
        return this.head ? this.head.value : null;
    }

    /**
     * Reorders the linked list placing odd-valued nodes first,
     * followed by even-valued nodes.
     * Modifies existing references without creating new nodes.
     */
    reorderOddEven() {
        if (!this.head || !this.head.next) return;

        let oddHead = null, oddTail = null;
        let evenHead = null, evenTail = null;
        let current = this.head;

        while (current) {
            const next = current.next;
            current.next = null;

            if (current.value % 2 !== 0) {
                if (!oddHead) {
                    oddHead = current;
                    oddTail = current;
                } else {
                    oddTail.next = current;
                    oddTail = current;
                }
            } else {
                if (!evenHead) {
                    evenHead = current;
                    evenTail = current;
                } else {
                    evenTail.next = current;
                    evenTail = current;
                }
            }

            current = next;
        }

        if (oddTail) {
            oddTail.next = evenHead;
            this.head = oddHead;
            this.tail = evenTail || oddTail;
        } else {
            this.head = evenHead;
            this.tail = evenTail;
        }
    }

    /**
    * Detects if the linked list contains a cycle (loop).
    * Uses Floyd's Tortoise and Hare algorithm.
    *
    * @returns {boolean} True if there is a cycle, otherwise false.
    */
    hasCycle() {
        let slow = this.cabeza;
        let fast = this.cabeza;

        while (fast && fast.siguiente) {
            slow = slow.siguiente;
            fast = fast.siguiente.siguiente;

            if (slow === fast) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if the singly linked list is a palindrome.
     * A palindrome is a sequence that reads the same forward and backward.
     *
     * @returns {boolean} - True if the list is a palindrome, false otherwise.
     */
    isPalindrome() {
        if (!this.head || !this.head.next) return true;

        let slow = this.head;
        let fast = this.head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let prev = null;
        let current = slow;
        while (current) {
            const nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }

        let left = this.head;
        let right = prev;
        while (right) {
            if (left.value !== right.value) return false;
            left = left.next;
            right = right.next;
        }

        return true;
    }

    /**
     * Reorders the singly linked list in-place to follow a specific pattern:
     * 
     * From:
     *   L0 → L1 → L2 → ... → Ln
     * 
     * To:
     *   L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
     * 
     * This operation modifies the original list and does not return a new list.
     * 
     * @example
     * // Given a list: 1 → 2 → 3 → 4 → 5
     * list.reorderList();
     * // Resulting list: 1 → 5 → 2 → 4 → 3
     * 
     *  @throws {Error} If the list was not properly initialized (e.g. `this.head` is undefined).
     *
     * @returns {void}
     */
    reorderList() {
        if (!this.head || !this.head.next) return this.head;

        let slow = this.head;
        let fast = this.head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let prev = null;
        let current = slow.next;
        slow.next = null;
        while (current) {
            const nextTemporal = current.next;
            current.next = prev;
            prev = current;
            current = nextTemporal;
        }

        let first = this.head;
        let second = prev;
        while (second) {
            let firstTemporal = first.next;
            let secondTemporal = second.next;

            first.next = second;
            second.next = firstTemporal;

            first = firstTemporal;
            second = secondTemporal;
        }

        let tailFinder = this.head;
        while (tailFinder.next) tailFinder = tailFinder.next;
        this.tail = tailFinder;
    }

}