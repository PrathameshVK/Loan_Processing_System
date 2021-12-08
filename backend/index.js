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



mongoose.connect(process.env.LOAN_DB_URI,{
    useNewUrlParser:true,
})

app.post('/insert',async (req,res)=>{
    const userName=req.body.name;
    const address=req.body.address;
    const pan=req.body.pan;
    const loanAmount=req.body.loanAmount;
    const tenure=req.body.tenure;
    const loan=new Loan({
        userid: "xcgjdser89dfs_er3ks",
        loansApplied: [
            {
                username: userName,
                address: address,
                PAN: pan,
                loanAmount: loanAmount,
                tenure: tenure,
                EMI: 1000,
                status: "Approved"
            }
        ]
    });
    try{
        await loan.save();
        res.send("data inserted");
    }catch(err){
        console.error(err);
    }
});

app.get('/read',async (req,res)=>{
    Loan.find({userid:"xcgjdser89dfs_er3ks"},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

app.post('/add',async (req,res)=>{
    const userName=req.body.name;
    const address=req.body.address;
    const pan=req.body.pan;
    const loanAmount=req.body.loanAmount;
    const tenure=req.body.tenure;
    Loan.updateOne({userid: "xcgjdser89dfs_er3ks"},
        {$push: { loansApplied: [
            {
                username: userName,
                address: address,
                PAN: pan,
                loanAmount: loanAmount,
                tenure: tenure,
                EMI: 1000,
                status: "Approved"
            }
        ]}},
            (err,result)=>{
                if(err){
                    res.send(err);
                }
                res.send(result);
            })
});

app.post('/delete',async (req,res)=>{
    const id=req.body.id;
    Loan.updateOne({userid: "xcgjdser89dfs_er3ks"},
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