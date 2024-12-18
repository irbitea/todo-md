import { FormEvent, useState } from 'react';
import { DESC_LENGTH, TITLE_LENGTH } from '../models/constants.ts';

interface ICreateTaskModalProps {
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
}

function CreateTaskModal({ onClose, onSubmit }: ICreateTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(title, description);
    };

    return (
        <dialog id="add_modal" className="modal modal-bottom sm:modal-middle backdrop-brightness-50" open>
            <div className="modal-box">
                <h3 className="font-semibold text-lg">Create task</h3>
                <form className="mt-6" onSubmit={handleFormSubmit}>
                    <div className="col-span-full md:col-span-2">
                        <input
                            id="title"
                            name="task-title"
                            className="input input-bordered w-full mb-6"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            required
                            maxLength={TITLE_LENGTH}
                        />
                        <textarea
                            id="description"
                            name="task-description"
                            className="textarea textarea-bordered w-full"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={DESC_LENGTH}
                        />
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-4">
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-secondary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default CreateTaskModal;
