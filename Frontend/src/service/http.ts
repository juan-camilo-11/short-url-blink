const getCookie = (name: string) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() : '';
};

export async function Post(pathUrl: string, body: any) {
    try {
        const response = await fetch(pathUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('jwt')}`,
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
        const wait = (duration: number) => {
            return new Promise(resolve => setTimeout(resolve, duration));
        };

        // Espera 10 segundos antes de continuar
        await wait(50000);

        const defaultHeaders = {
            'Authorization': `Bearer ${getCookie('jwt')}`,
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
            'Authorization': `Bearer ${getCookie('jwt')}`,
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
            'Authorization': `Bearer ${getCookie('jwt')}`,
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