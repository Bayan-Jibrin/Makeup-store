const Joi = require('joi');

const prodSchema = Joi.object({
    name:Joi.string().required(),
    brand:Joi.string().required(),
    price:Joi.string().required(),
    description:Joi.string().required(),
    productType:Joi.string().required(),
    image_link:Joi.string().required(),
})

const prodValidator =  ( req,res,next ) => {
    const { error ,value } = prodSchema.validate(req.body,{ abortEarly:false })
   
    if(error){
        const Er = error.details.map((element)=>element.message)
        res.status(400).json({error:Er})
    }else{
        next()
    }
    
     
}

module.exports = prodValidator

