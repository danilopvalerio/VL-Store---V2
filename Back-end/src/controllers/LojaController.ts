import { Repository } from 'typeorm';
import Loja from '../models/Loja';
import { AppDataSource } from '../database/AppDataSource';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { AuthService } from '../services';

// Interface para os dados de criação da loja
interface LojaCriacaoDTO {
  nome: string;
  email: string;
  senha: string;
  cpf_cnpj_proprietario_loja: string;
  data_nasc_proprietario: Date;
  telefone: string;
  role?: string;
}

export default class LojaController {
  // para poder acessar a tabela:
  private readonly lojaRepositorio: Repository<Loja>;
  private authService: AuthService;

  public getLojaRepository(): Repository<Loja> {
    return this.lojaRepositorio;
  }

  constructor() {
    this.lojaRepositorio = AppDataSource.getRepository(Loja);
    this.authService = new AuthService();
  }

  // validação de dados da loja
  private validarDadosLoja(dados: Partial<LojaCriacaoDTO>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dados.nome || dados.nome.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    if (!validator.isEmail(<string>dados.email)) {
      errors.push('Email inválido');
    }

    if (!dados.senha || dados.senha.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }

    if (
      !dados.cpf_cnpj_proprietario_loja ||
      (dados.cpf_cnpj_proprietario_loja.length !== 11 &&
        dados.cpf_cnpj_proprietario_loja.length !== 14)
    ) {
      errors.push('CPF/CNPJ inválido');
    }

    return { isValid: errors.length === 0, errors };
  }

  async createLoja(req: Request, res: Response) {
    try {
      // Validação dos dados
      const validacao = this.validarDadosLoja(req.body);
      if (!validacao.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          message: 'Verifique os campos informados',
          validationErrors: validacao.errors,
        });
      }

      // Verifica se email já existe
      const emailExiste = await this.lojaRepositorio.findOne({
        where: { email: req.body.email },
      });
      if (emailExiste) {
        return res.status(400).json({
          success: false,
          error: 'Conflito de dados',
          message: 'Email já está em uso',
        });
      }

      // Verifica se CPF/CNPJ já existe
      const cpfCnpjExiste = await this.lojaRepositorio.findOne({
        where: { cpf_cnpj_proprietario_loja: req.body.cpf_cnpj_proprietario_loja },
      });
      if (cpfCnpjExiste) {
        return res.status(400).json({
          success: false,
          error: 'Conflito de dados',
          message: 'CPF/CNPJ já cadastrado',
        });
      }

