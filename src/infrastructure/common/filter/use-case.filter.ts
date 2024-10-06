import { AuthException } from '@/domain/exception/auth-exception.enum';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class UseCaseFilter implements ExceptionFilter {
    static httpCode: Record<string, number> = {
        [AuthException.UsernameAlreadyExists]: HttpStatus.BAD_REQUEST,
    };

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        if (exception instanceof HttpException) {
            res.status(exception.getStatus()).json(exception.getResponse());
            return;
        }
        const code =
            UseCaseFilter.httpCode[exception.message] ||
            HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(code).json({
            statusCode: code,
            message:
                code === HttpStatus.INTERNAL_SERVER_ERROR
                    ? 'Internal Server Error'
                    : exception.message,
            error: exception.message,
        });
    }
}
