/**
 * OCP: Open for Extension but Closed for Modification
 *
 * it typically means a existing class should not be modified i.e., adding new code to the existing class
 * rather extend that class(inheritance)
 *
 * state space explosion: that means requires grows over time
 * for example: if a filter feature has 3 criteria then 7 methods probability
 *
 * thats the reason we can use Specification pattern( modular programming)
 */

//OLD way

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class filterProduct {
  filterByName() {}
  filterByColor() {}
  filterBySize() {}

  filterByNameAndColor() {}
  //.....

  //as you have seen the methods grows on
}

//New Way: Specification pattern

//Define a class which defines the Specifications of the requirement

//color specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

// Size Specification
class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

/**
 / Color and Size Speicification
class ColorAndSizeSpecification {
  constructor(color, size) {
    this.color = color;
    this.size = size;
  }
  isSatisfied({ color, size }) {
    return color === this.color && size === this.size;
  }
}

// Color or Size Speicification;
class ColorOrSizeSpecification {
  constructor(color, size) {
    this.color = color;
    this.size = size;
  }
  isSatisfied({ color, size }) {
    return color === this.color || size === this.size;
  }
}
 */

/**
 * Using this type of specification class we can use Specification Aggrigator classes
 */
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.some((x) => x.isSatisfied(item));
  }
}

class XorSpecification {}
//...

const laptop = new Product("laptop", "red", "small");
const mouse = new Product("mouse", "red", "small");
const keyboard = new Product("keyboard", "blue", "medium");

const products = [laptop, mouse, keyboard];

class BetterFilter {
  filter(items, spec) {
    return items.filter((item) => spec.isSatisfied(item));
  }
}

let bf = new BetterFilter();

console.log("Green Product(new)");

// console.log(bf.filter(products, new ColorOrSizeSpecification("blue", "small")));
console.log(
  bf.filter(
    products,
    new AndSpecification(
      new ColorSpecification("red"),
      new SizeSpecification("small")
    )
  )
);

console.log(
  bf.filter(
    products,
    new OrSpecification(
      new ColorSpecification("red"),
      new SizeSpecification("medium")
    )
  )
);
