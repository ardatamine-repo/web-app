import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type OrganizationAdmin = {
  id: string;
  name: string;
};

interface OrganizationsState {
  organizations: OrganizationAdmin[]; // solo un array que guarda toda la info progresivamente
  loading: boolean;
}

const initialState: OrganizationsState = {
  organizations: [],
  loading: false,
};

// 🔹 Trae TODAS las organizaciones (solo id y name)
export const getOrganizationsAdmin = createAsyncThunk(
  "admin/organizations",
  async (token: string | null, thunkAPI) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/organizations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      // data.data viene con todas las organizaciones (seguramente solo id y name)
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

// 🔹 Slice
const adminSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getOrganizationsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizationsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Acción: solo guardar id y name al principio
        state.organizations = action.payload.map((org: any) => ({
          id: org.id,
          name: org.name,
        }));
      })
      .addCase(getOrganizationsAdmin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
