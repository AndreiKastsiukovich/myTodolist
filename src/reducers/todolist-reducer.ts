import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}

const InitialState = [] as TodolistType[]

export const todolistReducer = (state = InitialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter((el) => el.id != action.payload.todoListId)
        }
        case ADD_TODOLIST: {
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map((el) => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }
        case CHANGE_TODOLIST_TITLE:{
            return state.map((el)=> el.id === action.payload.todolistId ? {...el, title:action.payload.title} : el)
        }

        default:
            return state
    }
}

type ActionType =
    RemoveTodoListAC
    | AddTodolistAC
    | ChangeTodoListFilterAC
    | ChangeTodoListTitleAC

export type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todoListId
        }
    } as const
}

export type AddTodolistAC = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            title,
            todolistId:v1()
        }
    } as const
}

type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>

export const changeTodoListFilterAC = (filter: FilterType, todolistId: string) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        payload: {
            filter,
            todolistId
        }
    } as const
}

type ChangeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (title: string, todolistId: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        payload: {
            title,
            todolistId
        }
    } as const
}