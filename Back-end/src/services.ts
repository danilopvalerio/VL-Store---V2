import Loja from './models/Loja';
import { JWTUtil } from './utils/jwt';

type TokenPayload = {
  id_loja: string;
  email: string;
  nome: string;
  role: string;
};

export class AuthService {
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

      return JWTUtil.gerarToken(payload);
    } catch (error) {
      console.error('Erro ao gerar token:', error);
      throw new Error('Falha ao gerar token');
    }
  }

  public verificarToken(token: string): TokenPayload | null {
    try {
      const decoded = JWTUtil.verificarToken(token);

      // Validar que o token decodificado possui todos os campos necessários
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
