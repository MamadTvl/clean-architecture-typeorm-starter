import { BcryptAdapter } from '@/domain/adapter/bcrypt.interface';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService implements BcryptAdapter {
    private rounds = 10;

    async hash(hashString: string): Promise<string> {
        return await bcrypt.hash(hashString, this.rounds);
    }

    async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}
