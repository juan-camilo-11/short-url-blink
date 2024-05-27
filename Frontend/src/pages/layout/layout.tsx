import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Layout({ children }: any) {

    return (
        <section className='flex flex-col w-100 h-screen min-h-screen'>
            <Header />
            <main className='flex-grow bg-slate-50 dark:bg-neutral-800 px-3'>
                <div className='max-w-5xl mx-auto h-full'>
                    {children}
                </div>
            </main>
            <Footer />
        </section>
    );
}

export default Layout;
