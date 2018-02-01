/** 
 * Created by Infore.Wlun. 
 */

import  ActionType from '../../constants/ActionType';

export function saveTmpQuestionBackPersons(persons) {
    return {
        type: ActionType.SAVE_TMPQUESBACK_PERSONS,
        persons: persons
    }
}

export function saveTmpQuestionBackRefresh() {
    return {
        type: ActionType.SAVE_TMPQUESBACK_REFRESH,
    }
}