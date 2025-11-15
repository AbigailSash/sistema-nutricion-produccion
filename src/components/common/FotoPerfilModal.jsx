import { useState, useRef } from 'react';
import Modal from '../common/Modal';

/**
 * Modal para subir/cambiar foto de perfil
 */
export default function FotoPerfilModal({ isOpen, onClose, onSave, currentPhoto, uploading = false }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(currentPhoto);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');

        // Validar tipo
        if (!file.type.startsWith('image/')) {
            setError('Por favor selecciona un archivo de imagen válido');
            return;
        }

        // Validar tamaño (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen no debe superar 5MB');
            return;
        }

        setSelectedFile(file);

        // Crear preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreview(currentPhoto);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSave = () => {
        if (!selectedFile) {
            setError('Por favor selecciona una imagen');
            return;
        }
        onSave(selectedFile);
    };

    const handleCancel = () => {
        handleRemove();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel} title="Foto de Perfil" size="md">
            <div className="space-y-6">
                {/* Preview de la foto */}
                <div className="flex justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                        />
                    ) : (
                        <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-lg">
                            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Información del archivo seleccionado - solo mostrar si hay error de tamaño */}
                {selectedFile && selectedFile.size > 5 * 1024 * 1024 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-red-800">Imagen muy grande</p>
                                <p className="text-xs text-red-600">
                                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB) - Máximo permitido: 5MB
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error message - solo para otros tipos de error */}
                {error && !(selectedFile && selectedFile.size > 5 * 1024 * 1024) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Botón de selección */}
                <div className="space-y-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="modal-foto-input"
                    />
                    <label
                        htmlFor="modal-foto-input"
                        className="w-full inline-flex justify-center items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors font-medium"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {selectedFile ? 'Cambiar imagen' : 'Seleccionar imagen'}
                    </label>
                    <p className="text-xs text-gray-500 text-center">
                        JPG, PNG o GIF • Máximo 5MB
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleCancel}
                        disabled={uploading}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedFile || uploading}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {uploading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Guardando...
                            </>
                        ) : (
                            'Aplicar cambios'
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
