export class Response {
    type: string;
    message: any;
    constructor(type: string, message: any) {
        this.type = type;
        this.message = message;
    }
}

export function ErrorResponse(message: any): Response {
    return new Response('error', message);
}

export function SuccessResponse(message: any): Response {
    return new Response('success', message);
}
