import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import LancamentosTable from './lacamentoTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'
import SelectMenu from '../../components/selectMenu'
import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showModalDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {      
        this.sugerirAnoAtual();
    }

    buscar = () => {

        if (!this.state.ano) {
            messages.mensagemErro('Campo Obrigatório:  Ano')
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastroLancamentos/${id}`)
        console.log('Editando', id)

    }

    confirmacaoExclusao = (lancamento) => {
        this.setState({ showModalDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarExclusao = (lancamento) => {
        this.setState({ showModalDialog: false, lancamentoDeletar: {} })
    }

    excluir = (lancamento) => {
        this.service
            .excluir(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState({ lancamentos: lancamentos, showModalDialog: false })
                messages.mensagemSucesso('Regsitro excluído com sucesso.')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar excluir o registro.')
            })
    }

    navegarParaCadastro = (event) => {
        this.props.history.push('/cadastroLancamentos');
    }

    sugerirAnoAtual = () => {
        let dataAtual = new Date()
        let anoAtual = dataAtual.getFullYear();
        this.setState({ ano: anoAtual });
    }

    render() {

        const meses = this.service.obterMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.excluir} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarExclusao} />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano :">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    arial-describeby="anoHelp"
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputDesc" label="Descrição :">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    arial-describeby="descricaoHelp"
                                    placeholder="Pesquise por Descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês :">
                                <SelectMenu id="inputMes"
                                    className="form-control"
                                    lista={meses}
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento :">
                                <SelectMenu id="inputTipo"
                                    className="form-control"
                                    lista={tipos}
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: '15px' }} onClick={this.navegarParaCadastro}>Cadastrar</button>

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deleteAction={this.confirmacaoExclusao}
                                editAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showModalDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        modal={true}
                        onHide={() => this.setState({ showModalDialog: false })}>
                        Confirma a Exclusão do registro selecionado?
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);