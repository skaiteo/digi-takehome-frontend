async function post(endpoint, body) {
    const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return response;
}

export { post };