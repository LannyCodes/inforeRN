/**
 * Created by mifind on 2017/1/9.
 */
import  ActionType from '../../constants/ActionType';

export function saveQuestionbackPersons(persons) {
    return {
        type: ActionType.SAVE_QUESBACK_PERSONS,
        persons: persons
    };
}

export function saveQuestionbackRefresh() {
    return {
        type: ActionType.SAVE_QUESBACK_REFRESH,
    };
}