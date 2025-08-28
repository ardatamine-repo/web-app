import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { addProjectsFromUser } from "./projects";
interface Organization {
  id: string | null;
  name: string | null;
}
type DirectPermission = {
  id: string;
  name: string;
};

interface DecodedToken {
  username: string;
  email: string;
  exp: number;
  iat: number;
  organizations: Organization[];
  roles: string[];
  permissions: string[];
  id: string;
}
type Role = {
  id: string;
  name: string;
};
interface AuthState {
  id: string | null;
  token: string | null;
  username: string | null;
  email: string | null;
  roles: Role[];
  loading: boolean;
  error: string | null | {};
  logged: boolean;
  organization: Organization;
  permissions: string[];
  direct_permissions: DirectPermission[] | null;
}

const initialState: AuthState = {
  id: null,
  token: null,
  username: null,
  email: null,
  roles: [],
  organization: {
    id: "",
    name: "",
  },
  direct_permissions: [],
  loading: false,
  error: null,
  logged: false,
  permissions: [],
};

export const loginUser1FA = createAsyncThunk(
  "auth/loginUser1FA",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        "https://mvp-api-test-771209590309.us-east1.run.app/auth/login_step1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al iniciar sesión");
      }
      return email;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Ocurrió un error desconocido"
      );
    }
  }
);

export const loginUser2FA = createAsyncThunk<
  {
    token: string;
    username: string;
    email: string;
    roles: Role[];
    organization: Organization;
    id: string;
    permissions: string[];
    direct_permissions: DirectPermission[];
  },
  { email: string; code: string },
  { rejectValue: string }
>("auth/loginUser2FA", async ({ email, code }, thunkAPI) => {
  try {
    const response = await fetch(
      "https://mvp-api-test-771209590309.us-east1.run.app/auth/login_step2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al iniciar sesión");
    }

    const dataToken = await response.json();

    const token = dataToken.data.access_token;
    console.log(dataToken, token);
    if (token) {
      localStorage.setItem("token", token);
      document.cookie = `auth_token=${token}; path=/; max-age=604800`;
    }

    const userResponse = await fetch(
      "https://mvp-api-test-771209590309.us-east1.run.app/users/all-me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const { data } = await userResponse.json();
    console.log("Datos de usuario:", data.projects);
    
    return {
      token,
      username: data.username,
      email: data.email,
      roles: data.roles,
      organization: {
        id: data.organizations[0].id,
        name: data.organizations[0].name,
      },
      id: data.id,
      permissions: data.permissions,
      direct_permissions: data.direct_permissions,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || "Ocurrió un error desconocido"
    );
  }
});
export const getUserAllInfo = createAsyncThunk<
  {
    token: string;
    username: string;
    email: string;
    roles: Role[];
    organization: {
      id: string | null;
      name: string | null;
    };
    id: string;
    permissions: any;
    direct_permissions: DirectPermission[];
  },
  string, // el tipo de token
  {
    rejectValue: string;
  }
>("auth/userAll", async (token, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    const userResponse = await fetch(
      "https://mvp-api-test-771209590309.us-east1.run.app/users/all-me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userResponse.ok) {
      // Puedes lanzar un error con más detalle si quieres mostrar el mensaje devuelto por el backend
      const errorData = await userResponse.json();
      throw new Error(
        errorData.message || "Error al obtener datos del usuario"
      );
    }

    const { data } = await userResponse.json();

    console.log("Datos de usuario:", data);

    dispatch(addProjectsFromUser(data.projects));
    return {
      token,
      username: data.username,
      email: data.email,
      roles: data.roles,
      organization: {
        id: data.organizations[0]?.id ?? null,
        name: data.organizations[0]?.name ?? null,
      },
      id: data.id,
      permissions: data.permissions,
      direct_permissions: data.direct_permissions,
    };
  } catch (error: any) {
    // Retorna el error usando rejectWithValue para manejarlo en el slice
    return thunkAPI.rejectWithValue(error.message || "Error desconocido");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.logged = true;
      state.organization = action.payload.organization;
      state.id = action.payload.id;
      state.permissions = action.payload.permissions;
    },
    logout(state) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        document.cookie = "auth_token=; path=/; max-age=0";
      }
      state.token = null;
      state.username = null;
      state.email = null;
      state.roles = [];
      state.logged = false;
      (state.organization = {
        id: "",
        name: "",
      }),
        (state.id = null);
      state.permissions = [];

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser1FA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser1FA.fulfilled, (state, action) => {
        state.loading = false;

        state.email = action.payload;
      })
      .addCase(loginUser1FA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })
      .addCase(loginUser2FA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser2FA.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.roles = action.payload.roles;
        state.logged = true;
        state.organization = action.payload.organization;
        state.id = action.payload.id;
        state.permissions = action.payload.permissions;
        state.direct_permissions = action.payload.direct_permissions;
      })
      .addCase(loginUser2FA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      })

      .addCase(getUserAllInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAllInfo.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.roles = action.payload.roles;
        state.logged = true;
        state.organization = action.payload.organization;
        state.id = action.payload.id;
        state.permissions = action.payload.permissions;
        state.direct_permissions = action.payload.direct_permissions;
      })
      .addCase(getUserAllInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
