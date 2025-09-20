import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Organization = {
  id: string;
  name: string;
  prefix?: string;
  phone?: string;
  cuit?: string;
  country?: string;
  industry?: string;
  website?: string;
  leader_uuid?: string;
  leader_info?: string;
  users?: any[];
  projects?: any[];
};

interface OrganizationsState {
  name: string;
  organizations: Organization[]; // solo un array que guarda toda la info progresivamente
  loading: boolean;
  loadingIndividual: boolean;
  errorIndividual: string | null;
  loadingCreate: boolean;
  errorCreate: string | null;
}

const initialState: OrganizationsState = {
  name: "",
  organizations: [],
  loading: false,
  loadingIndividual: false,
  errorIndividual: null,
  loadingCreate: false,
  errorCreate: null,
};

// 🔹 Trae TODAS las organizaciones (solo id y name)
export const getOrganizations = createAsyncThunk(
  "organizations",
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

// 🔹 Trae UNA organización por ID y actualiza la info completa
export const getOrganizationById = createAsyncThunk(
  "organizations/getById",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const [usersRes, orgRes] = await Promise.all([
        fetch(
          `https://apigestion.ardatamine.com/v1/organizations/${id}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        // fetch(
        //   `https://apigestion.ardatamine.com/v1/organizations/${id}/projects`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // ),
        fetch(`https://apigestion.ardatamine.com/v1/organizations/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!usersRes.ok)
        throw new Error(
          `Error users ${usersRes.status}: ${usersRes.statusText}`
        );

      if (!orgRes.ok)
        throw new Error(`Error org ${orgRes.status}: ${orgRes.statusText}`);

      const usersData = await usersRes.json();
      const orgData = await orgRes.json();

      return {
        ...orgData.data,
        users: usersData.data.users,
      };
    } catch (error) {
      console.error("Error fetching organization full data:", error);
      throw error;
    }
  }
);
export const getOrganizationProyects = createAsyncThunk(
  "organizations/getProjects",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/organizations/${id}/projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(`Error ${res.status}: ${errorText}`);
      }
      const projects = await res.json();
      return {
        projects: projects,
      };
    } catch (error) {
      console.error("Error fetching organization full data:", error);
      throw error;
    }
  }
);
type OrganizationCreateData = Omit<Organization, "id" | "users" | "projects">;
export const createOrganization = createAsyncThunk(
  "organizations/create",
  async (
    {
      token,
      organizationData,
    }: { token: string; organizationData: OrganizationCreateData },
    thunkAPI
  ) => {
    try {
      const res = await fetch(
        "https://apigestion.ardatamine.com/v1/organizations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(organizationData),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error desconocido");
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "organizations/update",
  async (
    {
      token,
      organizationId,
      organizationData,
    }: {
      token: string;
      organizationId: string;
      organizationData: Partial<Organization>;
    },
    thunkAPI
  ) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/organizations/${organizationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(organizationData),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(`Error ${res.status}: ${errorText}`);
      }

      return {
        id: organizationId,
        ...organizationData,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error desconocido");
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  "organzation/delete",
  async (
    { token, organizationId }: { token: string; organizationId: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/organizations/${organizationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error desconocido");
    }
  }
);

// users
export const createUser = createAsyncThunk(
  "users/create",
  async ({ token, userData }: { token: string; userData: any }, thunkAPI) => {
    try {
      const res = await fetch("https://apigestion.ardatamine.com/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      const newUser = {
        id: data.data.id,
        username: data.data.username,
        full_name: userData.full_name,
        email: data.data.email,
      };

      return {
        user: newUser,
        organization_id: userData.organization_id,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error desconocido");
    }
  }
);

// 🔹 Slice
const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        // Acción: solo guardar id y name al principio
        state.organizations = action.payload.map((org: any) => ({
          id: org.id,
          name: org.name,
        }));
      })
      .addCase(getOrganizations.rejected, (state) => {
        state.loading = false;
      })

      // Get one (actualiza la organización en el array)
      .addCase(getOrganizationById.pending, (state) => {
        state.loadingIndividual = true;
        state.errorIndividual = null;
      })
      .addCase(getOrganizationById.fulfilled, (state, action) => {
        const org = action.payload as Organization;
        const index = state.organizations.findIndex((o) => o.id === org.id);

        if (index !== -1) {
          // Actualizamos la organización con toda la info nueva, manteniendo id y name y agregando todo lo demás
          state.organizations[index] = {
            ...state.organizations[index], // id y name
            ...org, // resto de info completa, sobreescribe si existe
          };
        } else {
          // Si no existe, la agregamos completa
          state.organizations.push(org);
        }
        state.loadingIndividual = false;
      })
      .addCase(getOrganizationById.rejected, (state, action) => {
        state.loadingIndividual = false;
        state.errorIndividual = action.error.message || "Error desconocido";
      })

      // Create organization
      .addCase(createOrganization.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loadingCreate = false;
        const newOrg: Organization = {
          ...action.payload,
          users: [],
          projects: [],
        };
        state.organizations.push(newOrg);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate =
          (action.payload as string) ||
          action.error.message ||
          "Error desconocido";
      })
      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true; // o algún flag específico si querés
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        const updatedFields = action.payload; // { id: string, ...camposModificados }
        const index = state.organizations.findIndex(
          (org) => org.id === updatedFields.id
        );

        if (index !== -1) {
          state.organizations[index] = {
            ...state.organizations[index],
            ...updatedFields,
          };
        }
      })

      // DeleteOrganization

      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        const deletedOrgId = action.meta.arg.organizationId;
        state.organizations = state.organizations.filter(
          (org) => org.id !== deletedOrgId
        );
      })
      .addCase(deleteOrganization.rejected, (state) => {
        state.loading = false;
      })

      // Create user
      .addCase(createUser.pending, (state) => {})
      .addCase(createUser.fulfilled, (state, action) => {
        const { user, organization_id } = action.payload;

        if (!organization_id) return;

        const orgIndex = state.organizations.findIndex(
          (org) => org.id === organization_id
        );
        if (orgIndex === -1) return;

        if (!state.organizations[orgIndex].users) {
          state.organizations[orgIndex].users = [];
        }

        state.organizations[orgIndex].users.push(user);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error(
          "Error al crear usuario:",
          action.payload || action.error.message
        );
      });
  },
});

export default organizationsSlice.reducer;
