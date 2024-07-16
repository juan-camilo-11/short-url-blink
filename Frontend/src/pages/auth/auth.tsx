import { useEffect } from "react";
import { Get } from "../../service/http";

function Auth() {
    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL_BACKEND}/auth/google`;
    }

    function checkJwtCookieExistence(cookieName: string) {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return true;
            }
        }
        return false;
    }

    const fetchUser = async () => {
        try {
            const user = await Get(`${process.env.REACT_APP_BASE_URL_BACKEND}/profile`);
            if (user) {
                console.log("user", user)
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = `${process.env.REACT_APP_BASE_URL}/dashboard`;
            }
        } catch (error) {
            console.error('Error al obtener usuario:', error);
        }
    };

    useEffect(() => {
        const existingUser = sessionStorage.getItem('user') ? true : false;
        const existingToken = checkJwtCookieExistence('jwt');
        if (existingToken && !existingUser) {
            fetchUser();
        }
        else{
            console.log("No existe token")
        }
    }, [])

    return (
        <section id='auth' className='flex flex-col justify-center items-center h-full gap-8'>
            <article className="flex flex-col justify-center items-center border gap-2 p-5 rounded-lg border-gray-200 dark:border-black/20 shadow-sm">
                <h2 className="text-gray-800 dark:text-white text-2xl">Blink</h2>
                <p className="text-gray-800 dark:text-white text-sm">Inicie sesión con su proveedor social para comenzar:</p>
                <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 border p-2 rounded-lg border-gray-200 dark:border-black/20 shadow-sm text-gray-800 dark:text-white"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="19.0625" viewBox="0 0 488 512" className="fill-black dark:fill-white"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Google</button>
            </article>
        </section>
    );
}

export default Auth;
