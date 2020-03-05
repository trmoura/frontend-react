import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'
class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
            mensagemSucesso(`Bem vindo,  ${response.data.nome}`)
        }).catch(erro => {
            mensagemErro(erro.response.data)           
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastroUsuario')
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="txEmail">
                                                <input id="txEmail"
                                                    type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    arial-describeby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="txSenha">
                                                <input id="txSenha"
                                                    type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control"
                                                    arial-describeby="senhaHelp"
                                                    placeholder="Digite a senha" />
                                            </FormGroup>

                                            <div className="row">
                                                <div style={{ padding: '0 5px 0 0', marginLeft: '15px' }}>
                                                    <button onClick={this.entrar}
                                                        className="btn btn-primary">
                                                        <i className="pi pi-sign-in"></i>Entrar</button>
                                                </div>
                                                <div>
                                                    <button onClick={this.prepareCadastrar}
                                                        className="btn btn-info">
                                                        <i className="pi pi-plus"></i>Cadastrar
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

export default withRouter(Login)
