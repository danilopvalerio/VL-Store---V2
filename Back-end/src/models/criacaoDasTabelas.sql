CREATE TABLE loja (
    id_loja VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(25) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf-cnpj_proprietario_loja VARCHAR(20) NOT NULL UNIQUE,
    data_nasc_proprietario DATE NOT NULL,
    telefone VARCHAR(11) NOT NULL
);

CREATE TABLE Produto (
    referencia VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    material VARCHAR(100),
    genero VARCHAR(50),
    id_loja VARCHAR(100),
    FOREIGN KEY (id_loja) REFERENCES loja(id_loja)
);

CREATE TABLE Produto_variacao (
    id_variacao VARCHAR(100) PRIMARY KEY,
    id_produto VARCHAR(100) NOT NULL,
    descricao_variacao TEXT,
    quant_variacao INT,
    valor DECIMAL(10, 2),
    FOREIGN KEY (id_produto) REFERENCES Produto(referencia)
);

CREATE TABLE Funcionario (
    cpf VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    id_loja VARCHAR(100),
    FOREIGN KEY (id_loja) REFERENCES loja(id_loja)
);

CREATE TABLE Caixa (
    id_caixa VARCHAR(100) PRIMARY KEY,
    data_abertura DATE NOT NULL,
    hora_abertura TIME NOT NULL,
    hora_fechamento TIME,
    funcionario_responsavel VARCHAR(20),
    id_loja VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (funcionario_responsavel) REFERENCES Funcionario(cpf),
    FOREIGN KEY (id_loja) REFERENCES loja(id_loja)
);

CREATE TABLE Venda (
    id_venda VARCHAR(100) PRIMARY KEY,
    forma_pagamento VARCHAR(50) NOT NULL,
    funcionario_responsavel VARCHAR(20),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    id_caixa VARCHAR(100),
    id_loja VARCHAR(100),
    desconto DECIMAL(10, 2),
    acrescimo DECIMAL(10, 2),
    status_venda VARCHAR(50) NOT NULL,
    FOREIGN KEY (funcionario_responsavel) REFERENCES Funcionario(cpf),
    FOREIGN KEY (id_caixa) REFERENCES Caixa(id_caixa),
    FOREIGN KEY (id_loja) REFERENCES loja(id_loja)
);

CREATE TABLE ItemVenda (
    id_itemVenda VARCHAR(100) PRIMARY KEY,
    id_venda VARCHAR(100),
    id_variacao VARCHAR(100),
    quantidade_item INT,
    FOREIGN KEY (id_venda) REFERENCES Venda(id_venda),
    FOREIGN KEY (id_variacao) REFERENCES Produto_variacao(id_variacao)
);

CREATE TABLE Movimentacao (
    id VARCHAR(100) PRIMARY KEY,
    descricao TEXT,
    tipo VARCHAR(50),
    valor DECIMAL(10, 2),
    idCaixa VARCHAR(100),
    idVenda VARCHAR(100),
    FOREIGN KEY (idCaixa) REFERENCES Caixa(id_caixa),
    FOREIGN KEY (idVenda) REFERENCES Venda(id_venda)
);
