import { Task } from '../models/Task.ts';

export async function addTask(task: Task) {
    const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task),
    });

    return response.json();
}
