/**
 * OpenHeroes2
 * 
 * Container.ts
 * This class is an service container wrapper for Inversify.js. It contains shortcut methods that only exposes
 * things required for OpenHeroes2.
 * 
 */

import * as Inversify from 'inversify';
import InversifyInjectDecorators from 'inversify-inject-decorators';
import IProvider from './IProvider';

class Container {

    private fInternalContainer: Inversify.Container;

    constructor() {
        this.fInternalContainer = new Inversify.Container();
    }

    /**
     * This methods binds class into service container. First parameter is an identifier for service, second one is implementation.
     * If you wont pass second argument, first one will function as both identifier and implementation. For example you can either:
     * container.bind( SomeClass ); // SomeClass is resolved as new SomeClass() 
     * or
     * container.bind( SomeClass , DerivedOfSomeClass ); // SomeClass is resolved as new DerivedOfSomeClass
     * @param key 
     * @param implementation 
     */
    public bind<T>( key: Inversify.interfaces.Newable<T> | Inversify.interfaces.Abstract<T> , implementation?: Inversify.interfaces.Newable<T> | Inversify.interfaces.Abstract<T> ): void {

        if ( implementation === undefined ) {
            // if user did not pass implementation, we assume that key is implementation
            this.fInternalContainer.bind( key ).toSelf().inSingletonScope();
        } else {
            // else we are binding key into custom implementation
            this.fInternalContainer.bind( key ).to( implementation as any ).inSingletonScope();
        }

    }

    public use( provider: IProvider ): void {
        provider( this );
    }

    /**
     * This method retrieves service from container based by key (which is class type)
     * @param key 
     */
    public get<T>( key: Inversify.interfaces.Newable<T> | Inversify.interfaces.Abstract<T> ): T {
        return this.fInternalContainer.get( key );
    }

    /**
     * This method creates a dectorator that will auto-inject service from this container
     * to a decorated field. Example:
     * 
     * const decorator = container.createInjectDecorator();
     * 
     * class SomeClas {
     * 
     *   @decorator( SomeService ) // <-- will automatically inject SomeService into decorated property
     *   public gSomeService: SomeService;
     * 
     * }
     * 
     * It was created for making integration with React more easier.
     */
    public createInjectDecorator(): any {
        return InversifyInjectDecorators( this.fInternalContainer ).lazyInject;
    }

}

export default Container;
