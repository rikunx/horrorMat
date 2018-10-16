import * as actionTypes from './playerMatActionTypes';

export function undo() {
    return {
        type: actionTypes.Undo
    }
}
export function redo() {
    return {
        type: actionTypes.Redo
    }
}