import { useEffect } from "react";

function Logout() {

    useEffect(() => {
        logout();
    }, [])

    const deleteUser = () => {
        if(sessionStorage.getItem('user')){
            sessionStorage.removeItem('user');
        }
    }

    function logout() {
        fetch(`${process.env.REACT_APP_BASE_URL_BACKEND}/profile/logout`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => {
                if(response.ok){
                    deleteUser();
                    window.location.href = '/short-url-blink/'; 
                }
            })
            .catch(err => {
                throw err;
            });
    }

    return (
        <section id='auth' className='flex flex-col justify-center items-center h-full gap-8'>
            <h3>Log out</h3>
        </section>
    );
}

export default Logout;
