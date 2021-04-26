
/**
 * A class for managing any sort of interaction functions, like collision
 * detection.
 * 
 */
export class Interaction {

  /**
   * 
   */
  constructor() {

  }

  /**
   * Takes two parameters, representing boxes. Two functions are expected;
   * getSize : which returns an object with two properties, height and width.
   * getPosition : which returns an object with two properties, x and y.
   * 
   * Returns true if there is an overlapping of the boxes. 
   * 
   * @param a
   * @param b
   * @returns boolean :
   * 
   */
  collision(a, b){

    if ((a.getPosition().x - b.getSize().width) < b.getPosition().x) {
      if (b.getPosition().x  < (a.getPosition().x + a.getSize().width)) {
        if ((b.getPosition().y + b.getSize().height) > a.getPosition().y) {
          if (b.getPosition().y < (a.getPosition().y + a.getSize().height)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}