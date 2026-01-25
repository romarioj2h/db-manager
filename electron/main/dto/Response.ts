function Response(type: string, message: any): { type: string; message: any } {
    return { type, message };
}

export function ErrorResponse(message: any): { type: string; message: any } {
    return Response('error', message);
}

export function SuccessResponse(message: any): { type: string; message: any } {
    return Response('success', message);
}
