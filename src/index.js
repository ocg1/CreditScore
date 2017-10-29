import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


var c = () => {
    var amanda =
        {
            name: "Amanda Jensen",
            creditInfos:
            [
                { name: "Birth year", kind: "BIRTH_CERTIFICATE", data: { birth_date: new Date(1990, 4, 16) }},
                { name: "Payroll account", kind: "ACCOUNT", data: { monthlySavings: 1000 } },
                { name: "Payslips", kind: "PAYSLIP", data: { pay: 33523 } },
                { name: "Debt report", kind: "DEBT", data: { total: 1000000 } },
                { name: "Assets ", kind: "ASSETS", data: { total: 1100000 } },
                { name: "Pension report", kind: "PENSION", data: { total: 200000 } },
                { name: "Debt history", kind: "DAYS_SINCE_LAST_MISSED", data: { daysSinceLastMissed: 100 } },
                { name: "Last debt application", kind: "DAYS_SINCE_LAST_DEBT_APPLICATION", data: { daysSinceLastApplication: 50 } },
                // last missed payment
                // last applied for a loan
                // delinquent 
                // credit cards
                // { name: "Life insurance", kind: "LIFE_INSURANCE", data: {} },
                // {
                //     name: "Unemployment Insurance Fund Membership(A-kasse)",
                //     kind: "UNEMPLOYMENT_INSURANCE", data: {}
                // },
            ]
        }

    var initialData = amanda
    ReactDOM.render(<App data={initialData} />, document.getElementById('root'));
}
c();
registerServiceWorker();
