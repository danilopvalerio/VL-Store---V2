import Loja from './models/Loja';
import Funcionario from './models/Funcionario';
import { JWTUtil } from './utils/jwt';
import { UserRole } from './types/user.types';

type TokenPayload = {
  id: string;
  email: string;
  nome: string;
  role: string;
  id_loja?: string; // Adicionado para funcionários
};

export class AuthService {
  // Métodos existentes para Loja
  public gerarToken(loja: Loja): string {
    try {
      if (!loja.id_loja || !loja.email || !loja.nome) {
        throw new Error('Dados da loja inválidos');
      }

      const payload: TokenPayload = {
        id: loja.id_loja,
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

  // Novo método para Funcionário
  public gerarTokenFuncionario(funcionario: Funcionario): string {
    try {
      if (!funcionario.id_funcionario || !funcionario.email || !funcionario.nome) {
        throw new Error('Dados do funcionário inválidos');
      }

      const payload: TokenPayload = {
        id: funcionario.id_funcionario,
        email: funcionario.email,
        nome: funcionario.nome,
        role: funcionario.role || UserRole.FUNCIONARIO,
        id_loja: funcionario.id_loja, // Adicionando id_loja ao payload
      };

      return JWTUtil.gerarToken(payload);
    } catch (error) {
      console.error('Erro ao gerar token do funcionário:', error);
      throw new Error('Falha ao gerar token do funcionário');
    }
  }

  public verificarToken(token: string): TokenPayload | null {
    try {
      const decoded = JWTUtil.verificarToken(token);

      // Validar que o token decodificado possui todos os campos necessários
      if (
        !decoded ||
        typeof decoded !== 'object' ||
        !decoded.id ||
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

  // Novo método para verificar se o token pertence a um funcionário
  public isFuncionarioToken(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === UserRole.FUNCIONARIO : false;
  }

  // Novo método para verificar se o token pertence a uma loja
  public isLojaToken(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === UserRole.ADMIN : false;
  }
}
