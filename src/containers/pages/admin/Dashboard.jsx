import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api/client';

export default function DashboardAdmin() {
    const navigate = useNavigate();
    const user = useSelector(state => state?.user?.user);
    const [adminProfile, setAdminProfile] = useState(null);
    const [stats, setStats] = useState({
        totalNutricionistas: 0,
        totalPacientes: 0,
        totalConsultas: 0,
        turnosPendientes: 0,
        nutricionistasActivos: 0,
        pacientesNuevos: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            const response = await api.get('/api/user/administrador/me/');
            if (response.status === 200) {
                setAdminProfile(response.data);
            }
        } catch (error) {
            console.error('Error fetching admin profile:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('access');
            if (!token) {
                console.log('No token found');
                setLoading(false);
                return;
            }
            
            const headers = { 'Authorization': `JWT ${token}` };
            
            // Fetch nutricionistas
            const nutriRes = await fetch('http://localhost:8000/api/user/nutricionistas/', { headers }).catch(() => null);
            const nutriData = nutriRes && nutriRes.ok ? await nutriRes.json() : [];
            
            // Fetch pacientes
            const pacRes = await fetch('http://localhost:8000/api/user/pacientes/', { headers }).catch(() => null);
            const pacData = pacRes && pacRes.ok ? await pacRes.json() : [];

            // Fetch turnos
            const turnosRes = await fetch('http://localhost:8000/api/agenda/turnos/', { headers }).catch(() => null);
            const turnosData = turnosRes && turnosRes.ok ? await turnosRes.json() : [];

            const nutricionistas = Array.isArray(nutriData) ? nutriData : [];
            const pacientes = Array.isArray(pacData) ? pacData : [];
            const turnos = Array.isArray(turnosData) ? turnosData : [];

            setStats({
                totalNutricionistas: nutricionistas.length,
                totalPacientes: pacientes.length,
                totalConsultas: turnos.filter(t => t.estado === 'confirmado').length,
                turnosPendientes: turnos.filter(t => t.estado === 'pendiente').length,
                nutricionistasActivos: nutricionistas.filter(n => n.user?.is_active).length,
                pacientesNuevos: pacientes.filter(p => {
                    const created = new Date(p.user?.date_joined || p.created_at);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return created > thirtyDaysAgo;
                }).length
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, subtitle, icon, color, onClick }) => (
        <div 
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${color} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{loading ? '...' : value}</p>
                    {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('500', '100')}`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    const ActivityCard = ({ title, items }) => (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay actividad reciente</p>
                ) : (
                    items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const recentActivity = [
        { title: 'Nuevo paciente registrado', subtitle: 'María González', color: 'bg-green-500', time: 'Hace 2h' },
        { title: 'Turno confirmado', subtitle: 'Dr. Martínez - Juan Pérez', color: 'bg-blue-500', time: 'Hace 4h' },
        { title: 'Nutricionista activado', subtitle: 'Lic. Laura Rodríguez', color: 'bg-purple-500', time: 'Hace 1d' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
                <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
                <p className="text-green-100">
                    Bienvenido/a {adminProfile?.full_name || user?.email || 'Administrador'}
                </p>
                <p className="text-sm text-green-200 mt-1">Gestiona el sistema completo desde aquí</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Nutricionistas Totales"
                    value={stats.totalNutricionistas}
                    subtitle={`${stats.nutricionistasActivos} activos`}
                    color="border-green-500"
                    onClick={() => navigate('/panel/admin/nutricionistas')}
                    icon={
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Pacientes Totales"
                    value={stats.totalPacientes}
                    subtitle={`${stats.pacientesNuevos} nuevos este mes`}
                    color="border-blue-500"
                    icon={
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Consultas Realizadas"
                    value={stats.totalConsultas}
                    subtitle="Total confirmadas"
                    color="border-purple-500"
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Turnos Pendientes"
                    value={stats.turnosPendientes}
                    subtitle="Requieren atención"
                    color="border-yellow-500"
                    icon={
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Sistema Activo"
                    value="100%"
                    subtitle="Todos los servicios operativos"
                    color="border-emerald-500"
                    icon={
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Configuración"
                    value="✓"
                    subtitle="Accede a ajustes del sistema"
                    color="border-gray-500"
                    onClick={() => navigate('/panel/admin/configuracion')}
                    icon={
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityCard title="Actividad Reciente" items={recentActivity} />

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/panel/admin/nutricionistas/crear')}
                            className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <span className="text-sm font-medium text-green-800">Crear Nutricionista</span>
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => navigate('/panel/admin/nutricionistas')}
                            className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <span className="text-sm font-medium text-blue-800">Ver Nutricionistas</span>
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button
                            onClick={() => navigate('/panel/admin/configuracion')}
                            className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                            <span className="text-sm font-medium text-purple-800">Configuración del Sistema</span>
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* System Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">NutriSalud - Sistema de Gestión</h3>
                        <p className="text-xs text-gray-500 mt-1">Versión 1.0.0 - Panel de Administración</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600">Sistema Operativo</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
