const userDb = require("../users/userDb")


// for ending with :id // ex: api/users/:id
function validateUserID(){
    return (req, res, next) => {
        userDb.getById(req.params.id)
            .then((user)=> {
                if (user) {
                    //we're ONLY varifying the user
                   // res.status(200).json(user)
                   //adding the line below so that user will be 
                   //defined when calling this function 
                   req.user = user
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
};



function validateUser() {
    return (req, res, next) => {

        
        ///ask about body bc this error doesn't show up
        if(!req.body) {
            return res.status(400).json({
                message: "missing user data"
            })
         
        }
        if (!req.body.name) {
            return res.status(400).json({
                message: "missing required name field"
            })

        }
        else {
            next()
        }
         

   }
}
  
  function validatePost() {
        return (req, res, next) => {

            if(!req.body) {
                return res.status(400).json({
                    message: "missing post data"
                })
             
            }
            if (!req.body.text) {
                return res.status(400).json({
                    message: "missing required text field"
                })
    
            }
            else {
                next()
            }
        }
  };

module.exports = {
    validateUserID,
    validateUser,
    validatePost
}
