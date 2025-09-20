import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Tipos
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

// Thunk para obtener los roles
export const fetchRoles = createAsyncThunk<
  Role[], // Tipo que retorna
  string, // Token como argumento
  { rejectValue: string } // Tipo de error personalizado
>("roles/fetchRoles", async (token, { rejectWithValue }) => {
  try {
    const res = await fetch("https://apigestion.ardatamine.com/v1/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return rejectWithValue(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data as Role[];
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error");
  }
});

// Slice
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export default rolesSlice.reducer;
