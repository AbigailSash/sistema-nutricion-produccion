import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import api from '../../api/client';
import { fetchMe } from '../../features/auth/authSlice';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import FotoPerfilModal from '../common/FotoPerfilModal';
import { toast } from 'react-toastify';

function ConfiguracionUsuario() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        matricula: '',
        telefono: '',
    });
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [linkingStatus, setLinkingStatus] = useState('idle');
    const [linkingError, setLinkingError] = useState(null);

    useEffect(() => {
        dispatch(fetchMe());
    }, [dispatch]);

    useEffect(() => {
        if (user && user.nutricionista) {
            setFormData({
                nombre: user.nutricionista.nombre || '',
                apellido: user.nutricionista.apellido || '',
                matricula: user.nutricionista.matricula || '',
                telefono: user.nutricionista.telefono || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoSave = async (file) => {
        setUploadingPhoto(true);
        try {
            const data = new FormData();
            data.append('foto_perfil', file);

            const response = await api.patch('/api/user/nutricionistas/me/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                dispatch(fetchMe());
                setIsPhotoModalOpen(false);
                toast.success('✨ Foto de perfil actualizada con éxito', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                const errorData = response.data || {};
                toast.error(`Error al actualizar: ${JSON.stringify(errorData)}`, {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error updating photo:', error);
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            toast.error(`Ocurrió un error al actualizar la foto: ${errorMessage}`, {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch('/api/user/nutricionistas/me/', formData);
            if (response.status === 200) {
                dispatch(fetchMe());
                toast.success('✅ Perfil actualizado correctamente', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                const errorData = response.data || {};
                toast.error(`Error al actualizar: ${JSON.stringify(errorData)}`, {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            toast.error(`Ocurrió un error al actualizar el perfil: ${errorMessage}`, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    const handleLinkGoogleSuccess = async (tokenResponse) => {
        setLinkingStatus('loading');
        setLinkingError(null);
        
        console.log('Google token recibido:', tokenResponse);
        
        try {
            const response = await api.post('/api/user/link-google/', {
                access_token: tokenResponse.access_token
            });
            
            if (response.status === 200) {
                dispatch(fetchMe());
                setLinkingStatus('success');
                toast.success(response.data.message || '🔗 Cuenta de Google vinculada con éxito', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error linking Google account:', error);
            setLinkingStatus('failed');
            const errorMsg = error.response?.data?.error || error.message || 'Error al vincular cuenta de Google';
            setLinkingError(errorMsg);
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleLinkGoogleSuccess,
        onError: (error) => {
            console.error("Google Sign-In Error during linking:", error);
            setLinkingStatus('failed');
            setLinkingError('Hubo un problema con la autenticación de Google.');
            toast.error('Hubo un problema con la autenticación de Google', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    });

    const handleLinkGoogle = () => {
        console.log('Intentando vincular Google...');
        try {
            googleLogin();
        } catch (error) {
            console.error('Error al llamar googleLogin:', error);
            toast.error('Error al iniciar el proceso de vinculación', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    const handleUnlinkGoogle = async () => {
        try {
            const response = await api.post('/api/user/disconnect/google-oauth2/');

            if (response.status === 200) {
                googleLogout();
                dispatch(fetchMe());
                toast.success('🔓 Cuenta de Google desvinculada con éxito', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                const errorData = response.data || {};
                toast.error(`Error al desvincular: ${JSON.stringify(errorData)}`, {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error during Google account disconnection:', error);
            const errorMessage = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            toast.error(`Ocurrió un error al intentar desvincular la cuenta: ${errorMessage}`, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    const googleAccount = user?.google_account;

    return (
        <div className="space-y-8">
            {/* Modal de Foto de Perfil */}
            <FotoPerfilModal
                isOpen={isPhotoModalOpen}
                onClose={() => setIsPhotoModalOpen(false)}
                onSave={handlePhotoSave}
                currentPhoto={user?.nutricionista?.foto_perfil}
                uploading={uploadingPhoto}
            />

            {/* Foto de Perfil */}
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Foto de Perfil</h2>
                <div className="flex items-center space-x-6">
                    {/* Preview de la foto */}
                    <div className="relative">
                        {user?.nutricionista?.foto_perfil ? (
                            <img
                                src={user.nutricionista.foto_perfil}
                                alt="Foto de perfil"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    
                    {/* Controles */}
                    <div className="flex-1">
                        <button
                            type="button"
                            onClick={() => setIsPhotoModalOpen(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            {user?.nutricionista?.foto_perfil ? 'Cambiar foto' : 'Subir foto'}
                        </button>
                        <p className="text-sm text-gray-500 mt-2">
                            JPG, PNG o GIF (máx. 5MB)
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulario de Información Personal */}
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input type="text" name="apellido" id="apellido" value={formData.apellido} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Matrícula</label>
                            <input type="text" name="matricula" id="matricula" value={formData.matricula} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="text" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
                            <input type="text" name="dni" id="dni" value={user?.dni || ''} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" value={user?.email || ''} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Guardar Cambios</button>
                    </div>
                </form>
            </div>

            {/* Cuentas Vinculadas */}
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Cuentas Vinculadas</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-semibold">Cuenta de Google</p>
                            {googleAccount ? (
                                <p className="text-sm text-gray-600">
                                    Conectado como: {googleAccount.extra_data?.email || 'N/A'}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">No vinculada</p>
                            )}
                        </div>
                        {googleAccount ? (
                            <button
                                onClick={handleUnlinkGoogle}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Desvincular
                            </button>
                        ) : (
                            <button
                                onClick={handleLinkGoogle}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Vincular cuenta de Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracionUsuario;
