import bcrypt from 'bcrypt';


export class BcryptService {
    hash(password: string) {
        return bcrypt.hash(password, 10);
    }

    compare(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }
}