export async function deleteTask(id: string) {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    });

    return response.json();
}
