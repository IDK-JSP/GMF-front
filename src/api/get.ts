import {api} from "./api";
import {toast} from "react-toastify";

const get = async (
    path: string,
    successMessage?: string
): Promise<any> => {
    try {
        const response = await api(
            path,
            "GET"
        );
        if (response) {
            toast.success(successMessage)
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export default get;
