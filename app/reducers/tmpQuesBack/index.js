/** 
 * Created by Infore.Wlun. 
 */

import ActionType from '../../constants/ActionType';
import { combineReducers } from 'redux';

let person = [];
function saveTmpQuesBackPersons(state = person, action) {
    if (action.type === ActionType.SAVE_TMPQUESBACK_PERSONS) {
        person = action.persons
    }
    return person
}

let refreshTag = 0;
function saveTmpQuesBackRefresh(state = refreshTag, action) {
    if (action.type = ActionType.SAVE_TMPQUESBACK_REFRESH) {
        refreshTag++;
    }
    return refreshTag;
}

let tmpQBPersons = combineReducers({
    saveTQBPersons: saveTmpQuesBackPersons,
    saveTQBRefresh: saveTmpQuesBackRefresh,
})

export default tmpQBPersons