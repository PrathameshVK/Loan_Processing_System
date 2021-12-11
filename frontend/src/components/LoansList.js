import React from 'react';
import LoanInfo from '../components/LoanInfo';

export default function LoansList({loanList}) {
    return (
        <div>
        {
            loanList.length>0 ?
            loanList.map((item, key) => {
          return item.loansApplied.map((loanData, key) => {
            return <LoanInfo key={loanData._id} loanData={loanData} />;
          });
        }):<h2>You haven't applied for any loans yet...</h2>
        }
        </div>
    )
}
