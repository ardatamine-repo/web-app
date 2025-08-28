export const fetchUsers = async (token: string, idOrganization: string) => {

    try {
        const res = await fetch(
            `https://mvp-api-test-771209590309.us-east1.run.app/users`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Bearer ${token}`,
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

export const fetchUser = async (token: string, idUser: string) => {

    try {
        const res = await fetch(
            `https://mvp-api-test-771209590309.us-east1.run.app/idUser`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Bearer ${token}`,
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
export const updateUser = async (token: string, idUser: string) => {

    try {
        const res = await fetch(
            `https://mvp-api-test-771209590309.us-east1.run.app/idUser/${idUser}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Bearer ${token}`,
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