import { useEffect } from 'react';
import './notification.css';

interface notificationProps {
    title: string;
    text: string;
    type: "error" | "info" | "success";
    onClose: () => void;
    show: boolean;
}

function Notification({ title, text, type, onClose, show }: notificationProps) {
    const getTypeClass = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'info':
                return 'bg-blue-100 text-blue-800';
            default:
                return '';
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`notification ${show ? 'show' : 'hide'} ${getTypeClass()}`}
        >
            <strong>{title}</strong>
            <p>{text}</p>
        </div>

    );
}

export default Notification;
