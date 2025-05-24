import {API_HOST} from "@/services/api";

const UserService = {
    getCurrentUser: async () => {
        const response = await fetch(`${API_HOST}/test/user`);
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    },

    getEquipment: async () => {
        const response = await fetch(`${API_HOST}/test/equipment`);
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    }
}

export default UserService;

