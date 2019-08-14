const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//1:获取首页商品表数据
router.get("/homeProduct",(req,res)=>{
	var cno=req.query.cno;
	console.log(cno);
	var sql="SELECT * FROM product WHERE cid=?";
	pool.query(sql,[cno],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:-1});
		}		
	})
});
//2:获取商品分类表数据
router.get("/classify",(req,res)=>{
	var sql="SELECT * FROM classify";
	pool.query(sql,[],(err,result)=>{
		if(err){
			console.log(err);
			res.send({code:0});
		  }else{
			res.send(result);
		  }
	})
})
//3:获取商品分类表商品数据
router.get("/classifyProduct",(req,res)=>{
	var cno=req.query.cno;
	console.log(cno);
	var sql="SELECT * FROM home_product WHERE cid=?";
	pool.query(sql,[cno],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:-1});
		}		
	})
});


module.exports=router;