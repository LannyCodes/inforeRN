/**
 * Created by InforeXuan on 2017/5/18.
 */
import  ActionType from '../../constants/ActionType';
import {combineReducers} from 'redux';

let person = [];
function saveQusBackPersons(state = person, action) {
    if (action.type === ActionType.SAVE_QUESBACK_PERSONS) {
        person = action.persons
    }
    return person
}
let refreshTag = 0;
function saveQBRefreshTag(state = refreshTag, action) {
    if (action.type === ActionType.SAVE_QUESBACK_REFRESH) {
        refreshTag++;
    }
    return refreshTag
}

let persons = combineReducers({
    saveQBPersons: saveQusBackPersons,
    saveQBRefreshTag: saveQBRefreshTag,
});

export default persons;

