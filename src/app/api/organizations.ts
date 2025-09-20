export const fetchOrganizations = async (token: string) => {
  try {
    const res = await fetch(
      `https://apigestion.ardatamine.com/v1/organizations/`,
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
    console.log(data);
  } catch (error) {
    console.error("Error fetching data :", error);
  }
};

export const fetchOrganization = async (
  token: string,
  idOrganization: string
) => {
  try {
    const res = await fetch(
      `https://apigestion.ardatamine.com/v1/organizations/${idOrganization}`,
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
    console.log(data);
  } catch (error) {
    console.error("Error fetching data :", error);
  }
};

export const createOrganization = async (
  token: string,
  newOrganization: {}
) => {
  try {
    const res = await fetch(
      `https://apigestion.ardatamine.com/v1/organizations/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrganization),
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data :", error);
  }
};
export const updateOrganization = async (
  token: string,
  newOrganization: {}
) => {
  try {
    const res = await fetch(
      `https://apigestion.ardatamine.com/v1/organizations/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrganization),
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data :", error);
  }
};
export const deleteOrganization = async (token: string, idOrganization: {}) => {
  try {
    const res = await fetch(
      `https://apigestion.ardatamine.com/v1/organizations/`,
      {
        method: "DELETE",
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
    console.log(data);
  } catch (error) {
    console.error("Error fetching data :", error);
  }
};
