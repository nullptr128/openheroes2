/**
 * OpenHeroes2
 * 
 * Inject.ts
 * 
 * This file exports annotation that allows decorate a property with auto-injector.
 * We are importing and reexporting it here, because it will allow VSCode to autocomplete
 * Inject() and automatically import this module.
 * It also makes our project consistent in terms of decorator starting with uppercase.
 * Finally, we want to use external dependencies only where it is absolutely needed, and
 * this export handles it for us.
 */

import * as Inversify from 'inversify';

const Inject = Inversify.inject;
export default Inject;
