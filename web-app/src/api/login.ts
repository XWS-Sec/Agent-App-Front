export const loginRequest = async (usernname: string, password: string) => {
    const url: string = '/api/Login';
    const data = {username: usernname,password:password};
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response;
}