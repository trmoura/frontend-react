import React, { } from 'react'

import Login from '../views/login'
import CadastroUsuarios from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos'
import Home from '../views/home'

import { Route, Switch, HashRouter } from 'react-router-dom'



function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/Home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastroUsuario" component={CadastroUsuarios} />
                <Route path="/consultaLancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastroLancamentos/:id" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas

