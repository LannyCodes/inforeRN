/**
 * Created by mifind on 2017/1/9.
 */
import  ActionType from '../../constants/ActionType';

export function incrementCount() {
    return {
        type: ActionType.INCREMENT_MESSAGECOUNT,
    };
}

export function reduceCount() {
    return {
        type: ActionType.REDUCE_MESSAGECOUNT,
    };
}

export function clearCount() {
    return {
        type: ActionType.CLEAR_MESSAGECOUNT,
    };
}

export function saveMessageCount(count: number) {
    return {
        type: ActionType.SAVE_MESSAGECOUNT,
        messageCount: count
    };
}
