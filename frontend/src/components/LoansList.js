import React from 'react';
import LoanInfo from '../components/LoanInfo';

export default function LoansList({loanList}) {
    return (
        <div>
        {
            loanList &&
            loanList.map((item, key) => {
          return item.loansApplied.map((loanData, key) => {
            return <LoanInfo key={loanData._id} loanData={loanData} />;
          });
        })
        }
        </div>
    )
}
