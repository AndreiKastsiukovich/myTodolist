import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from "../Task";
import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: '123', title: 'HELLO', isDone: false},
        todolistId: 'todolistId1'
    },
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;

type Story = StoryObj<typeof TaskWithRedux>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDone: Story = {
    render: () => <TaskCopy/>
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

};




