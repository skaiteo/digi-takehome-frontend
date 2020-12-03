async function post(endpoint, body) {
    const response = await fetch(`https://digi-takehome-assignment.herokuapp.com${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return response;
}

export { post };