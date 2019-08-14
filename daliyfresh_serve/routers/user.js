const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//1：注册路由
router.post('/reg',(req,res)=>{
  var obj=req.body;
  console.log(obj);
	//执行sql语句
  var sql="INSERT INTO user SET ?";
  pool.query(sql,[obj],(err,result)=>{
	if(err) throw err;
	console.log(result);
	if(result.affectedRows>0){
		res.send({code:1});
	}else{
		res.send({code:-1});
	}
  })
})
//2：验证用户名是否已注册
router.get('/yz_reg',(req,res)=>{
  var uname=req.query.uname;	
  console.log(uname);
	//执行sql语句
  var sql="SELECT * FROM user WHERE uname=?";
  pool.query(sql,[uname],(err,result)=>{
	if(err) throw err;
	console.log(result);
	if(result.length>0){
		res.send({code:1});
	}else{
		res.send({code:-1});
	}
  })
})
//3:登录验证
 router.post('/login',(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  // console.log(uname,upwd);
	//执行sql语句
  var sql="SELECT * FROM user WHERE uname=? AND upwd=?";
  pool.query(sql,[uname,upwd],(err,result)=>{
	// console.log(result)
	if(err) throw err;
	
	if(result.length>0){
		var uid=result[0].uid;
		res.send({code:1,uid:uid});
	}else{
		res.send({code:-1});
	}
  })
})

module.exports=router;