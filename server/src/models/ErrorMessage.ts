export class ErrorMessage {
    statusCode: number;
    errorMessage: string;

    constructor(status: number, message: string) {
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