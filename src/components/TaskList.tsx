import { useEffect, useState } from 'react'
import type {Task} from '../types/Task'
import { getToken, removeToken } from '../lib/auth'

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>('')

    const fetchTasks = async () => {
        const res = await fetch('/tasks', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
        const data: Task[] = await res.json()
        setTasks(data)
    }

    const createTask = async () => {
        if (!newTask.trim()) return
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
            body: JSON.stringify({ title: newTask,  completed: false }),
        })
        setNewTask('')
        fetchTasks()
    }

    const deleteTask = async (id: number) => {
        await fetch(`/tasks/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } })
        fetchTasks()
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div>
            <h1>To-do List</h1>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task"
            />
            <button onClick={createTask}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList
