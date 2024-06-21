import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import Grip from '../../components/grip/grip';

function Dashboard() {
    const [userState, setUserState] = useState(localStorage.getItem("user"));
    useEffect(()=>{
        if(userState === null){
            setTimeout(() => {
                window.location.reload();
            }, 300); 
        }
        
    },[])
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await handleUser();
                if (user) {
                    const userJSON = JSON.stringify(user);
                    localStorage.setItem('user', userJSON);
                }
            } catch (err) {
                throw new Error('Err:');
            };
        }
        fetchUser();
    }, [])

    const handleUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/profile', {
                method: 'GET',
                credentials: "include",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <section id='dashboard'>
        </section>
    );
}

export default Dashboard;
