import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterNameType = 'all'|'completed'|'active'


function App() {

    const [tasks,setTask] = useState<TaskType[]>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "IT", isDone: false },
        { id: 5, title: "Incubator", isDone: false },
        { id: 6, title: "Redux", isDone: false },
    ])

    const [filterName,SetFilterName] = useState<FilterNameType>('all')

    const changeCheckBox = (taskId:number,status:boolean) => {
        setTask(tasks.map(el=>el.id === taskId ? {...el,isDone:status} : el))
    }

    const addTask = (text:string) => {
        let newTask = { id: 1, title: text, isDone: true }
        setTask([newTask,...tasks])
    }

    const removeTasks = (id:number) => {
        let removedTasks = tasks.filter(el=>el.id !== id)
        setTask(removedTasks)
    }

    const filterTasks = (filter:FilterNameType) => {
        SetFilterName(filter)
    }

    let filteringTasks = tasks;

    if(filterName === 'active'){
        filteringTasks = tasks.filter(el=>!el.isDone)
    }
    if(filterName === 'completed'){
        filteringTasks = tasks.filter(el=>el.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteringTasks}
                removeTasks={removeTasks}
                filterTasks={filterTasks}
                addTask={addTask}
                changeCheckBox={changeCheckBox}
                filterName={filterName}
            />
        </div>
    );
}

export default App;
