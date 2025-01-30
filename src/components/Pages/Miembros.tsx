function Miembros() {
    return (
        <>
            <div className="flex-1 p-6">
                <div className="bg-yellow-300 p-6 text-center font-bold rounded-lg mb-6">
                    <h1 className="text-3xl">Miembros del equipo</h1>
                    <p className="text-lg">Nombre del equipo</p>
                </div>

                <div className="flex flex-wrap gap-6 justify-center mt-6">
                    <div className="bg-[#f3f1e7] p-6 rounded-lg text-center w-48 shadow-md">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Perfil de Diseñador" className="w-20 h-20 rounded-full border-4 border-yellow-200 object-cover mx-auto" />
                            <h3 className="text-xl mt-4">Lorem</h3>
                            <p className="text-gray-600">DISEÑADOR</p>
                            <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-700">Modificar</button>
                    </div>

                    <div className="bg-[#f3f1e7] p-6 rounded-lg text-center w-48 shadow-md">
                        <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Perfil de Analítico" className="w-20 h-20 rounded-full border-4 border-yellow-200 object-cover mx-auto" />
                            <h3 className="text-xl mt-4">Lorem</h3>
                            <p className="text-gray-600">ANALÍTICO</p>
                            <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-700">Modificar</button>
                    </div>

                    <div className="bg-[#f3f1e7] p-6 rounded-lg text-center w-48 shadow-md">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Perfil de Programador" className="w-20 h-20 rounded-full border-4 border-yellow-200 object-cover mx-auto" />
                            <h3 className="text-xl mt-4">Lorem</h3>
                            <p className="text-gray-600">PROGRAMADOR</p>
                            <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-700">Modificar</button>
                    </div>
                </div>

                <button className="w-full bg-black text-white py-3 mt-8 rounded-md hover:bg-gray-700 text-xl">Añadir nuevo miembro</button>
            </div>
        </>
    )
}

export default Miembros