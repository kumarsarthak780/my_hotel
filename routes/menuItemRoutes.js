const express= require("express");
const router= express.Router();
const Menu= require("../models/menu")




router.get("", async(req, res)=>{

    try{
        const data= await Menu.find();
        console.log("all menu are fetched");
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);

        res.status(500).json({err: 'Internal Server Error'});

    }
})

router.post("", async(req, res)=>{
    try{
          const data= req.body;
          const newMenuItem= new Menu(data);
          const saveddata=  await newMenuItem.save();
          console.log("data is saved");
          res.status(200).json({saveddata})
    }
    catch(err){
          console.log(err);
          res.status(500).json({error: 'Internal Sever Error'})
    }
})





router.put("/:id", async(req, res)=>{
    try{
        const id= req.params.id;
        const data= req.body;
        const updatedmenu= await Menu.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if(!updatedmenu){
            return res.status(404).json("Menu not found");
        }

        console.log("menu info is updated");
        res.status(200).json(updatedmenu);

    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'})

    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const id= req.params.id;
        const resp= await Menu.findOneAndDelete(id);

        if(!resp){
            return res.status(404).json("Menu not found")
        }

        console.log("Menu data deleted successfully")
        res.status(200).json(resp);


    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'})

    }
})
// comment added for testing purpose

//second changes made

//third changed made

//fourth changes made

module.exports= router;
