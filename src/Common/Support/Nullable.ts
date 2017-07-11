/**
 * OpenHeroes2
 * 
 * This file exports an Nullable type which is an union type between T and null and undefined.
 * In easy words, it allows parameter to be null (or undefined) as well as its standard value.
 * This is because we are using strictNullChecks and TypeScript wont allow to asign a null into
 * variable that is not explictly declared as union type with null.
 * 
 * For example:
 * let hero: Hero = null; // error, Hero is not compatabile with null
 * let hero2: Nullable<Hero> = null; // this works ok
 * 
 */

type Nullable<T> = T | null | undefined;

export default Nullable;
