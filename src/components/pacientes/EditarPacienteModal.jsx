import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePaciente } from "../../features/nutri/nutriSlice";
import { toast } from "react-toastify";

export default function EditarPacienteModal({ paciente, isOpen, onClose }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fecha_nacimiento: "",
        genero: "M",
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (paciente) {
            setFormData({
                nombre: paciente.nombre || "",
                apellido: paciente.apellido || "",
                telefono: paciente.telefono || "",
                fecha_nacimiento: paciente.fecha_nacimiento || "",
                genero: paciente.genero || "M",
            });
        }
    }, [paciente]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await dispatch(updatePaciente({ id: paciente.id, data: formData })).unwrap();
            toast.success("✅ Paciente actualizado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });
            onClose();
        } catch (error) {
            const errorMessage = error?.detail || error?.message || "Error al actualizar paciente";
            toast.error(`❌ ${errorMessage}`, {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen || !paciente) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Editar Paciente</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isSaving}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            value={paciente.dni}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">El DNI no se puede modificar</p>
                    </div>

                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido *
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                            Género
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

