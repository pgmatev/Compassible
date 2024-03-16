import jwt from 'jsonwebtoken';
import { config } from "../config";

interface JwtData {
    id: number;
}

export class JwtService {
    create(data: JwtData): string {
        const {privateKey, expiryTime} = config.get("jwt");
        return jwt.sign({id: data.id}, privateKey, {expiresIn: expiryTime});
    }

    check(token:string): JwtData {
        const privateKey = config.get("jwt.privateKey");
        return jwt.verify(token, privateKey) as JwtData;
    }
}