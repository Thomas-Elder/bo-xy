
export class Utility {

    /**
     * getNewPosition
     * Returns an object with x and y fields, representing a new random position within
     * the limits passed in.
     * 
     * @param {Int} x the limit in the x dimension
     * @param {Int} y the limit in the y dimension
     * @returns {} {x, y} an object with x and y coordinates
     */
    static getNewPosition(x, y) {
        return {
            x: Math.floor(Math.random() * x),
            y: -(y - Math.floor(Math.random() * y))
        };
    }

    /**
     * overlap
     * Compares two boxes, expected to have x, y, width and height properties. 
     * If any overlap exists between the boxes returns true, else returns false.
     * 
     * @param {Object} a a box object with x, y, width and height properties
     * @param {Object} b a box object with x, y, width and height properties
     * @returns {Boolean} true if there is overlap
     */
    static overlap(a, b) {

        // no horizontal overlap
        if (a.x >= b.x + b.width || b.x >= a.x + a.width) return false;

        // no vertical overlap
        if (a.y >= b.y + b.height || b.y >= a.y + a.height) return false;

        return true;
    }
}