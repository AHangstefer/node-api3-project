
module.export = (format)=> {
     return (req,res, next)=> {
         const time = new Date().toString()
         switch (format){

             case"short":
                 console.log(`[${time}] &  ${req.method}`)
                     res.status(200).json({
                         message: "it's ALIVE from short"
                     })
                     break

                 case "long":
                    console.log(`[${time}] & ${req.ip} ${req.method} ${req.url}`)
                        res.status(200).json({
                            message: "it's ALIVE from long"
                        })
                        break
                }
        next()
    }
} 