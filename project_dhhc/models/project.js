var db = require('../db/mssql');
module.exports = {
	getInfo:(para, cb)=>{
		var query = `exec pro_xemthongtin`;
		console.log(query);
		db.request().query(query,cb);
	},
		getSDT:(para, cb)=>{
		var query = `exec pro_timsdt '${para.sdt}'`;
		console.log(query);
		db.request().query(query,cb);
	},
		postdatxe:(para, cb)=>{
		var query = `exec pro_datxe '${para.sdt}','${para.ten}','${para.xuatphat}','${para.diemden}','${para.loaixe}'`;
		console.log(query);
		db.request().query(query,cb);
	},
		postlogin:(para, cb)=>{
		var query = `exec pro_login '${para.user}','${para.pass}'`;
		console.log(query);
		db.request().query(query,cb);
	},
}
