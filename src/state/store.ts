import {combineReducers,legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./task-reduser";

const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store