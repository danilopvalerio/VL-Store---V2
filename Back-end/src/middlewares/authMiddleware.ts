// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface estendida para o Request
export interface AuthRequest extends Request {
    usuario?: {
        id: string;
        tipo: string;
    };
}

// Middleware de autenticação corrigido
export const autenticar = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ message: 'Formato de token inválido' });
        return;
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido ou expirado' });
            return;
        }

        req.usuario = decoded as { id: string; tipo: string };
        next();
    });
};

// Middleware de autorização corrigido
export const autorizar = (...tiposPermitidos: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.usuario || !tiposPermitidos.includes(req.usuario.tipo)) {
            res.status(403).json({ message: 'Acesso não autorizado' });
            return;
        }
        next();
    };
};