export enum UserRole {
	ADMIN = 'admin',
	FUNCIONARIO = 'funcionario'
}

export type TokenPayload = {
	id_loja: string;
	email: string;
	nome: string;
	role: UserRole;
};