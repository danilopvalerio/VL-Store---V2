import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import Loja from './models/Loja';

type TokenPayload = {
  id_loja: string;
  email: string;
  nome: string;
  role: string;
};

export class AuthService {
  private readonly secret: Secret;
  private readonly expiresIn: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = '1d'; // Corrigido de 'id' para '1d' (1 dia)
  }

  public gerarToken(loja: Loja): string {
    try {
      if (!loja.id_loja || !loja.email || !loja.nome) {
        throw new Error('Dados da loja inválidos');
      }

      const payload: TokenPayload = {
        id_loja: loja.id_loja,
        email: loja.email,
        nome: loja.nome,
        role: loja.role || 'user',
      };

      return jwt.sign(
        payload,
        this.secret as string,
        {
          expiresIn: this.expiresIn,
        } as SignOptions,
      );
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      throw new Error('Falha ao gerar token');
    }
  }

  public verificarToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as any;

      // Validate that the decoded token has all required fields
      if (
        !decoded ||
        typeof decoded !== 'object' ||
        !decoded.id_loja ||
        !decoded.email ||
        !decoded.nome ||
        !decoded.role
      ) {
        console.error('Token payload is invalid or missing required fields');
        return null;
      }

      return decoded as TokenPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }
}
