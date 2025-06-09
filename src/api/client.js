import client from ".";
import { METHODS } from "../constants";

export const api = {
    USERS: {
        getAll: ({ data, ...config }) => client({ method: METHODS.GET, url: "/users", data, ...config }),
        getUserByEmail: ({ data, ...config }) => client({ method: METHODS.GET, url: `/users?email=${data?.email}`, data, ...config }),
        post: ({ data, ...config }) => client({ method: METHODS.POST, url: '/users', data, ...config }),
        searchByName: ({ data, ...config }) => client({ method: METHODS.GET, url: `/users?name_like=${data}`, data, ...config }),
    },
    TASKS: {
        getAll: ({ data, ...config }) => client({ method: METHODS.GET, url: '/tasks', data, ...config }),
        get: ({ id, data, ...config }) => client({ method: METHODS.GET, url: `/tasks/${id}`, data, ...config }),
        post: ({ data, ...config }) => client({ method: METHODS.POST, url: '/tasks', data, ...config }),
        update: ({ id, data, ...config }) => client({ method: METHODS.PATCH, url: `/tasks/${id}`, data, ...config }),
        delete: ({ id, data, ...config }) => client({ method: METHODS.DELETE, url: `/tasks/${id}`, data, ...config }),
        searchByName: ({ data, ...config }) => client({ method: METHODS.GET, url: `/tasks?userName_like=${data}`, data, ...config }),
        searchByTitle: ({ data, ...config }) => client({ method: METHODS.GET, url: `/tasks?title_like=${data}`, data, ...config }),
        sortAndFilter: ({ data, ...config }) => client({ method: METHODS.GET, url: `/tasks?_sort=${data.sortTask}&${data.filterQuery}`, data, ...config }),
    }
}
