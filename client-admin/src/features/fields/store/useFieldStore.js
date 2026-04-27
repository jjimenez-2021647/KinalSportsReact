import { create } from "zustand";
import {
    getFields as getFieldsRequest,
    createField as createFieldRequest,
    updateField as updateFieldRequest,
    deletedField as deletedFieldRequest,
    deletedField
} from "../../../shared/api"

export const useFieldStore = create((set, get) => ({
    fields: [],
    loagind: false,
    error: null,

    getFields: async () => {
        try {
            set({ loagind: true, error: null});
            const response = await getFieldsRequest();
            // console.log(response)

            set({
                fields: response.data.data,
                loagind: false
            })
            
        } catch (error) {
            set ({
                error: error.response?.data?.message || "Error al obtener canchas.",
                loagind: false
            })
        }
    },

    createField: async (formData) => {
        try {
            set({ loading: true, error: null})

            const response = await createFieldRequest(formData);

            set({
                fields: [response.data.data, ...get().fields],
                loading: false
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Erro al crear campo."
            })
        }
    },

    updateField: async (id, data) => {
        try {
            set({ loading: true, error: null })
            const response = await updateFieldRequest(id, data)

            const updated = response.data.data
            set({
                fields: get().fields.map((f) =>
                    f._id === id ? updated : f
                ),
                loading: false,            
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message ||  "Errpr añ actualizar el campo."
            })
        }
    },

    deletedField: async (id) => {
        try {
            set({loagind: true, error: null})

            await deletedFieldRequest(id);

            set({
                fields: get().fields.filter(f => f._id !== id),
                loading: false
            })
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al eliminar campo."
            })
        }
    }

}))
