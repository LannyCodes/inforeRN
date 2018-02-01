/**
 * Created by coderxuan on 2017/6/7.
 */
import ActionType from '../../constants/ActionType';
import {combineReducers} from 'redux';

let processId = 0;
function catchProcessId(state = processId, action) {
    if (action.type === ActionType.PROCESSID) {
        processId = action.processId
    }
    return processId
}

let subProcessId = 0;
function catchSubProcessId(state = subProcessId, action) {
    if (action.type === ActionType.SUB_PROCESSID) {
        subProcessId = action.subProcessId
    }
    return subProcessId
}

let subProProcessId = 0;
function catchProSubProcessId(state = subProProcessId, action) {
    if (action.type === ActionType.PROJECT_PROCESSID) {
        subProProcessId = action.subProProcessId
    }
    return subProProcessId
}
let approval = combineReducers({
    catchProcessId: catchProcessId,
    catchSubProcessId: catchSubProcessId,
    catchProSubProcessId: catchProSubProcessId
});

export default approval;
