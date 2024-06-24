import { useEffect, useState } from "react";
import Data from "./demo.json";

function Grip() {
    const [viewMode, setViewMode] = useState('Grip');

    const handleClick = (icon: string) => {
        setViewMode(icon);
    };

    return (
        <section id='Grip' className='flex flex-col gap-3 md:gap-4'>
            <div className="flex justify-between w-full mt-4">
                <input type="search" name="Hola" id="" placeholder="Buscar" />
                <div className="flex gap-3 md:gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="21"
                        viewBox="0 0 448 512"
                        onClick={() => handleClick('Grip')}
                        style={{ cursor: 'pointer', fill: viewMode === 'Grip' ? '#000' : '#AAA' }}><path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z" /></svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="21"
                        viewBox="0 0 448 512"
                        onClick={() => handleClick('List')}
                        style={{ cursor: 'pointer', fill: viewMode === 'List' ? '#000' : '#AAA' }}><path d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z" /></svg>
                </div>

            </div>
            <div>
                {viewMode === 'List' ? (
                    <ul className="List">
                        {Data.map(item => (
                            <li key={item.id} className="border flex">
                                <div className="p-4 grid place-items-center">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                    </svg>
                                </div>
                                <div className="flex-1 flex gap-2 text-gray-800 dark:text-white">
                                    <div>
                                        <a className="text-blue-400" href={item.short}>{item.short}</a>
                                        <p>URL: {item.url}</p>
                                    </div>
                                    <p>{item.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3">
                        {Data.map(item => (
                            <div key={item.id} className="border text-gray-800 dark:text-white border-gray-200 dark:border-neutral-700 rounded-lg p-4">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                </svg>
                                <a className="text-blue-400" href={item.short}>{item.short}</a>
                                <p>URL: {item.url}</p>
                                <p>{item.date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
}

export default Grip;
