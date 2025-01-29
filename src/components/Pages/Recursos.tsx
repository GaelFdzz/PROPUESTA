function Recursos() {
    return (
        <>
            <div className="w-4/5 p-8 overflow-y-auto">
                <h2 className="text-xl font-bold text-center bg-yellow-300 p-4 rounded-lg mb-8">Recursos disponibles</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
                        <div className="text-4xl mb-4">📄</div>
                        <h3 className="text-lg font-bold mb-2">Recursos Materiales</h3>
                        <p className="text-sm text-gray-600 mb-4">Recurso más usado</p>
                        <button className="w-full bg-white border border-black py-2 rounded-lg hover:bg-yellow-300">Ver todos los recursos</button>
                        <button className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800">Añadir nuevo recurso</button>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
                        <div className="text-4xl mb-4">👤</div>
                        <h3 className="text-lg font-bold mb-2">Recursos Personales</h3>
                        <p className="text-sm text-gray-600 mb-4">Recurso más usado</p>
                        <button className="w-full bg-white border border-black py-2 rounded-lg hover:bg-yellow-300">Ver todos los recursos</button>
                        <button className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800">Añadir nuevo recurso</button>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
                        <div className="text-4xl mb-4">💾</div>
                        <h3 className="text-lg font-bold mb-2">Recursos Software</h3>
                        <p className="text-sm text-gray-600 mb-4">Recurso más usado</p>
                        <button className="w-full bg-white border border-black py-2 rounded-lg hover:bg-yellow-300">Ver todos los recursos</button>
                        <button className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800">Añadir nuevo recurso</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recursos