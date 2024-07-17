const getToken = () =>{
    const token = sessionStorage.getItem('jwt');
    if(!token){
        return null
    }
    return token
}

export async function Post(pathUrl: string, body: any) {
    try {
        const response = await fetch(pathUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include',
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export async function Get(pathUrl: string, options: RequestInit = {}) {
    try {
        const defaultHeaders = {
            'Authorization': `Bearer ${getToken()}`,
        };
        const headers = {
            ...defaultHeaders,
            ...options.headers
        };
        const response = await fetch(pathUrl, {
            method: 'GET',
            headers,
            credentials: 'include'
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export async function Patch(pathUrl: string, options: RequestInit = {}, body: any) {
    try {
        const defaultHeaders = {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        };
        const headers = {
            ...defaultHeaders,
            ...options.headers
        };
        const response = await fetch(pathUrl, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body),
            credentials: 'include'
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export async function Delete(pathUrl: string, options: RequestInit = {}) {
    try {
        const defaultHeaders = {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        };
        const headers = {
            ...defaultHeaders,
            ...options.headers
        };
        const response = await fetch(pathUrl, {
            method: 'DELETE',
            headers,
            credentials: 'include'
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};