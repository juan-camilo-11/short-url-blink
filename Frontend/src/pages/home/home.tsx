import React, { useEffect, useState } from 'react';
import "./home.css";

const steps = {
    Initial: 'initial',
    WriteLink: 'writeLink',
    GenerateLink: 'generateLink',
    Finish: 'finish'
}

function Home() {
    const [currentStep, setCurrentStep] = useState(steps.Initial);

    const handlePureClick = () => {
        if (currentStep === steps.Initial) {
            setCurrentStep(steps.WriteLink)
        } else if (currentStep === steps.WriteLink) {
            setCurrentStep(steps.GenerateLink)
        } else if (currentStep === steps.GenerateLink) {
            setCurrentStep(steps.Finish)
        } else {
            setCurrentStep(steps.Initial)
        }
    };

    useEffect(() => {
        const pureButton = document.querySelector("pure-button");
        pureButton?.addEventListener("onPureClick", handlePureClick);

        return () => {
            pureButton?.removeEventListener("onPureClick", handlePureClick);
        };
    }, [currentStep]);

    return (
        <section id='home' className='flex flex-col justify-center items-center h-full gap-12'>
            <div className='flex flex-col justify-center items-start gap-3 md:items-center transition duration-300 ease-in-out'>
                <h1 className='text-gray-900 dark:text-white text-5xl'>Atajos simples para viajes rápidos.</h1>
                <p className='text-gray-800 dark:text-white max-w-xl text-center'>Simplifica la forma en que compartes enlaces en línea con nuestra herramienta de acortamiento de URLs, rápida y fácil de usar.</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                {currentStep === steps.Initial && (
                    <div>
                        <pure-button text="¡Experimenta la simplicidad!"></pure-button>
                    </div>
                )}
                {currentStep === steps.WriteLink && (
                    <div className='w-11/12 md:w-2/4 flex flex-col gap-3'>
                        <pure-input message="" placeholder="Ingresa link"></pure-input>
                        <pure-button text="Generar"></pure-button>
                    </div>
                )}
                {currentStep === steps.GenerateLink && (
                    <div className='w-11/12 md:w-3/4 flex flex-col gap-3'>
                        <p className='text-gray-900 dark:text-white'>Generando...</p><pure-button text="Generar"></pure-button>
                    </div>
                )}
                {currentStep === steps.Finish && (
                    <div className='w-11/12 md:w-3/4 flex flex-col gap-3'>
                        <pure-copy></pure-copy>
                        <p className='text-gray-700 dark:text-white text-sm'>Este link no ha sido generado, solo es una prueba, <a href="#" className='underline'>Empieza aquí.</a></p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Home;
