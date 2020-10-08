const userDb = require("../users/userDb")

function validateUserID(){
    return (req, res, next) => {
        userDb.getById(req.params.id)
            .then((user)=> {
                if (user) {
                    //we're ONLY varifying the user
                   // res.status(200).json(user)
                   next()
                }
                else {
                    res.status(404).json({
                        message: "User not found"
                    })
                }
            })
            .catch((err)=> {
                console.log(err)
                res.status(500).json({
                    message: "Error retrieving the user"
                })
            })
            
    }


}

module.export = {
    validateUserID
}