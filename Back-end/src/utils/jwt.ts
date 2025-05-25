import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from './config/auth';

interface TokenPayload {
  id_loja: string;
  email: string;
  nome: string;
  role: string;
}

export class JWTUtil {
  static gerarToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: jwtConfig.expiresIn,
    };

    return jwt.sign(payload, jwtConfig.secret, options);
  }

  static verificarToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, jwtConfig.secret) as TokenPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}
