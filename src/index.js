import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };

var c = () => {
    var amanda =
        {
            name: "Amanda Jensen",
            creditInfos:
            [
                { name: "Birth year", kind: "BIRTH_CERTIFICATE", data: { birth_date: new Date(1990, 4, 16) }},
                { name: "Payroll account", kind: "ACCOUNT", data: { monthlySavings: 3227.00, url: "amandaTransactions.json" } },
                { name: "Payslips", kind: "PAYSLIP", data: { pay: 33523 } },
                { name: "Debt report", kind: "DEBT", data: { total: 1000000 } },
                { name: "Assets ", kind: "ASSETS", data: { total: 1100000 } },
                { name: "Pension report", kind: "PENSION", data: { total: 200000 } },
                { name: "Debt history", kind: "DAYS_SINCE_LAST_MISSED", data: { daysSinceLastMissed: 100 } },
                { name: "Last debt application", kind: "DAYS_SINCE_LAST_DEBT_APPLICATION", data: { daysSinceLastApplication: 50 } },
            ]
        }

    var initialData = amanda
    ReactDOM.render(<App data={initialData} />, document.getElementById('root'));
}
c();
registerServiceWorker();
