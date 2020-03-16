import React from 'react';
import Rotas from './rotas';
import NavBar from '../components/navbar'
import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import '../custom.css'

import 'toastr/build/toastr.css'

class App extends React.Component {


  render() {
    return (
      <div className="container">
        <NavBar />

        <Rotas />
      </div>

    )
  }
}

export default App;
