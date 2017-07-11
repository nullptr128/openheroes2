/**
 * OpenHeroes2
 * 
 * Injectable.ts
 * 
 * This file exports annotation that allows an class to be injected in another service.
 * It is required by inversify design. We are importing and reexporting it here, because
 * it will allow VSCode to autocomplete Injectable() and automatically import this module.
 * It also makes our project consistent in terms of decorator starting with uppercase.
 * Finally, we want to use external dependencies only where it is absolutely needed, and
 * this export handles it for us.
 */

import * as Inversify from 'inversify';
import 'reflect-metadata';

let Injectable = Inversify.injectable;
export default Injectable;
