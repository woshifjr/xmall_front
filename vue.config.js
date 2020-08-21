const fs=require('fs');
module.exports = {
    devServer:{
        before(app,serve){
            app.get('/api/goods/home',(req,res)=>{
                fs.readFile('./db/home.json','utf8',(err,data)=>{
                    if(!err){
                        res.json(JSON.parse(data))
                    }
                })
            })
        }
    }
}