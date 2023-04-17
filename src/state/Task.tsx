import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";


type TaskPropsType = {
    task: TaskType
    removeCallback:(taskId:string)=>void
    changeStatusCallback:(newIsDoneValue:boolean)=>void
    changeTitleCallback:(newValue:string)=>void
}


export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeCallback(props.task.id)
    },[props.removeCallback,props.task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatusCallback(newIsDoneValue)
    },[props.changeStatusCallback])

    const onTitleChangeHandler = useCallback((newValue:string) => {
        props.changeTitleCallback(newValue)
    },[props.changeTitleCallback])

    return <div className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>

        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})

