import mongoose from "mongoose";


const loanSchema=new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    loansApplied:[{
        username: String,
        address: String,
        PAN: String,
        loanAmount: Number,
        tenure: Number,
        EMI: Number,
        status: String 
    }]
});

export const Loan=mongoose.model("Loan",loanSchema);