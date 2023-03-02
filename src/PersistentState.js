
/**
 * @type {Map<string, Map<string, any>>}
 */
const storageSpaces = new Map()

class PersistentState {
    constructor() {
        throw new Error("The StateStorage class is static")
    }

    /**
     * @param {string} name The name of the storage
     * @returns {Map<string, any>} The storage
     */
    static get(name) {
        if(!storageSpaces.has(name))
            storageSpaces.set(name, new Map())
        return storageSpaces.get(name)
    }

    /**
     * @param {string} name The name of the storage to delete
     * @returns {boolean} Whether the storage was present before being deleted
     */
    static delete(name) {
        return storageSpaces.delete(name)
    }

    /**
     * @param {string} name The name of the storage
     * @param {object | Map<string, any>} [default_] The default value of the storage
     * @returns {Map<string, any>} The storage
     */
    static getOrDefault(name, default_ = {}) {
        if(storageSpaces.has(name))
            return storageSpaces.get(name)
        const storage = this.get(name)
        if(default_ instanceof Map)
        {
            for(const [ key, value ] of default_.entries())
                storage.set(key, value)
        }
        else
        {
            for(const key in default_)
                storage.set(key, default_[key])
        }
        return storage
    }

    /**
     * @param {Function<React.Component>} class_ The react component to get the storage for
     * @param {object | Map<string, any>} [initial] The initial state of the persistent storage
     * @returns {Map<string, any>} The storage
     */
    static getFor(class_, initial = {}) {
        return this.getOrDefault(class_.name, initial)
    }

    /**
     * @param {Function<React.Component>} class_ The react component class
     * @param {React.Component} this_ The react component instance
     * @param {any} persistent The persistent state properties
     * @param {any} [state] The normal state properties
     * @returns {any} The state to be assigned to the component
     */
    static prepareState(class_, this_, persistent, state = {}) {
        const storage = this.getFor(class_, persistent)
        for(const [ key, value ] of storage.entries())
            state[key] = value
        this.hookComponent(this_)
        return state
    }

    /**
     * @param {React.Component} instance The react component instance
     * @returns {void}
     */
    static hookComponent(instance) {
        const old = instance.setState
        instance.setState = function(state, callback) {
            PersistentState.onSetState(instance.constructor, state)
            return old.call(this, state, callback)
        }
    }

    /**
     * @param {React.Component} class_ The react component class
     * @param {any} state The new state for the component
     * @returns {void}
     */
    static onSetState(class_, state)
    {
        const storage = this.getFor(class_)
        for(const key of storage.keys())
            if(key in state)
                storage.set(key, state[key])
    }
}

export default PersistentState