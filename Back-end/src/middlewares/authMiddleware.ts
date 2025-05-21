import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

export interface AuthRequest extends Request {
  user?: any;
}

// Função authenticateJWT atualizada para usar AuthService
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const authService = new AuthService();

  try {
    const decoded = authService.verificarToken(token);
    if (!decoded) {
      res.status(403).json({ message: 'Token inválido.' });
      return;
    }
    req.user = decoded;
    next();
  } catch (erro) {
    res.status(403).json({ message: 'Token inválido.' });
    console.error('Erro na autenticação:', erro);
    throw new Error('Falha na autenticação');
  }
};

// Middleware de autorização corrigido
export const autorizar = (roleRequerida: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== roleRequerida) {
      res.status(403).json({ message: 'Acesso não autorizado.' });
      return;
    }
    next();
  };
};
