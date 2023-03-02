
const { EventEmitter } = require('events')

const WEBSOCKET_URL = 'ws://172.20.185.15:3002'

class WSEvent {
    eventName = null
    /**
     * @param {{
     *      eventName: string,
     * }} message 
     */
    constructor(message) {
        this.eventName = message.eventName
    }
}

class WSPingEvent extends WSEvent {}
class WSEnterQueueEvent extends WSEvent {
    userSessionId = null
    /**
     * @param {{
     *      eventName: string,
     *      userSessionId: string,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.userSessionId = message.userSessionId
    }
}
class WSQueueEnteredEvent extends WSEvent {
    success = null
    /**
     * @param {{
     *      eventName: string,
     *      success: boolean,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.success = message.success
    }
}
class WSExitQueueEvent extends WSEvent {
    userSessionId = null
    /**
     * @param {{
     *      eventName: string,
     *      userSessionId: string,
     * }} message
     */
    constructor(message) {
        super(message)
        this.userSessionId = message.userSessionId
    }
}
class WSQueueExitedEvent extends WSEvent {
    success = null
    /**
     * @param {{
     *      eventName: string,
     *      success: boolean,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.success = message.success
    }
}
class WSGameStartEvent extends WSEvent {
    enemyPlayerId = null
    gameSessionId = null
    /**
     * @param {{
     *      eventName: string,
     *      enemyPlayerId: number,
     *      gameSessionId: string,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.enemyPlayerId = message.enemyPlayerId
        this.gameSessionId = message.gameSessionId
    }
}
class WSGameEnteredEvent extends WSEvent {
    success = null
    /**
     * @param {{
     *      eventName: string,
     *      success: boolean,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.success = message.success
    }
}
class WSGameAbortedEvent extends WSEvent {
    gameSessionId = null
    reason = null
    /**
     * @param {{
     *      eventName: string,
     *      gameSessionId: string,
     *      reason: string,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.gameSessionId = message.gameSessionId
        this.reason = message.reason
    }
}
class WSGameCellChangedEvent extends WSEvent {
    gameSessionId = null
    cellColumn = null
    cellRow = null
    cellValue = null
    /**
     * @param {{
     *      eventName: string,
     *      gameSessionId: string,
     *      cellColumn: number,
     *      cellRow: number,
     *      cellValue: number,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.gameSessionId = message.gameSessionId
        this.cellColumn = message.cellColumn
        this.cellRow = message.cellRow
        this.cellValue = message.cellValue
    }
}
class WSGameEndEvent extends WSEvent {
    youWon = null
    /**
     * @param {{
     *      eventName: string,
     *      youWon: boolean,
     * }} message 
     */
    constructor(message) {
        super(message)
        this.youWon = message.youWon
    }
}

const WSEventTypeMap = {
    ping: WSPingEvent,
    enterqueue: WSEnterQueueEvent,
    queueentered: WSQueueEnteredEvent,
    exitqueue: WSExitQueueEvent,
    queueexited: WSQueueExitedEvent,
    gamestart: WSGameStartEvent,
    gameentered: WSGameEnteredEvent,
    gameaborted: WSGameAbortedEvent,
    gamecellchanged: WSGameCellChangedEvent,
    gameend: WSGameEndEvent,
}

/**
 * @typedef {"ping" | "EnterQueue" | "QueueEntered" | "ExitQueue" | "QueueExited" | "GameStart" | "GameEntered" | "GameAborted" | "GameCellChanged" | "GameEnd"} WSEventType
 */

let connection = null
class WSWrapper extends EventEmitter {
    /**
     * @type {WSWrapper}
     */
    static get connection() {
        if(connection === null) {
            connection = new this()
        }
        return connection
    }

    /**
     * @returns {Promise<WSWrapper>}
     */
    static ready() {
        const instance = this.connection
        switch(instance.#socket.readyState) {
            case WebSocket.CONNECTING:
                return new Promise(resolve => {
                    instance.#socket.addEventListener('open', () => {
                        resolve(instance)
                    })
                })

            case WebSocket.OPEN:
                return Promise.resolve(instance)

            case WebSocket.CLOSING:
            case WebSocket.CLOSED:
                return Promise.reject('The WebSocket has been closed??')

            default:
                return Promise.reject(`The WebSocket is in an unknown state: [${instance.#socket.readyState}]`)
        }
    }

    /** @type {WebSocket} */
    #socket = null

    constructor() {
        super()
        this.#connect()
    }

    #connect() {
        if(this.#socket !== null) {
            console.log('Already connected to WebSocket server!')
            return
        }

        console.log('Connecting to WebSocket server...')

        this.#socket = new WebSocket(WEBSOCKET_URL)
        this.#socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server!')
        })

        this.#socket.addEventListener('message', event => {
            let message = null
            try {
                message = JSON.parse(event.data)
            } catch(error) {
                console.error('Failed to parse message: ', error, event)
                return
            }

            if(!(message.eventName in WSEventTypeMap)) {
                console.error('Unknown message event type: ', message.eventName, message)
                return
            }

            this.emit(
                message.eventName.toLowerCase(),
                new WSEventTypeMap[message.eventName](message)
            )
        })
    }

    /**
     * Sends an event to the websocket server.
     * 
     * @param {Object extends WSEvent} event The event to send to the server
     */
    send(event) {
        if(!('eventName' in event) || typeof event.eventName !== 'string') {
            throw new Error('The event is missing the "eventName" property')
        }

        this.#socket.send(JSON.stringify(event))
    }

    /* --------------------------------------------------------------------- */
    /* Below is all of the overwrites for autocompletion */
    /* --------------------------------------------------------------------- */

    /**
     * @param {WSEventType} eventName
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    addListener(eventName, listener) {
        super.addListener(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    on(eventName, listener) {
        return super.on(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    once(eventName, listener) {
        return super.once(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    prependListener(eventName, listener) {
        return super.prependListener(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    prependOnceListener(eventName, listener) {
        return super.prependOnceListener(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName 
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    off(eventName, listener) {
        return super.off(eventName, listener)
    }

    /**
     * @param {WSEventType} eventName 
     * @param {((...args: any[]) => void)} listener 
     * @inheritdoc
     */
    removeListener(eventName, listener) {
        return super.removeListener(eventName, listener)
    }
}

if(connection === null) {
    connection = WSWrapper.connection
}

export default WSWrapper