import { Request, Response, NextFunction } from 'express';
import {AuthService, TokenPayload} from '../utils/jwt';
import { UserRole } from '../types/user.types';


export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: 'Não autorizado',
        message: 'Token de autenticação não fornecido',
      });
      return;
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).json({
        success: false,
        error: 'Formato inválido',
        message: 'Token deve estar no formato: Bearer <token>',
      });
      return;
    }
    
    const token = parts[1];
    const decoded = AuthService.verificarToken(token);
    
    if (!decoded) {
      res.status(403).json({
        success: false,
        error: 'Acesso proibido',
        message: 'Token inválido ou expirado',
      });
      return;
    }
    
    req.user = decoded;
    next();
  } catch (erro) {
    console.error('Erro na autenticação:', erro);
    res.status(500).json({
      success: false,
      error: 'Erro de autenticação',
      message: erro instanceof Error ? erro.message : 'Falha no processo de autenticação',
    });
  }
};

export const autorizar = (...rolesPermitidos: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Não autenticado',
          message: 'Autenticação necessária para acessar este recurso',
        });
        return;
      }

      if (!rolesPermitidos.includes(req.user.role as UserRole)) {
        res.status(403).json({
          success: false,
          error: 'Acesso proibido',
          message: `Permissão insuficiente. Necessário nível de acesso: ${rolesPermitidos}`,
        });
        return;
      }

      next();
    } catch (erro) {
      console.error('Erro na autorização:', erro);
      res.status(500).json({
        success: false,
        error: 'Erro de autorização',
        message: erro instanceof Error ? erro.message : 'Falha no processo de autorização',
      });
    }
  };
};
