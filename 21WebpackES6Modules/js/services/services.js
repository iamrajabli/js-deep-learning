const postData = async(url, data) => {
    const req = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await req.json();
}


const getResource = async url => {
    const req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Could not fetch ${url}`);
    }

    return await req.json();
}

export { postData };
export { getResource };