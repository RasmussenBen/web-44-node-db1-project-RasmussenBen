const dbConfig = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const specificAccount = req.body

  if(!specificAccount.name || !specificAccount.budget){
    res.status(400).json({
      message:'Name and budget fields are required'
    })
  }
  else if(typeof specificAccount.name !== 'string' || specificAccount.name.length < 3 || specificAccount.name.length > 100 ){
    res.status(400).json({
      message:"Name field must be greater than 3 characters and less than 100"
    })
  }
  else if(typeof specificAccount.budget !== "number" || specificAccount.budget < 0 || specificAccount.budget > 1000000){
    res.status(400).json({
      message:"Budget field must be greater than 0 and less than 1000000"
    })
  }
  else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const acctId = req.params.id
    const account = await accounts.getById(acctId)

    if(!account) {
      res.status(404).json([]);
    }
    else {
      req.account = account;
      next();
    }
  }
  catch(error){
    res.status(500).json({
      message: 'Account name error'
    })
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const {name, budget} = req.body
    const checkAcctName = req.body.name
    const account = await accounts.forEach((acct) => {
      if(acct.name === checkAcctName){
        res.status(404).json({message: "Account name must be unique"})
      }
      else{
        req.account = account;
        next();
      }
    })
  }
  catch(error) {
    res.status(500).json({message: "Error"})
  }
}
