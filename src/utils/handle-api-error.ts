import { ApiError } from "./api-requests.js";
import { showToast } from "./toast.js";


export function handleApiError(
    error: unknown,
    fallbackMessage = "Something went wrong, please try again"
): void {
    if (error instanceof ApiError) {
        showToast(error.message ? error.message : fallbackMessage, "error");
        return;
    }
    
    showToast("No connection to the server", "error");
}