import axios from "axios";

export const post = async (url: string, data: {}, config?: {}) => {
    try {
        const response = await axios.post(url, data, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
