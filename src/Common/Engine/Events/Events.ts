/**
 * OpenHeroes2
 * 
 * This class allows to define and trigger asynchronous events
 * in application. This is useful for communicating losely related
 * classes.
 * 
 * Example usage:
 * 
 * class EMapLoaded {
 *   map: Heroes2Map;
 * }
 * 
 * // listen for event
 * let handler = Events.on( EMapLoaded , data => console.log( 'Map loaded: ' + data.map ) );
 * 
 * // disable listener
 * Events.off( handler );
 * 
 * // trigger an event
 * await Events.trigger( EMapLoaded , { map: someLoadedMap } );
 * 
 * Please note that event class just defines SHAPE of object, you cannot
 * put methods here. Just think about event class here as an interface.
 * It works this way because TypeScript real interfaces are not emitted 
 * on build and thus, are not available on runtime.
 * 
 */

import _ from 'lodash';
import Injectable from '../../IOC/Injectable';
import Nullable from '../../Support/Nullable';

export type EventType<T> = {
    new(): T;
};

export type EventData<T> = {
    [P in keyof T]: T[P];
};

export type EventHandler<T> = {
    id: number;
    callback: EventCallback<T>;
};

export type EventCallback<T> = {
    (data: EventData<T>): void|Promise<void>;
};

export type EventId = {
    readonly __id: number;
    readonly __type: EventType<any>;
};

@Injectable()
export default class Events {

    private fLastId: number = 0;
    private fHandlers: Map<EventType<any>,EventHandler<any>[]> = new Map();

    /**
     * Registers listener for event of particular type. Will return an EventId
     * struct which may be used to disable this listener.
     * @param type type of event, simple class
     * @param callback callback fired when event is triggered
     */
    public on<T>( type: EventType<T> , callback: EventCallback<T> ): EventId {

        let handlersOfType: Nullable<EventHandler<T>[]> = this.fHandlers.get( type );
        if ( !handlersOfType ) {
            handlersOfType = [];
            this.fHandlers.set( type , handlersOfType );
        }

        const genId: number = this.fLastId++;

        const handler: EventHandler<T> = {
            id: genId ,
            callback: callback ,
        };

        handlersOfType.push( handler );
        return { __id: genId , __type: type };

    }

    /**
     * Removes listener from particular event. 
     * @param eventId eventId returned from .on() method.
     */
    public off<T>( eventId: EventId ): boolean {

        const type: EventType<T> = eventId.__type;
        let handlersOfType: Nullable<EventHandler<T>[]> = this.fHandlers.get( type );

        if ( !handlersOfType ) {
            throw new Error( 'Trying to unbind event that was not bound.' );
        }

        const removed: any[] = _.remove( handlersOfType , h => h.id == eventId.__id );
        return removed.length > 0;

    }

    /**
     * Triggers event, calling all listener callbacks. Will return Promise of number,
     * that is resolved when all asynchronous listeners are called.
     * @param type type of trigger, simple class
     * @param data data which will be passed to listeners, based on event class
     */
    public async trigger<T>( type: EventType<T> , data?: EventData<T> ): Promise<number> {

        let handlersOfType: Nullable<EventHandler<T>[]> = this.fHandlers.get( type );
        if ( !handlersOfType ) {
            return 0;
        }

        const promises: Promise<void>[] = handlersOfType.map( handler => {
            const result: void|Promise<void> = handler.callback( data || ( {} as any ) );
            if ( result instanceof Promise ) {
                return result;
            } else {
                return Promise.resolve();
            }
        } );

        await Promise.all( promises );
        return handlersOfType.length;

    }

}
