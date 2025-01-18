const express= require('express');
const router= express.Router();
const Person= require("../models/person");



router.get("", async(req, res)=>{
    try{
        const data= await Person.find();
        console.log("data fetched");
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});


    }

})

router.post('', async(req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);
        const response= await newPerson.save();
        console.log('data is saved');
        res.status(200).json(response);


    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.put("/:id", async(req,res)=>{
    try{
        const id= req.params.id;
        const data= req.body;
        const personData= await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
    })
       if(!personData){
        return res.status(404).json('Person not found')
       }
       console.log("data updated")
       res.status(200).json(personData);

    }
    catch(err){
          console.log(err);
          res.status(500).json({err: 'Internal Server Error'})
    }
})


router.delete("/:id", async(req, res)=>{
    try{
        const id= req.params.id;
        const resp= await Person.findOneAndDelete(id);

        if(!resp){
            return res.status(404).json("Person not found")
        }

        console.log("Person data deleted successfully")
        res.status(200).json(resp);


    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'})

    }
})


router.get("/:worktype", async(req, res)=>{
    try{
        const workType= req.params.worktype;
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response= await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error: 'Invalid work type'})
        }


    }
    catch{
        console.log(err);
        res.status(500).json({500: 'Internal Server Error'})

    }
})

module.exports= router;