import React from 'react';
import ReactDOM from 'react-dom';
import DeathStarLookup from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/fonts.css';
import './css/index.css';

ReactDOM.render(<DeathStarLookup />, document.getElementById('root'));

/*
  TODO: Refatorar todas as chamadas para a Consumer da
        Context API para utilizar o novo useContext() Hook
*/
