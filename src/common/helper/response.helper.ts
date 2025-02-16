import { Response } from "../dto/response.dto"

export const ResponseHelper = <T>(success: boolean, message: string, data?: T): Response<T> => {
    return {
        success: success,
        message: message,
        data: data
    }
}