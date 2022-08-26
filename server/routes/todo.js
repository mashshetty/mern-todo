const router = require('express').Router();

const todomodel = require('../models/todoItems');

router.get("/", async (req,res)=>{
    try{
        const data = await todomodel.find({});
        res.status(200).json(data);
        

    }catch(err){
        res.json(err);
    }
   
})

router.post("/", async(req,res)=>{
    try{
        const data = await new todomodel({
            item: req.body.item
        })
        const saveitem = await data.save()
        res.status(200).json(saveitem);

    }catch(err){
        res.json(err);
    }
})

router.put("/:id", async(req,res)=>{
    try{
        const data = await todomodel.findByIdAndUpdate(req.params.id, {$set :req.body} );

        res.status(200).json(data);
    }
    catch(err){
        res.status(200).json(err);
    }
})

router.delete("/:id", async (req,res)=>
{
    try{
        const data =await todomodel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    }catch(err){
        res.json(err);
    }
})





module.exports = router;