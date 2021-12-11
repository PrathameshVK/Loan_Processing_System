import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {Loan} from './models/Loan.js';

dotenv.config();
const port=process.env.PORT || 8000;

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.LOAN_DB_URI,{
    useNewUrlParser:true,
})

app.post('/read',async (req,res)=>{
    const user=req.body.user;
    Loan.find({userid: {$eq: user}},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

app.post('/add',async (req,res)=>{
    const userId=req.body.userid
    const userName=req.body.name;
    const address=req.body.address;
    const pan=req.body.pan;
    const loanAmount=req.body.loanAmount;
    const tenure=req.body.tenure;
    const emi=req.body.emi;
    Loan.updateOne({userid: userId},
        {$push: { loansApplied: [
            {
                username: userName,
                address: address,
                PAN: pan,
                loanAmount: loanAmount,
                tenure: tenure,
                EMI: emi,
                status: "Processing"
            }
        ]}},{upsert: true, new: true, setDefaultsOnInsert: true},
            (err,result)=>{
                if(err){
                    res.send(err);
                }
                res.send(result);
            })
});

app.post('/delete',async (req,res)=>{
    const userId=req.body.userid;
    const id=req.body.id;
    Loan.updateOne({userid: userId},
    {
        $pull : {
            loansApplied : {
                _id:id
            }
        }
    },(err,result)=>{
        if(err){
            res.send(err);
        }
    });
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

export default app;