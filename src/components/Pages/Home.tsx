function Home() {
    return (
        <>
            <div className="p-6 space-y-6  min-h-screen flex flex-col items-center">
                {/* Resumen de proyectos */}
                <div className="bg-yellow-300 p-6 rounded-2xl shadow-md w-full max-w-4xl">
                    <h2 className="text-3xl font-bold text-center">Resumen de proyectos</h2>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="bg-white p-6 rounded-xl shadow text-center w-48">
                            <p className="text-sm font-medium">Proyectos activos</p>
                            <p className="text-2xl font-bold">7</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow text-center w-48">
                            <p className="text-sm font-medium">Proyectos completados</p>
                            <p className="text-2xl font-bold">22</p>
                        </div>
                    </div>
                </div>

                {/* Resumen de equipos y recursos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <div className="bg-yellow-300 p-6 rounded-2xl shadow-md">
                        <h2 className="text-3xl font-bold text-center">Resumen de equipos</h2>
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <div className="bg-white p-4 rounded-xl shadow text-center w-40">
                                <p className="text-sm font-medium">Equipos totales</p>
                                <p className="text-2xl font-bold">15</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow text-center w-40">
                                <p className="text-sm font-medium">Equipos activos</p>
                                <p className="text-2xl font-bold">7</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow text-center w-40">
                                <p className="text-sm font-medium">Total de miembros</p>
                                <p className="text-2xl font-bold">89</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-300 p-6 rounded-2xl shadow-md">
                        <h2 className="text-3xl font-bold text-center">Resumen de recursos</h2>
                        <div className="bg-white p-4 rounded-xl shadow mt-4">
                            <p className="text-sm font-medium text-center">Recursos más usados</p>
                            <ul className="list-disc list-inside mt-2 text-sm">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow mt-4">
                            <p className="text-sm font-medium text-center">Disponibilidad de recursos más usados</p>
                            <ul className="list-disc list-inside mt-2 text-sm">
                                <li>Lorem ipsum: 13</li>
                                <li>Lorem ipsum: 29</li>
                                <li>Lorem ipsum: 4</li>
                                <li>Lorem ipsum: 120</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home