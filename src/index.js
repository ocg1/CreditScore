import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


var c = () => {
    var amanda =
        {
            name: "Amanda",
            creditInfos :
            [
                { name: "Payslips", fromDate: "" },
                { name: "Payroll account", fromDate: "" }
            ]
    }

    var initialData = amanda
    ReactDOM.render(<App data={initialData} />, document.getElementById('root'));
}
c();
registerServiceWorker();
