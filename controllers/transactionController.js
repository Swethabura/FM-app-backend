const Transaction = require("../models/transaction");

// add a new transaction
exports.createTransaction = async (req,res) => {
    try{
        const {amount, date, description} = req.body;
        const newTransaction = new Transaction({amount,date,description});
        const saved = await newTransaction.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(500).json({error:"Failed to add transaction"});
    }
};

// get all transactions
exports.getTransactions = async (req,res) => {
    try{
        const transaction = await Transaction.find().sort({date:-1});
        res.status(200).json(transaction);
    }catch(err){
        res.status(500).json({error:"Failed to fetch transactions"});
    }
};

// update a transaction
exports.updateTransaction = async (req,res) => {
    try{
        const updated = await Transaction.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updated);
    }catch(err){
        res.status(500).json({error:"Failed to update transaction"});
    }
};

// delete a transaction
exports.deleteTransaction = async (req,res) => {
    try{
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Transaction deleted"});
    }catch(err){
        res.status(500).json({error:"Failed to delete transaction"});
    }
};