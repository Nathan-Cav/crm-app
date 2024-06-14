export class ErrorMessage {
    statusCode: Number;
    errorMessage: string;

    constructor(status: Number, message: string) {
        this.statusCode = status;
        this.errorMessage = message;
    }

    json() {
        return {
            status: this.statusCode,
            message: { error: this.errorMessage }
        };
    }
}