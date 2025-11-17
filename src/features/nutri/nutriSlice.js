import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/client";

// --- Traer todos los pacientes asignados al nutricionista ---
export const fetchPacientes = createAsyncThunk(
    "nutri/fetchPacientes",
    async (_, { rejectWithValue }) => {
        try {
        const { data } = await api.get("/api/user/pacientes/");
        return data;
        } catch (err) {
        return rejectWithValue(
            err.response?.data || { detail: "Error al cargar pacientes" }
        );
        }
    }
    );

    // --- Traer un paciente por ID ---
    export const fetchPacienteById = createAsyncThunk(
    "nutri/fetchPacienteById",
    async (id, { rejectWithValue }) => {
        try {
        const { data } = await api.get(`/api/user/pacientes/${id}/`);
        return data;
        } catch (err) {
        return rejectWithValue(
            err.response?.data || { detail: "Error al cargar paciente" }
        );
        }
    }
    );

    // --- Actualizar un paciente ---
    export const updatePaciente = createAsyncThunk(
    "nutri/updatePaciente",
    async ({ id, data }, { rejectWithValue, dispatch }) => {
        try {
        const { data: updated } = await api.patch(`/api/user/pacientes/${id}/`, data);
        // Refrescar la lista después de actualizar
        dispatch(fetchPacientes());
        return { id, data: updated };
        } catch (err) {
        return rejectWithValue(
            err.response?.data || { detail: "Error al actualizar paciente" }
        );
        }
    }
    );

    // --- Desasignar un paciente (marcar como inactivo sin eliminar) ---
    export const desasignarPaciente = createAsyncThunk(
    "nutri/desasignarPaciente",
    async (id, { rejectWithValue, dispatch }) => {
        try {
        await api.delete(`/api/user/pacientes/${id}/desasignar/`);
        // Refrescar la lista después de desasignar
        dispatch(fetchPacientes());
        return id;
        } catch (err) {
        return rejectWithValue(
            err.response?.data || { detail: "Error al desasignar paciente" }
        );
        }
    }
    );

    // --- Crear solo un paciente sin consulta ---
    export const crearPaciente = createAsyncThunk(
    "nutri/crearPaciente",
    async (data, { rejectWithValue, dispatch }) => {
        try {
        // Mapear first_name y last_name a nombre y apellido
        const payload = {
            dni: data.dni,
            email: data.email || "",
            nombre: data.first_name || "",
            apellido: data.last_name || "",
            telefono: data.telefono || "",
            fecha_nacimiento: data.fecha_nacimiento || null,
            genero: data.genero || "M",
        };
        
        const { data: response } = await api.post("/api/user/pacientes/crear/", payload);
        // Refrescar la lista después de crear
        dispatch(fetchPacientes());
        return response;
        } catch (err) {
        return rejectWithValue(
            err.response?.data || { detail: "Error al crear paciente" }
        );
        }
    }
    );

    const slice = createSlice({
    name: "nutri",
    initialState: {
        items: [], // lista de pacientes
        selected: null, // paciente actual (detalle)
        status: "idle",
        error: null,
    },
    reducers: {
        clearSelected(state) {
        state.selected = null;
        },
    },
    extraReducers: (b) => {
        // --- Listado ---
        b.addCase(fetchPacientes.pending, (st) => {
        st.status = "loading";
        })
        .addCase(fetchPacientes.fulfilled, (st, a) => {
            st.status = "succeeded";
            st.items = a.payload;
        })
        .addCase(fetchPacientes.rejected, (st, a) => {
            st.status = "failed";
            st.error = a.payload;
        });

        // --- Detalle ---
        b.addCase(fetchPacienteById.pending, (st) => {
        st.status = "loading";
        })
        .addCase(fetchPacienteById.fulfilled, (st, a) => {
            st.status = "succeeded";
            st.selected = a.payload;
        })
        .addCase(fetchPacienteById.rejected, (st, a) => {
            st.status = "failed";
            st.error = a.payload;
        });

        // --- Actualizar paciente ---
        b.addCase(updatePaciente.pending, (st) => {
        st.status = "loading";
        })
        .addCase(updatePaciente.fulfilled, (st, a) => {
            st.status = "succeeded";
            // Actualizar el paciente en la lista si existe
            const index = st.items.findIndex(p => p.id === a.payload.id);
            if (index !== -1) {
                st.items[index] = { ...st.items[index], ...a.payload.data };
            }
            // Actualizar selected si es el mismo paciente
            if (st.selected && st.selected.id === a.payload.id) {
                st.selected = { ...st.selected, ...a.payload.data };
            }
        })
        .addCase(updatePaciente.rejected, (st, a) => {
            st.status = "failed";
            st.error = a.payload;
        });

        // --- Desasignar paciente ---
        b.addCase(desasignarPaciente.pending, (st) => {
        st.status = "loading";
        })
        .addCase(desasignarPaciente.fulfilled, (st, a) => {
            st.status = "succeeded";
            // Remover el paciente de la lista (ya se refresca desde fetchPacientes)
            st.items = st.items.filter(p => p.id !== a.payload);
            // Limpiar selected si era el paciente desasignado
            if (st.selected && st.selected.id === a.payload) {
                st.selected = null;
            }
        })
        .addCase(desasignarPaciente.rejected, (st, a) => {
            st.status = "failed";
            st.error = a.payload;
        });

        // --- Crear paciente ---
        b.addCase(crearPaciente.pending, (st) => {
        st.status = "loading";
        })
        .addCase(crearPaciente.fulfilled, (st, a) => {
            st.status = "succeeded";
            // La lista se refresca automáticamente desde fetchPacientes
        })
        .addCase(crearPaciente.rejected, (st, a) => {
            st.status = "failed";
            st.error = a.payload;
        });
    },
});

export const { clearSelected } = slice.actions;
export default slice.reducer;
