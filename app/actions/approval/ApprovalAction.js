/**
 * Created by coderxuan on 2017/6/7.
 */
import  ActionType from '../../constants/ActionType';

export function getApprovalProcessId(data) {
    return {
        type: ActionType.PROCESSID,
        processId: data
    };
}

export function getApprovalSubProcessId(data) {
    return {
        type: ActionType.SUB_PROCESSID,
        subProcessId: data
    };
}

export function getProSubProcessId(data){
    return {
        type: ActionType.PROJECT_PROCESSID,
        subProProcessId: data
    };
}