import {api} from "./api";
import {toast} from "react-toastify";

const post = async (
    path: string,
    data: {} | [],
    successMessage?: string
): Promise<any> => {
    try {
        const response = await api(
            path,
            "POST",
            data,
        );
        if (response) {
            toast.success(successMessage)
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export default post;
