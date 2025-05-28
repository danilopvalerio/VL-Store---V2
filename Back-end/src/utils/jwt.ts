import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from './config/auth';

interface TokenPayload {
  id: string; // Campo genérico para id (pode ser id_loja ou id_funcionario)
  email: string;
  nome: string;
  role: string;
  id_loja?: string; // Opcional - usado apenas para funcionários
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
      const decoded = jwt.verify(token, jwtConfig.secret);

      // Verificação mais robusta do payload
      if (typeof decoded !== 'object' || decoded === null) {
        throw new Error('Token inválido');
      }

      const payload = decoded as Record<string, unknown>;

      // Campos obrigatórios
      const requiredFields = ['id', 'email', 'nome', 'role'];
      for (const field of requiredFields) {
        if (!payload[field] || typeof payload[field] !== 'string') {
          throw new Error(`Campo ${field} ausente ou inválido no token`);
        }
      }

      return {
        id: payload.id as string,
        email: payload.email as string,
        nome: payload.nome as string,
        role: payload.role as string,
        id_loja: payload.id_loja as string | undefined,
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Método auxiliar para verificar se o token é de um funcionário
  static isFuncionarioToken(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === 'funcionario' : false;
  }

  // Método auxiliar para verificar se o token é de uma loja
  static isLojaToken(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === 'loja' : false;
  }
}
