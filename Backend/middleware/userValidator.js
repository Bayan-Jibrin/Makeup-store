const Joi = require('joi');

const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 5,
  max: 25,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 6,
};

const signupSchema = Joi.object({
    email:Joi.string().email().required(),
    password: passwordComplexity(complexityOptions)
})

const userValidator =  ( req,res,next ) => {
    const { error ,value } = signupSchema.validate(req.body,{ abortEarly:false })
   
    if(error){
        const Er = error.details.map((element)=>element.message)
        res.status(400).json({error:Er})
    }else{
        next()
    }     
}

module.exports = userValidator
