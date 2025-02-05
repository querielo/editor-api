import { Events, History as apiHistory } from '@playcanvas/observer';

/**
 * A history action
 *
 * @typedef {object} HistoryAction
 * @property {string} name - The action name
 * @property {Function} undo - The undo function
 * @property {Function} redo - The redo function
 */

/**
 * The history API responsible for undo / redo.
 */
class History extends Events {
    /**
     * Creates new instance of the API
     *
     * @category Internal
     */
    constructor() {
        super();
        this._history = new apiHistory();
        this._history.on('add', name => this.emit('add', name));
        this._history.on('undo', name => this.emit('undo', name));
        this._history.on('redo', name => this.emit('redo', name));
        this._history.on('canUndo', value => this.emit('canUndo', value));
        this._history.on('canRedo', value => this.emit('canRedo', value));
    }

    /**
     * Adds history action
     *
     * @param {HistoryAction} action - The action
     * @example
     * ```javascript
     * const prevSelection = editor.selection.items;
     * editor.history.add({
     *     name: 'clear selection',
     *     redo: () => { editor.selection.clear({ history: false }); },
     *     undo: () => { editor.selection.set(prevSelection, { history: false }); },
     * });
     * ```
     */
    add(action) {
        this._history.add(action);
    }

    /**
     * Undo last action
     *
     * @example
     * ```javascript
     * editor.history.undo();
     * ```
     */
    undo() {
        this._history.undo();
    }

    /**
     * Redo last action
     *
     * @example
     * ```javascript
     * editor.history.redo();
     * ```
     */
    redo() {
        this._history.redo();
    }

    /**
     * Clear history
     *
     * @example
     * ```javascript
     * editor.history.clear();
     * ```
     */
    clear() {
        this._history.clear();
    }

    /**
     * Gets the current action
     *
     * @type {HistoryAction}
     */
    get currentAction() {
        return this._history.currentAction;
    }

    /**
     * Gets the last action
     *
     * @type {HistoryAction}
     */
    get lastAction() {
        return this._history.lastAction;
    }

    /**
     * Whether there are any actions to undo
     *
     * @type {boolean}
     */
    set canUndo(value) {
        this._history.canUndo = value;
    }

    get canUndo() {
        return this._history.canUndo;
    }

    /**
     * Whether there are actions to redo
     *
     * @type {boolean}
     */
    set canRedo(value) {
        this._history.canRedo = value;
    }

    get canRedo() {
        return this._history.canRedo;
    }
}

export { History };
