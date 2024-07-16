import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import Modal from '../../components/modal/modal';
import { Delete, Get, Patch, Post } from '../../service/http';

interface ModalData {
    _id: string;
    url: string;
    googleId: string;
    shortUrl: string;
    date: string;
    status: string;
    clicks: string;
}

function Dashboard() {
    const [userState, setUserState] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [modalRegister, setModalRegister] = useState(false);
    const [modalViewDetailing, setModalViewDetailing] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [error, setError] = useState("");

    const [modalData, setModalData] = useState<ModalData | null>(null);

    const [urlData, setUrlData] = useState<any[]>([]);

    const toggleModalRegister = () => {
        setModalRegister(!modalRegister);
    };

    const toggleModalEdit = (shortUrl?: string) => {
        if (shortUrl) {
            const data = urlData.find(item => item.shortUrl === shortUrl);
            setModalData(data);
        }
        setModalEdit(!modalEdit);
    };

    const toggleModalViewDetailing = (shortUrl?: string) => {
        if (shortUrl) {
            const data = urlData.find(item => item.shortUrl === shortUrl);
            setModalData(data);
        }
        setModalViewDetailing(!modalViewDetailing);
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const url = formData.get('url');
        const pathUrl = `${process.env.REACT_APP_BASE_URL_BACKEND}/url`;
        const { googleId } = userState.user;
        const data = {
            googleId: googleId,
            url: url
        };

        const response = await Post(pathUrl, data);
        if (response === "Exitoso") {
            toggleModalRegister();
            fetchUrls();
        }
        else {
            setError(response.error)
        }
    };
    const handleSubmitDelete = async () => {
        const confirmed = false;
        if (!confirmed) {
            alert("Estas seguro?")
        }
        if (!modalData) {
            return null;
        }

        const options = {
            headers: {
                'x-url-id': modalData._id,
            },
        };

        const pathUrl = `${process.env.REACT_APP_BASE_URL_BACKEND}/url`;
        const response = await Delete(pathUrl, options);
        if (response) {
            toggleModalEdit();
            fetchUrls();
        }
    };
    const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (!modalData) {
            return null;
        }

        const newUrl = {
            url: formData.get('url'),
            status: formData.get('status'),
            shortUrl: modalData.shortUrl,
            googleId: modalData.googleId,
            date: modalData.date,
            clicks: modalData.clicks
        }

        const options = {
            headers: {
                'x-url-id': modalData._id,
            },
        };

        const pathUrl = `${process.env.REACT_APP_BASE_URL_BACKEND}/url`;
        const response = await Patch(pathUrl, options, newUrl);
        if (response) {
            toggleModalEdit();
            fetchUrls();
        }
    };

    const fetchUrls = async () => {
        try {
            const { googleId } = userState.user;
            const pathUrl = `${process.env.REACT_APP_BASE_URL_BACKEND}/url`;
            const options = {
                headers: {
                    'X-Google-ID': googleId,
                },
            };
            const data = await Get(pathUrl, options);
            setUrlData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (error !== "") {
            alert(error)
        }
    }, [error])

    return (
        <section id='dashboard' className='h-full w-full grid place-items-center'>
            {urlData.length === 0 ?
                <div>
                    <div onClick={toggleModalRegister} className='p-10 bg-neutral-300 rounded-full inline-block hover:bg-neutral-400 transition-all dark:bg-neutral-700  dark:hover:bg-neutral-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512" className='fill-black dark:fill-white'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </div>
                    <h2 className='text-gray-800 dark:text-white max-w-xl md:text-center'>Empieza Ahora</h2>
                </div> :
                <div>
                    <div className='text-gray-500 dark:text-gray-200'>
                        <button onClick={toggleModalRegister} data-modal-target="default-modal" data-modal-toggle="create-modal" className="inline-block p-4 hover:underline" type="button">
                            Agregar +
                        </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-900 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ShortUrl
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Clicks
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {urlData ? (
                                    urlData.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-neutral-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <a href={`${process.env.REACT_APP_BASE_URL}/${item.shortUrl}`} className="hover:underline">/{item.shortUrl}</a>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p>{process.env.URL}</p>
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.date}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.clicks}
                                            </td>
                                            <td className="px-6 py-4 text-right flex gap-3">
                                                <button onClick={() => toggleModalViewDetailing(item.shortUrl)} className="font-medium hover:underline" type="button">
                                                    Detalles
                                                </button>
                                                <button onClick={() => toggleModalEdit(item.shortUrl)} className="font-medium hover:underline" type="button">
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-6 py-4 text-center">
                                            Cargando...
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            }
            {modalRegister && (
                <Modal toggleModal={toggleModalRegister} textButton="Cerrar" title="Agregar Nuevo">
                    <form onSubmit={handleSubmit}>
                        <input className='border p-2 w-full dark:bg-neutral-800 dark:text-white' type="text" placeholder='Ingrese Url' name='url' />
                        <div className='flex justify-end'>
                            <button className="text-white font-semibold my-3 px-4 py-2 rounded-md dark:text-white" type='submit'>Registrar</button>
                        </div>
                    </form>
                </Modal>
            )}
            {modalViewDetailing && (
                <Modal toggleModal={toggleModalViewDetailing} textButton="Cerrar" title="Detalles">
                    <div>
                        {modalData ? (
                            <div className='dark:text-white p-2'>
                                <h3>Url: <span className='text-gray-600 dark:text-gray-400'>{modalData.url}</span></h3>
                                <p>shortUrl: <span className='text-gray-600 dark:text-gray-400'>{modalData.shortUrl}</span></p>
                                <p>date: <span className='text-gray-600 dark:text-gray-400'>{modalData.date}</span></p>
                                <p>estado: <span className='text-gray-600 dark:text-gray-400'>{modalData.status}</span></p>
                                <p>clicks: <span className='text-gray-600 dark:text-gray-400'>{modalData.clicks}</span></p>
                            </div>
                        ) : (
                            <p>Cargando detalles...</p>
                        )}
                    </div>
                </Modal>
            )}

            {modalEdit && (
                <Modal toggleModal={toggleModalEdit} textButton="Cerrar" title="Editar">
                    <form onSubmit={handleSubmitEdit} className='flex flex-col gap-3'>
                        <input className='border p-2 w-full dark:bg-neutral-800 dark:text-white' type="text" placeholder='Ingrese Url' name='url' />
                        <div className='flex items-center text-gray-700 dark:text-white gap-3'>
                            <label className="block mb-2">Estado:</label>
                            <select className="border p-2 dark:bg-neutral-800 flex-1" name='status'>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <button className="secondary text-white my-3 px-4 py-2 rounded-md dark:text-white" type='button' onClick={handleSubmitDelete}>Eliminar</button>
                            <button className="text-white font-semibold my-3 px-4 py-2 rounded-md dark:text-white" type='submit'>Editar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </section>
    );
}

export default Dashboard;
