import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/Task.ts';
import { getTasks } from './adapters/getTasks.ts';
import { addTask } from './adapters/addTask.ts';
import { deleteTask } from './adapters/deleteTask.ts';
import { completeTask } from './adapters/completeTask.ts';
import CreateTaskModal from './components/CreateTaskModal.tsx';
import DeleteIcon from './components/DeleteIcon.tsx';
import FilterButton from './components/FilterButton.tsx';
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from './models/constants.ts';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filter, setFilter] = useState(FILTER_ALL);

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
    }, []);

    const handleSubmit = async (title: string, description: string) => {
        const addedTask = await addTask({
            id: uuidv4(),
            title,
            description,
            completed: false,
        });
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setIsAddModalOpen(false);
    };

    async function onDelete(id: string) {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    }

    async function onComplete(id: string) {
        const task = tasks.find((task) => task.id === id);
        if (!task) return;

        const updatedTask = await completeTask(id, !task.completed);
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === FILTER_ALL) return true;
        if (filter === FILTER_ACTIVE) return !task.completed;
        if (filter === FILTER_COMPLETED) return task.completed;
    });

    return (
        <>
            <div className="max-w-6xl px-4 py-12 mx-auto">
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-baseline mb-6">
                    <div className="flex justify-center sm:justify-start gap-2 mb-5">
                        <FilterButton name={FILTER_ALL} isActive={filter === FILTER_ALL} onClick={() => setFilter(FILTER_ALL)} />
                        <FilterButton name={FILTER_ACTIVE} isActive={filter === FILTER_ACTIVE} onClick={() => setFilter(FILTER_ACTIVE)} />
                        <FilterButton
                            name={FILTER_COMPLETED}
                            isActive={filter === FILTER_COMPLETED}
                            onClick={() => setFilter(FILTER_COMPLETED)}
                        />
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => setIsAddModalOpen(true)}>
                        Create task
                    </button>
                </div>

                {!tasks.length && <div className="flex justify-center">Create new tasks to get started!</div>}

                {filteredTasks
                    .map((task) => (
                        <div key={task.id} className="card bg-base-200 shadow-lg rounded-lg mb-5">
                            <div className="card-body p-5">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="checkbox bg-base-100 checkbox-secondary"
                                            onChange={() => onComplete(task.id)}
                                            checked={task.completed}
                                        />
                                        <span className="ml-2 text-lg font-semibold break-words">{task.title}</span>
                                    </label>
                                    <button className="btn btn-square btn-ghost" onClick={() => onDelete(task.id)} aria-label="Delete task">
                                        <DeleteIcon />
                                    </button>
                                </div>
                                {task.description && <p className="mt-2 text-md text-gray-600">{task.description}</p>}
                            </div>
                        </div>
                    ))
                    .reverse()}
            </div>

            {isAddModalOpen && <CreateTaskModal onClose={() => setIsAddModalOpen(false)} onSubmit={handleSubmit} />}
        </>
    );
}

export default App;
