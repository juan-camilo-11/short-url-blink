function Footer() {
    return (
        <footer className='w-100 bg-slate-100 py-5 dark:bg-neutral-800 px-3'>
            <div className="w-full p-2 md:flex md:items-center md:justify-between max-w-5xl mx-auto">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Juan Romero.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="https://github.com/juan-camilo-11" target='_blank' rel="noopener noreferrer" className="hover:underline me-4 md:me-6">Github</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/juan-camilo-romero-martin-501202219/" target='_blank' rel="noopener noreferrer" className="hover:underline me-4 md:me-6">Contacto</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
