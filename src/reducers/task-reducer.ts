import {v1} from "uuid";
import {AddTodolistAC, RemoveTodoListAC} from "./todolist-reducer";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

const InitialState = {} as TaskStateType

export const taskReducer = (state = InitialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter((el) => el.id !== action.payload.taskId)
            }
        }
        case ADD_TASK: {
            let newTaskId = v1()
            let newTask: TaskType = {id: newTaskId, title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map((el) => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.newIsDone
                } : el)
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map((el) => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD_TODOLIST':{
            return {
                ...state, [action.payload.todolistId] : []
            }
        }
        case 'REMOVE_TODOLIST':{
            const stateCopy = {...state};
            delete stateCopy[action.payload.todoListId]

            return stateCopy;
        }
        default:
            return state
    }
}

type ActionType =
    RemoveTaskAC
    | AddTaskAC
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC
    | RemoveTodoListAC
    | AddTodolistAC

type RemoveTaskAC = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            taskId,
            todoListId,
        }
    } as const
}

type AddTaskAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: ADD_TASK,
        payload: {
            title,
            todoListId
        }
    } as const
}

type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            taskId,
            newIsDone,
            todoListId
        }
    } as const
}

type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {
            taskId,
            newTitle,
            todoListId
        }
    } as const
}