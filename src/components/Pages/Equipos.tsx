function Equipos() {
    return (
        <>
            <div className="flex-1 p-6 ">
                <div className="bg-yellow-300 p-5 text-center font-bold rounded-lg text-3xl">Equipos activos</div>
                <div className="flex flex-wrap gap-15 mt-5 justify-center">
                    <div className="bg-gray-200 p-5 rounded-lg text-center w-64">
                        <h3 className="font-bold">Nombre del equipo</h3>
                        <p>Proyecto asignado</p>
                        <p>Número de miembros</p>
                        <p>Recursos asignados</p>
                        <button className="bg-black text-white px-4 py-2 mt-3 rounded">Ver más detalles</button>
                        <p className="text-sm text-gray-500 mt-2">Trabajando desde 00/00/00</p>
                    </div>
                    <div className="bg-gray-200 p-5 rounded-lg text-center w-64">
                        <h3 className="font-bold">Nombre del equipo</h3>
                        <p>Proyecto asignado</p>
                        <p>Número de miembros</p>
                        <p>Recursos asignados</p>
                        <button className="bg-black text-white px-4 py-2 mt-3 rounded">Ver más detalles</button>
                        <p className="text-sm text-gray-500 mt-2">Trabajando desde 00/00/00</p>
                    </div>
                    <div className="bg-gray-200 p-5 rounded-lg text-center w-64">
                        <h3 className="font-bold">Nombre del equipo</h3>
                        <p>Proyecto asignado</p>
                        <p>Número de miembros</p>
                        <p>Recursos asignados</p>
                        <button className="bg-black text-white px-4 py-2 mt-3 rounded">Ver más detalles</button>
                        <p className="text-sm text-gray-500 mt-2">Trabajando desde 00/00/00</p>
                    </div>
                </div>
                <button className="block bg-black text-white px-6 py-3 mt-5 mx-auto rounded">Crear nuevo equipo</button>
            </div>
        </>
    )
}

export default Equipos