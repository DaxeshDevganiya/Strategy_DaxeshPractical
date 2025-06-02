const db= require("./dbConfig");
let db_query=(query,data)=>{
    return new Promise((resolve,reject)=>{
        return data?db.query(query,data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        }):db.query(query,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports=db_query