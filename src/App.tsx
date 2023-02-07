import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type FilterType = 'All'|'Active'|'Completed'

function App() {

    let[tasks1,SetTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])

    const removeTasks = (name:number) => {
        let deletedTasks = tasks1.filter((el)=>el.id != name)
        SetTasks(deletedTasks)
    }

    let[filter,SetFilter] = useState<FilterType>('All')

    const filterTasks = (filter:FilterType) => {
        SetFilter(filter)
    }

    let filteringTasks = tasks1
    if (filter === 'Active'){
        filteringTasks = tasks1.filter((el)=>el.isDone)
    }
    if (filter === 'Completed'){
        filteringTasks = tasks1.filter((el)=>!el.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteringTasks}
                removeTasks={removeTasks}
                filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
