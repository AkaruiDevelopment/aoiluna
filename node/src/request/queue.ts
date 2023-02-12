import Client from "../client/index.js";
import { Queue } from "../typings/interface.js";

export default class QueueManager
{
    queue: Map<string, Queue> = new Map();
    timer: Map<string, NodeJS.Timeout> = new Map();
    #client: Client;
    constructor ( client: Client )
    {
        this.#client = client;
    }
    add ( queue: Queue )
    {
        this.queue.set( queue.route, queue );
        this.timer.set( queue.route, setTimeout( () =>
        {
            this.delete( queue.route );
        },queue.resetAfter ) );
    }
    get ( route: string )
    {
        return this.queue.get( route );
    }
    delete ( route: string )
    {
        this.queue.delete( route );
        this.timer.delete( route );
    }
    has ( route: string )
    {
        return this.queue.has( route );
    }

}