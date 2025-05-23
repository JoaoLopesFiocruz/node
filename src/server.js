const express=require("express");
const app= express();

const PORT=3333;

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});

app.get("/mensage/:id",(req,res)=>{
    res.send(`id da mensagem: ${req.params.id}`)
})