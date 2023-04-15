import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

const rootReducer = combineReducers({
    todoLists:todolistReducer,
    tasks:taskReducer
})

export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>