      // Verifica se telefone já existe
      if (req.body.telefone) {
        const telefoneExiste = await this.lojaRepositorio.findOne({
          where: { telefone: req.body.telefone },
        });
        if (telefoneExiste) {
          return res.status(400).json({
            success: false,
            error: 'Conflito de dados',
            message: 'Telefone já cadastrado',
          });
        }
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(req.body.senha, 10);

      // Cria a loja
      const loja = new Loja(
        req.body.nome,
        senhaHash,
        req.body.email,
        req.body.cpf_cnpj_proprietario_loja,
        req.body.data_nasc_proprietario,
        req.body.telefone,
        req.body.role || 'user',
      );

      const savedLoja = await this.lojaRepositorio.save(loja);

      // Remove a senha do retorno
      const { senha: _, ...lojaSemSenha } = savedLoja;

      // Gera um token para o usuário recém-criado
      const token = this.authService.gerarToken(savedLoja);

      console.log(`Nova loja criada: ${loja.nome} (ID: ${loja.id_loja})`);

      res.status(201).json({
        success: true,
        message: 'Loja criada com sucesso',
        data: {
          loja: lojaSemSenha,
          token,
        },
      });
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao criar loja',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const lojas = await this.lojaRepositorio.find();

      // Remove a senha de cada loja por segurança
      const lojasSemSenha = lojas.map((loja) => {
        const { senha, ...lojaSemSenha } = loja;
        return lojaSemSenha;
      });

      res.status(200).json({
        success: true,
        data: lojasSemSenha,
        count: lojasSemSenha.length,
      });
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar lojas',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      // Validar ID
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID não fornecido',
          message: 'É necessário fornecer um ID válido',
        });
      }

      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({
          success: false,
          error: 'Recurso não encontrado',
          message: 'Loja não encontrada',
        });
      }

      // Remove a senha por segurança
      const { senha, ...lojaSemSenha } = loja;

      res.status(200).json({
        success: true,
        data: lojaSemSenha,
      });
    } catch (error) {
      console.error(`Erro ao buscar loja com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar loja',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      // Validar ID
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID não fornecido',
          message: 'É necessário fornecer um ID válido',
        });
      }

      // Verificar se há dados para atualizar
      if (!dadosAtualizados || Object.keys(dadosAtualizados).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          message: 'Nenhum dado fornecido para atualização',
        });
      }

      // Não permitir atualização de campos sensíveis diretamente
      if (dadosAtualizados.senha) {
        return res.status(400).json({
          success: false,
          error: 'Operação não permitida',
          message:
            'Não é possível atualizar a senha diretamente. Use o endpoint específico para alteração de senha.',
        });
      }

      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({
          success: false,
          error: 'Recurso não encontrado',
          message: 'Loja não encontrada',
        });
      }

      // Verificar se está tentando atualizar o email para um que já existe
      if (dadosAtualizados.email && dadosAtualizados.email !== loja.email) {
        const emailExiste = await this.lojaRepositorio.findOne({
          where: { email: dadosAtualizados.email },
        });

        if (emailExiste) {
          return res.status(400).json({
            success: false,
            error: 'Email já em uso',
            message: 'O email fornecido já está sendo usado por outra loja',
          });
        }
      }

      this.lojaRepositorio.merge(loja, dadosAtualizados);
      const lojaAtualizada = await this.lojaRepositorio.save(loja);

      // Remove a senha por segurança
      const { senha, ...lojaAtualizadaSemSenha } = lojaAtualizada;

      res.status(200).json({
        success: true,
        message: 'Loja atualizada com sucesso',
        data: lojaAtualizadaSemSenha,
      });
    } catch (error) {
      console.error(`Erro ao atualizar loja com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar loja',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      // Validar ID
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID não fornecido',
          message: 'É necessário fornecer um ID válido',
        });
      }

      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({
          success: false,
          error: 'Recurso não encontrado',
          message: 'Loja não encontrada',
        });
      }

      // Armazenar informações da loja antes de remover (sem a senha)
      const { senha, ...lojaSemSenha } = loja;

      await this.lojaRepositorio.remove(loja);

      res.status(200).json({
        success: true,
        message: 'Loja removida com sucesso',
        data: lojaSemSenha,
      });
    } catch (error) {
      console.error(`Erro ao remover loja com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao remover loja',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      // Validar dados de entrada
      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          error: 'Dados incompletos',
          message: 'Email e senha são obrigatórios',
        });
      }

      // Validar formato do email
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          error: 'Formato inválido',
          message: 'O formato do email é inválido',
        });
      }

      // Busca a loja pelo email
      const loja = await this.lojaRepositorio.findOne({
        where: { email },
      });

      if (!loja) {
        // Não revelar que o email não existe por segurança
        return res.status(401).json({
          success: false,
          error: 'Autenticação falhou',
          message: 'Email ou senha inválidos',
        });
      }

      // Verifica a senha
      const senhaCorreta = await bcrypt.compare(senha, loja.senha);
      if (!senhaCorreta) {
        return res.status(401).json({
          success: false,
          error: 'Autenticação falhou',
          message: 'Email ou senha inválidos',
        });
      }

      // Gera o token JWT
      const token = this.authService.gerarToken(loja);

      // Retorna o token e os dados da loja (sem a senha)
      const { senha: _, ...lojaSemSenha } = loja;

      // Log de login bem-sucedido (para fins de auditoria)
      console.log(`Login bem-sucedido para o usuário: ${email} (ID: ${loja.id_loja})`);

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          loja: lojaSemSenha,
          token,
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        error: 'Erro no processo de login',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
