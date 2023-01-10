/**
 * A class should have a single primary responsibility and as a consequence it should only have
 * on reason to change
 *
 * Its bad idea to have more then one responsibility
 */

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;

    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }
}

Journal.count = 0;

let j = new Journal();

j.addEntry("I Worked out yesterday");

console.log(j);

/**
 * Now we need to save the journel in the File
 * where to put this code ? in the same Journel class
 *
 * Now this feature comes with its own set of actions
 *
 * like loading the files before writing
 * manipulate the data before writing to file
 *
 * so the better idea is to create class called fileManager
 */

/**
 * ANTI-PATTERN:
 * A 'god object' whre it has lots and lots of responsibility
 */

/**
 * Separation of convcerns:
 * refactoring the code based on their responsility
 */
