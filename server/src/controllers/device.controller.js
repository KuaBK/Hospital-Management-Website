const Device = require("../models/device.model");

module.exports.index = async (req, res) => {
    const devices = await Device.find({name: new RegExp(req.query.keyword, "i")})
    res.json(devices)
}

module.exports.create = async (req, res) => {
    if (req.body.data.name === "") {
        res.end("Vui lòng cung cấp tên của thiết bị");
    } else if (req.body.data.status === "Chọn tình trạng") {
        res.end("Vui lòng cung cấp tình trạng của thiết bị");
    } else if (req.body.data.availability !== "Có" && req.body.data.availability !== "Không") {
        res.end("Vui lòng cung cấp sẵn có của thiết bị");
    } else {
        const device = new Device(req.body.data);
        await device.save();
        res.send("Success");
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
    await Device.findByIdAndDelete(req.query.id);
    res.send("Success");
}