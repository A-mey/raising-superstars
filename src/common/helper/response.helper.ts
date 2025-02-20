import { Response } from "../dto/response.dto"

export const ResponseHelper = <T>(success: boolean, message: string, data?: T): Response<T> => {
    let response: Response<T> = {
        success: success,
        message: message,
    }
    if (data) {
        response.data = data;
    }
    return response;
}