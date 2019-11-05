export enum HttpStatusCode {
    // 2**
    OK = 200,
    CREATED = 201,

    // 4**
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,

    // 5**
    INTERNAL_SERVER_ERROR = 500,
}

export enum HttpStatus {
    OK = 'OK',
    ERROR = 'ERROR',
    CREATED = 'CREATED',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
