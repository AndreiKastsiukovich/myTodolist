import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type ButtonNameType = 'All'|'Active'|'Completed'

function App() {

    let[tasks1,SetTasks] = useState<TaskType[]>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ])

    const removeTasks = (id:number) => {
        let removedTasks = tasks1.filter((el)=>el.id !== id)
        SetTasks(removedTasks)
    }

    let [buttonName, setButtonName] = useState<ButtonNameType>('All')

    let filteredTasks = tasks1

    if (buttonName === "All") {
        filteredTasks = tasks1
    }
    if (buttonName === "Active") {
        filteredTasks = tasks1.filter((el) => el.isDone === false)
    }
    if (buttonName === "Completed") {
        filteredTasks = tasks1.filter((el) => el.isDone === true)
    }

    const filterTasks = (buttonName: ButtonNameType) => {
        setButtonName(buttonName)
    }

    return (
        <div>
            <div className="App">
                <Todolist
                    title="What to learn"
                    tasks={filteredTasks}
                    removeTasks={removeTasks}
                    filterTasks={filterTasks}

                    />
            </div>
        </div>
    );
}

export default App;
