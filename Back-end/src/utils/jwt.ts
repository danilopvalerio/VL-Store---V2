import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from './config/auth';
import { UserRole } from "../types/user.types";

export interface TokenPayload {
  id: string; // Campo genérico para id (pode ser id_loja ou id_funcionario)
  email: string;
  nome: string;
  role: UserRole;
  id_loja?: string;  // Específico para loja
  id_funcionario?: string;
}

export class AuthService {
  private static readonly JWT_SECRET = jwtConfig.secret;
  private static readonly JWT_EXPIRES_IN = jwtConfig.expiresIn;
  
  
  static gerarToken(payload: TokenPayload): string {
    if (!Object.values(UserRole).includes(payload.role)) {
      throw new Error('Tipo de usuário inválido');
    }
    
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }
  
  
  static gerarTokenLoja(loja: {
    id: string;
    email: string;
    nome: string;
  }): string {
    return this.gerarToken({
      id: loja.id,
      email: loja.email,
      nome: loja.nome,
      role: UserRole.ADMIN
    });
  }
  
  
  static gerarTokenFuncionario(funcionario: {
    id: string;
    email: string;
    nome: string;
    role: UserRole;
    id_loja: string;
  }): string {
    if (funcionario.role === UserRole.ADMIN) {
      throw new Error('Funcionários não podem ter role ADMIN');
    }
    
    return this.gerarToken({
      id: funcionario.id,
      email: funcionario.email,
      nome: funcionario.nome,
      role: funcionario.role,
      id_loja: funcionario.id_loja
    });
  }
  
  static verificarToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      
      // Verificação robusta do payload
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
      
      // Verifica se o role é válido
      if (!Object.values(UserRole).includes(payload.role as UserRole)) {
        throw new Error('Tipo de usuário inválido no token');
      }
      
      return {
        id: payload.id as string,
        email: payload.email as string,
        nome: payload.nome as string,
        role: payload.role as UserRole,
        id_loja: payload.id_loja as string | undefined,
      };
    } catch (error) {
      console.error('Falha na verificação do token:', error);
      return null;
    }
  }
  
  static isFuncionario(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === UserRole.FUNCIONARIO : false;
  }
  
  static isAdmin(token: string): boolean {
    const payload = this.verificarToken(token);
    return payload ? payload.role === UserRole.ADMIN : false;
  }
  
  static getPayload(token: string): TokenPayload | null {
    return this.verificarToken(token);
  }
}