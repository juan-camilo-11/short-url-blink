import './modal.css'
function Modal({ toggleModal, title, children, textButton }: any) {
    return (
        <section id='modal'>
            <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/10">
                <div className="w-3/4 absolute bg-white rounded-lg shadow-lg p-4 md:p-5 max-w-md mx-auto dark:bg-neutral-800">
                    <div className="flex items-center justify-between border-b-2 pb-2 gap-3 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <button onClick={toggleModal} className="text-gray-400 hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-200 transition">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-4 w-full">
                        {/** Contenido */}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Modal;
