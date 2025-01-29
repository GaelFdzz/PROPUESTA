function Proyectos() {
    return (
        <>
            <div className="w-4/5 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Proyectos activos</h2>
                    <div className="bg-yellow-300 p-6 rounded-xl">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2">Nombre del proyecto</th>
                                    <th className="py-2">Equipos asignados</th>
                                    <th className="py-2">Fecha de inicio</th>
                                    <th className="py-2">Recursos asignados</th>
                                    <th className="py-2 text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2">Proyecto 1</td>
                                    <td>Equipo A</td>
                                    <td>01/01/2023</td>
                                    <td>3 recursos</td>
                                    <td className="text-center text-blue-600 cursor-pointer">Editar</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Proyecto 2</td>
                                    <td>Equipo B</td>
                                    <td>15/02/2023</td>
                                    <td>5 recursos</td>
                                    <td className="text-center text-blue-600 cursor-pointer">Editar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Proyectos terminados</h2>
                    <div className="bg-yellow-300 p-6 rounded-xl">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2">Nombre del proyecto</th>
                                    <th className="py-2">Fecha de culminación</th>
                                    <th className="py-2 text-center">Ver detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2">Proyecto X</td>
                                    <td>10/12/2022</td>
                                    <td className="text-center text-blue-600 cursor-pointer">Detalles</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Proyecto Y</td>
                                    <td>20/11/2022</td>
                                    <td className="text-center text-blue-600 cursor-pointer">Detalles</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a href="#" className="text-blue-600 mt-4 block">Ver todos los proyectos terminados</a>
                </div>

                <a href="#" className="bg-black text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-800">Iniciar nuevo proyecto</a>
            </div>
        </>
    )
}
export default Proyectos