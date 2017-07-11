/**
 * OpenHeroes2
 * 
 * This type is just a class type that can be instanced using `new` operator.
 */

type ClassOf<T> = { new(): T };

export default ClassOf;
