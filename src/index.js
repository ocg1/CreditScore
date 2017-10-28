import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


var c = () => {
    var initialData =
        [
            { name: "Payslips", fromDate: "" },
            { name: "Payroll account", fromDate: "" }
        ]
    ReactDOM.render(<App list={initialData} />, document.getElementById('root'));
}
c();
registerServiceWorker();
