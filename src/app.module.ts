import { Module } from '@nestjs/common';
import { EnvConfigModule } from './infrastructure/config/env/env.module';
import { AuthControllerModule } from './infrastructure/controller/auth/auth-controller.module';
import { AuthModule } from './use-case/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UseCaseFilter } from './infrastructure/common/filter/use-case.filter';
import { ResponseInterceptor } from './infrastructure/common/interceptor/response.interceptor';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        EnvConfigModule,
        AuthModule,
        PassportModule,
        AuthControllerModule,
    ],
    providers: [
        JwtStrategy,
        LocalStrategy,
        { provide: APP_FILTER, useClass: UseCaseFilter },
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    ],
})
export class AppModule {}
