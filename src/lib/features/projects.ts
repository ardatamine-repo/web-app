import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ProjectPermission = {
  id: string;
  name: string;
  description: string;
};

type OrganizationShort = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  prefix: string;
};

type FullProject = {
  id: string;
  name: string;
  prefix: string;
  description: string;
  storage_bucket: string;
  storage_prefix: string;
  created_by_uuid: string;
  created_by_info: string;
  db_instance: string;
  db_name: string;
  available_permissions: ProjectPermission[];
  organizations: OrganizationShort[];
  users?: any[];
};

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  fullProjects: {
    [id: string]: FullProject;
  };
  loadingIndividual: boolean;
  errorIndividual: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  fullProjects: {},
  loadingIndividual: false,
  errorIndividual: null,
};

// 🔹 Trae UN proyecto por ID
export const getProjectById = createAsyncThunk(
  "projects/getById",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/projects/${id}`,
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
      return data.data as FullProject;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }
);
export const createProject = createAsyncThunk(
  "projects/create",
  async (dataCreateForm: any, thunkAPI) => {
    const { dispatch } = thunkAPI;
    console.log(dataCreateForm);
    try {
      const res = await fetch("https://apigestion.ardatamine.com/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${dataCreateForm.token}`,
        },
        body: JSON.stringify(dataCreateForm.projectData),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      const newProjectSimplfy = {
        id: data.data.id,
        name: data.data.name,
        description: data.data.description,
      };
      return data.data as FullProject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (data: any, thunkAPI) => {
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/projects/${data.idProject}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return data.idProject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }
);
export const updateProject = createAsyncThunk(
  "projects/update",
  async (data: any, thunkAPI) => {
    console.log(data);
    try {
      const res = await fetch(
        `https://apigestion.ardatamine.com/v1/projects/${data.projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify(data.updatedData),
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }
);

// 🔹 Slice
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProjectsFromUser: (state, action) => {
      state.projects = [...state.projects, ...action.payload];
    },
    removeInfoProjects: (state) => {
      state.projects = [];
      state.fullProjects = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // Obtener uno
      .addCase(getProjectById.pending, (state) => {
        state.loadingIndividual = true;
        state.errorIndividual = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        const project = action.payload;
        if (project && project.id) {
          state.fullProjects[project.id] = project;
        }
        state.loadingIndividual = false;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loadingIndividual = false;
        state.errorIndividual = action.error.message || "Error desconocido";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        const newProject = action.payload;

        // state.fullProjects[newProject.id] = newProject;

        state.projects.push({
          id: newProject.id,
          name: newProject.name,
          description: newProject.description,
          prefix: newProject.prefix,
        });
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const idProject = action.payload;

        // state.fullProjects[newProject.id] = newProject;

        state.projects = state.projects.filter(
          (project) => project.id !== idProject
        );
        delete state.fullProjects[idProject];
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { projectId, updatedData } = action.payload;

        console.log(projectId, updatedData);
        const { name, description } = updatedData;

        state.projects = state.projects.map((project) =>
          project.id === projectId ? { ...project, name, description } : project
        );

        if (state.fullProjects[projectId]) {
          state.fullProjects[projectId] = {
            ...state.fullProjects[projectId],
            name,
            description,
          };
        }
      });
  },
});
export const { addProjectsFromUser, removeInfoProjects } =
  projectsSlice.actions;

export default projectsSlice.reducer;
