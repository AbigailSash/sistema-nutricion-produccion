import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPacientes, desasignarPaciente } from "../../../features/nutri/nutriSlice";
import { Link } from "react-router-dom";
import EditarPacienteModal from "../../../components/pacientes/EditarPacienteModal";
import { toast } from "react-toastify";

export default function PacientesList() {
    const dispatch = useDispatch();
    const { items: pacientes, status, error } = useSelector((s) => s.nutri);
    const [editingPaciente, setEditingPaciente] = useState(null);

    useEffect(() => {
        dispatch(fetchPacientes());
    }, [dispatch]);

    const handleEdit = (paciente) => {
        setEditingPaciente(paciente);
    };

    const handleDelete = async (paciente) => {
        if (!window.confirm(`¿Estás seguro de que deseas desasignar a ${paciente.nombre || ''} ${paciente.apellido || ''}?\n\nEl paciente permanecerá en la base de datos pero ya no aparecerá en tu lista.`)) {
            return;
        }

        try {
            await dispatch(desasignarPaciente(paciente.id)).unwrap();
            toast.success("✅ Paciente desasignado correctamente", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            const errorMessage = error?.detail || error?.message || "Error al desasignar paciente";
            toast.error(`❌ ${errorMessage}`, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    if (status === "loading")
        return <p className="text-gray-500">Cargando pacientes…</p>;

    if (status === "failed")
        return (
        <p className="text-red-600">
            {error?.detail || "Error al cargar pacientes"}
        </p>
        );

    return (
        <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
        <div className="overflow-x-auto">
        <table className="w-full border text-sm bg-white rounded-lg shadow-sm">
            <thead>
            <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">DNI</th>
                <th className="p-3 border-b">Nombre</th>
                <th className="p-3 border-b">Edad</th>
                <th className="p-3 border-b">Teléfono</th>
                <th className="p-3 border-b">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {pacientes.length === 0 ? (
                <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                    No hay pacientes asignados
                </td>
                </tr>
            ) : (
                pacientes.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-b">{p.dni}</td>
                    <td className="p-3 border-b font-medium">
                    {p.nombre || ""} {p.apellido || ""}
                    </td>
                    <td className="p-3 border-b">{p.edad || "-"}</td>
                    <td className="p-3 border-b">{p.telefono || "-"}</td>
                    <td className="p-3 border-b">
                    <div className="flex gap-2 flex-wrap">
                        <Link
                        to={`/panel/nutri/pacientes/${p.id}/seguimientos`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors shadow-sm"
                        title="Ver seguimientos del paciente"
                        >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Ver Seguimientos
                        </Link>
                        <Link
                        to={`/panel/nutri/seguimientos/${p.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors shadow-sm"
                        title="Crear nuevo seguimiento"
                        >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        + Nuevo Seguimiento
                        </Link>
                        <button
                        onClick={() => handleEdit(p)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors shadow-sm border border-yellow-300"
                        title="Editar datos del paciente"
                        >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                        </button>
                        <button
                        onClick={() => handleDelete(p)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors shadow-sm border border-red-300"
                        title="Desasignar paciente (permanece en la base de datos)"
                        >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                        </button>
                    </div>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>

        {/* Modal de edición */}
        <EditarPacienteModal
            paciente={editingPaciente}
            isOpen={!!editingPaciente}
            onClose={() => setEditingPaciente(null)}
        />
        </div>
    );
}
