var dx = require('../models/project');
var express = require('express');
var router = express.Router();

router.get('/danhsach', function(req, res){
	dx.getInfo(req.params, function(err, result){
		if(err){
			console.log(err);
			res.json({ err: 1, msg : 'loi roi'});
		}else{
			res.json(result.recordsets);
		}
	});
});

router.get('/:sdt', function(req, res){
	console.log(req.params);
	dx.getSDT(req.params, function(err, result){
		if(err){

			console.log(err);
			res.json({ err: 1, msg : 'loi roi'});
		}else{
			res.json(result.recordsets);
		}
	});
});
router.post('/:datxe', function(req, res){
	console.log(req.params);
	dx.getSDT(req.params, function(err, result){
		if(err){
			console.log(err);
			res.json({ err: 1, msg : 'loi roi'});
		}else{
			res.json(result.recordsets);
		}
	});
});
module.exports = router;
