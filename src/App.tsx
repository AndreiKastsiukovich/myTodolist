import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type NameType = 'All'| 'Active'| 'Completed'

function App() {

    let [tasks1,SetTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])

    const removeTasks = (id: number) => {
        let deletedTasks = tasks1.filter((el) => el.id !== id)
        SetTasks(deletedTasks)
    }


    let [filter,SetFilter] = useState('All')

    const filterTasks = (name:NameType) => {
        SetFilter(name)
    }

    let filterOfTasks = tasks1

    if (filter === 'Active'){
        filterOfTasks = tasks1.filter((el)=>el.isDone)
    }
    if (filter === 'Completed'){
        filterOfTasks = tasks1.filter((el)=>!el.isDone)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filterOfTasks}
                      removeTasks={removeTasks}
                      filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
