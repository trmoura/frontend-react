import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuarios extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('Campo Nome é obrigatório.')
        }

        if (!this.state.email) {
            msgs.push('Campo E-mail é obrigatório.')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('informe um E-mail válido.')
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Preencha os campos Senha e Senha Confirmação.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('Campos Senha e Senha Confirmação diferentes.')
        }

        return msgs;

    }

    cadastrar = () => {
        const msgs = this.validar();
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        console.log('Chegou aqui');
        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Nome *" htmlFor="txNome">
                                                <input id="txNome"
                                                    name="nome"
                                                    type="text"
                                                    className="form-control"
                                                    arial-describeby="nomeHelp"
                                                    placeholder="Digite seu nome"
                                                    onChange={e => this.setState({ nome: e.target.value })} />
                                            </FormGroup>

                                            <FormGroup label="Email: *" htmlFor="txEmail">
                                                <input id="txEmail"
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    arial-describeby="emailHelp"
                                                    placeholder="Digite o Email"
                                                    onChange={e => this.setState({ email: e.target.value })} />
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="txSenha">
                                                <input id="txSenha"
                                                    name="senha"
                                                    type="password"
                                                    className="form-control"
                                                    arial-describeby="senhaHelp"
                                                    placeholder="Digite a senha"
                                                    onChange={e => this.setState({ senha: e.target.value })} />
                                            </FormGroup>

                                            <FormGroup label="Senha Confirmação: *" htmlFor="txSenhaRepeticao">
                                                <input id="txSenhaRepeticao"
                                                    name="senhaRepeticao"
                                                    type="password"
                                                    className="form-control"
                                                    arial-describeby="senhaRepeticaoHelp"
                                                    placeholder="Repita a senha"
                                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                                            </FormGroup>


                                            <div className="row">
                                                <div style={{ padding: '0 5px 0 0', marginLeft: '15px' }}>
                                                    <button onClick={this.cadastrar} className="btn btn-primary">
                                                        <i className="pi pi-sign-in"></i>Salvar
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onClick={this.cancelar}
                                                        className="btn btn-danger">
                                                        <i className="pi pi-plus"></i>Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>

                                    </div>
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}


export default withRouter(CadastroUsuarios)