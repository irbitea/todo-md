export async function completeTask(id: string, completed: boolean) {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ completed }),
    });

    return response.json();
}
