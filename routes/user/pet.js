import express from "express";

import petModel from "../../models/petSchema.js";

const petRouter = express.Router();

petRouter.get("/pets", async (req,res) => {
    let result;
    try{
        result = await petModel.find();
        if(result){ res.status(200).json({
            result,
            status: true,
            message: "pets fetched successfully"
        })
        }
        else{
            res.status(404).json({
                status: false,
                message: "Unable to fetch Data"
            })
        }
        
    }catch(err){
        res.status(504).json({
            status: false,
            message: "Error while connecting Database"
        })
        return;
    }

});

export default petRouter;
