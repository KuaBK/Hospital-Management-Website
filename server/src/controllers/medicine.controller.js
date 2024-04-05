const Medicine = require("../models/medicine.model");

module.exports.index = async (req, res) => {
    const medicines = await Medicine.find({name: new RegExp(req.query.keyword, "i")})
    res.json(medicines)
}

module.exports.create = async (req, res) => {
    const nameCheck = await Medicine.find({name: req.body.data.name});
    if (nameCheck == 0) {
        if (req.body.data.name == "") {
            res.end("Vui lòng cung cấp tên của thuốc");
        } else if (req.body.data.quantity == "") {
            res.end("Vui lòng cung cấp số lượng của thuốc");
        } else if (req.body.data.expire == "") {
            res.end("Vui lòng cung cấp ngày hết hạn của thuốc");
        } else {
            req.body.data.data = [req.body.data.data];
            const medicine = await new Medicine(req.body.data);
            await medicine.save();
            res.send("Success");
        }
    } else {
        res.end("Thuốc đã tồn tại trong hệ thống");
    }
}

module.exports.update = async (req, res) => {
    const medicine = await Medicine.findOne({_id: req.body.data.id, "data.expire": req.body.data.data.expire});
    if (medicine) {
        await Medicine.updateOne(
            {_id: req.body.data.id, "data.expire": req.body.data.data.expire},
            {$inc: {"data.$.quantity": parseInt(req.body.data.data.quantity)}}
        );
    } else {
        await Medicine.updateOne(
            {_id: req.body.data.id},
            {$push: {data: {
                $each: [req.body.data.data],
                $sort: {expire: 1}
            }} }
        );
    }
    
    res.send("Success");
}

module.exports.delete = async (req, res) => {
    await Medicine.findByIdAndDelete(req.query.id);
    res.send("Success");
}