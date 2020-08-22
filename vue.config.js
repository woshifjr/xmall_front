const fs=require('fs');


//分页
/**
 * 
 * @param {*当前页数量} pageSize
 * @param {*当前页} currentPage
 * @param {*当前数组} arr
 * 
 */
function pagination(pageSize, currentPage, arr){
    let skipNum = (currentPage - 1) * pageSize;
    let newArr = (skipNum + pageSize >= arr.length) ? arr.splice(skipNum,arr.length) : arr.splice(skipNum, skipNum + pageSize);
    return newArr;
}

//升序还是降序
/**
 * 
 * @param {*排序的属性} attr
 * @param {*true表示升序排序 false表示降序排序} rev
 */
function sortBy(attr, rev){
    if(rev === undefined) {
        rev = 1;
    } else {
        rev = rev ? 1 : -1;
    }
    return function (a, b){
        a = a[attr];
        b = b[attr];
        //升序
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    }
}

function range(arr, gt, lte) {
    return arr.filter(item => item.salePrice >= gt && item.salePrice <= lte)
}

module.exports = {
    devServer:{
        before(app,serve){
            app.get('/api/goods/home',(req,res)=>{
                fs.readFile('./db/home.json','utf8',(err,data) => {
                    if(!err){
                        res.json(JSON.parse(data))
                    }
                })
            })
            app.get('/api/goods/allGoods',(req,res) => {
                //获取查询参数
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                const sort = parseInt(req.query.sort);
                const gt = parseInt(req.query.priceGt);
                const lte = parseInt(req.query.priceLte);
                const cid = req.query.cid;
                let newData = [];
                fs.readFile('./db/allGoods.json','utf8',(err,data) => {
                    let {result} = JSON.parse(data);
                    let allData = result.data;
                    //分页显示
                    newData = pagination(size,page,allData);
                    if (cid === '1184') {
                        //品牌周边
                        newData = allData.filter((item) => item.productName.match(RegExp(/Smartisan/)));
                        if (sort === 1){//价格由低到高
                            newData = newData.sort(sortBy('salePrice',true));
                        } else if (sort === -1) {//价格由高到低
                            newData = newData.sort(sortBy('salePrice',false));
                        }
                    } else {
                        if (sort === 1){//价格由低到高
                            newData = newData.sort(sortBy('salePrice',true));
                        } else if (sort === -1) {//价格由高到低
                            newData = newData.sort(sortBy('salePrice',false));
                        }
                        if (gt && lte){
                            //过滤
                            newData = range(newData, gt, lte)
                        }
                    }
                    if(newData.length < size) {
                        res.json({
                            data: newData,
                            total: newData.length
                        })
                    }else {
                        res.json({
                            data: newData,
                            total: allData.length
                        })
                    }
                })
            })
            app.get('/api/goods/goodsDetail',(req, res) => {
                const productId=Number(req.query.productId);
                fs.readFile('./db/goodsDetail.json', 'utf8', (err, data) => {
                    if(!err) {
                        let {result} = JSON.parse(data);
                        let newData = result.find(item => item.productId == productId);
                        res.json(newData);
                    }
                })
            })
        }
    }
}
