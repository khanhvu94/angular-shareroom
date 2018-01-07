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
}
