const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//添加到购物车
router.get('/addCart',(req,res)=>{
	var obj=req.query;
	console.log(obj);
	//执行sql语句
	var sql="INSERT INTO shoppingcart SET ?";
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:1});
		}else{
			res.send({code:-1});
		}
	})
})
//当添加数量大于1时更新购物车商品数量数据
router.get('/updateCart',(req,res)=>{
	var uid=req.query.uid;
	var pid=req.query.pid;
	var count=req.query.count;
	//执行sql语句
	var sql="UPDATE shoppingcart SET count=? WHERE uid=? AND pid=?";
	pool.query(sql,[count,uid,pid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:1});
		}else{
			res.send({code:-1});
		}
	})
})


//查询购物车
router.get('/searchCart',(req,res)=>{
	var uid=req.query.uid;
	var sql="SELECT * FROM shoppingcart WHERE uid=?";
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,msg:result});
		}else{
			res.send({code:-1})
		}
	})
})

//-号删除单个商品
router.get('/delItem',(req,res)=>{
	var pid=req.query.pid;
	console.log(pid);
	//执行sql语句
	var sql="DELETE FROM shoppingcart WHERE pid=?"
	pool.query(sql,[pid],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0){
			res.send({code:1});
		}else{
			res.send({code:-1})
		}
	})
})
//删除多个商品
router.get('/delAll',(req,res)=>{
	var ids=req.query.ids
	console.log(ids);
	//执行sql语句
	var sql=`DELETE FROM shoppingcart WHERE pid in(${ids})`
	pool.query(sql,[ids],(err,result)=>{
		if(err)throw err;
		if(result.affectedRows>0){
			res.send({code:1,msg:"删除成功"});
		}else{
			res.send({code:-1,msg:"删除失败"})
		}
	})
})





module.exports=router;