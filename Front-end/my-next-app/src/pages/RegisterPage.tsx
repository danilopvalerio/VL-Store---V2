import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/RegisterPage.module.css';
import { IMaskInput } from 'react-imask';

import { StoreRegistration as StoreRegistrationData } from '../domain/interfaces/store-registration-interface';
import { 
  isValidEmail, 
  isValidCpfCnpj, 
  isValidPassword,
  extractDigitsOnly,
  convertToISODate
} from '../utils/validationUtils';
import Link from 'next/link';


const StoreRegistration: React.FC = () => {
  const router = useRouter();
  
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!storeName || !password || !email || !cpfCnpj || !birthDate || !telephone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Formato de e-mail inválido.');
      return;
    }

    if (!isValidCpfCnpj(cpfCnpj)) {
      setError('CPF/CNPJ inválido. Deve conter 11 dígitos para CPF ou 14 para CNPJ.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
      return;
    }

    const storeData: StoreRegistrationData = {
      nome: storeName,
      senha: password,
      email,
      cpf_cnpj_proprietario_loja: extractDigitsOnly(cpfCnpj),
      data_nasc_proprietario: new Date(convertToISODate(birthDate)).toISOString(),
      telefone: extractDigitsOnly(telephone)
    };

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:9700/api/lojas", 
        storeData
      );
      
      setSuccess(true);
      setLoading(false);
      
      setTimeout(() => {
        router.push('/authPage');
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setError('Dados inválidos. Verifique as informações fornecidas.');
        } else if (error.response.status === 409) {
          setError('E-mail ou CPF/CNPJ já cadastrado.');
        } else {
          setError(`Erro no cadastro: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
        }
      } else {
        setError('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerPanel}>
        <img src="/vlStore.svg" alt="Logo" className={styles.logo} />
      </div>
      
      <div className={styles.loginBlock}>
        <div className={styles.column}>
          <div className={styles.welcomePanel}>
            <h1>Cadastro de Loja</h1>
          </div>
          
          <div className={styles.formPanel}>
            {success && (
              <div className="success-message">
                Loja cadastrada com sucesso! Redirecionando para o login...
              </div>
            )}
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="storeName">Nome da loja</label>
                <input
                  type="text"
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  disabled={loading}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cpfCnpj">CPF/CNPJ</label>
                <IMaskInput
                  mask={[
                    {
                      mask: '000.000.000-00',
                      lazy: false,
                    },
                    {
                      mask: '00.000.000/0000-00',
                      lazy: false,
                    },
                  ]}
                  id="cpfCnpj"
                  value={cpfCnpj}
                  onAccept={(value: string) => setCpfCnpj(value)}
                  disabled={loading}
                  placeholder="Digite o CPF ou CNPJ"
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="birthDate">Data de Nascimento</label>
                <IMaskInput
                  mask="00/00/0000"
                  placeholder="dd/mm/aaaa"
                  className="form-control"
                  id="birthDate"
                  value={birthDate}
                  onAccept={(value: string) => setBirthDate(value)}
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telephone">Telefone</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  id="telephone"
                  value={telephone}
                  onAccept={(telephone: string) => setTelephone(telephone)}
                  className="form-control"
                  placeholder="Ex: (11) 99999-9999"
                  disabled={loading}
                />
              </div>

            
              
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="form-control"
                />
                <small>Mínimo de 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="form-control"
                />
              </div>
              
              <div className="form-buttons row">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`btn ${styles.btnPrimary}`}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </div>
            </form>
            
            <div className="login-link">
              Já tem uma conta? <Link href="/authPage">Faça login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRegistration;