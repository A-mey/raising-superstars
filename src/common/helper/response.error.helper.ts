import { Catch } from "./catch.helper";

export const responseErrorMessage = (errorMessage: unknown) => {
    try {
        let errorObject = { status: 500, errorMessage: { success: false, message: "Something went wrong" }};
        if (errorMessage instanceof Error) {
            let errorArray = errorMessage.message.split(",")
            console.log("errorArray", errorArray);
            if (errorArray.length > 1) {
                if (!Number.isNaN(errorArray[0])) {
                    let statusCode = parseInt(errorArray[0])
                    errorObject.status = statusCode;
                    errorObject.errorMessage.message = errorArray[1];
                }
            } else {
                errorObject.errorMessage.message = errorMessage.message;
            }
        }
        return errorObject;
    } catch (error) {
        throw new Error(Catch(error));
    }
}