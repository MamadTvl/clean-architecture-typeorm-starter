import { AuthController } from '@/infrastructure/controller/auth/auth.controller';

export const getResponseMessage = (
    controllerName: string,
    methodName: string,
): string => {
    switch (controllerName) {
        case AuthController.name:
            switch (methodName as keyof AuthController) {
                case 'register':
                    return 'registered successfully';
                case 'login':
                    return 'login successfully';
            }

        default:
            return '';
    }
};
