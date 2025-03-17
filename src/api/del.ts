import {api} from "./api";
import {toast} from "react-toastify";

const post = async (
    path: string,
    successMessage?: string
): Promise<any> => {
    try {
        const response = await api(
            path,
            "DELETE"
        );
        if (response) {
            toast.warn(successMessage)
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export default post;
