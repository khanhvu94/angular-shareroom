var sql = require('mssql');
var config = {
    user : 'sa',
    password : 'thanhtam',
    server : 'DESKTOP-AMSEQ13',
    database : 'project_hcdh',
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    }
};
var connection = sql.connect(config, function(err){
    if(err){
      console.log('lỗi kết nối sql');
        throw(err);
    }
});

module.exports = connection;
