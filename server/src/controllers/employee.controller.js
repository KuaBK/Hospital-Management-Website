const Employee = require("../models/employee.model");

module.exports.index = async (req, res) => {
    const employees = await Employee.find({name: new RegExp(req.query.keyword, "i")})
    res.json(employees)
}

module.exports.detail = async (req, res) => {
    const data = await Employee.findById(req.params.employeeID);
    res.json(data);
}

module.exports.create = async (req, res) => {
    const phoneNumberCheck = await Employee.find({phone_number: req.body.data.phone_number});
    const check = await Employee.find(req.body.data);
    if (check.length == 0 && phoneNumberCheck == 0) {
        if (req.body.data.name == "") {
            res.end("Vui lòng cung cấp tên của nhân viên");
        } else if (req.body.data.age == "") {
            res.end("Vui lòng cung cấp tuổi của nhân viên");
        } else if (req.body.data.gender == "Chọn giới tính") {
            res.end("Vui lòng cung cấp giới tính của nhân viên");
        } else if (req.body.data.address == "") {
            res.end("Vui lòng cung cấp địa chỉ của nhân viên");
        } else if (req.body.data.phone_number == "") {
            res.end("Vui lòng cung cấp số điện thoại của nhân viên");
        } else if (req.body.data.specializaion == "") {
            res.end("Vui lòng cung cấp chuyên môn của nhân viên");
        } else {
            const employee = await new Employee(req.body.data);
            await employee.save()
            res.send("Success");
        }
    } else {
        if (check.length == 0) {
            res.end("Số điện thoại đã tồn tại trong hệ thống");
        } else {
            res.end("Nhân viên đã tồn tại trong hệ thống");
        }
    }
}

module.exports.update = async (req, res) => {
    let check = false;

    if (req.body.data) {
        await Employee.updateOne({_id: req.body.data.id}, req.body.data)
        check = true;
    }

    if (check) {
        res.end("Success");
    }
}

module.exports.delete = async (req, res) => {
    await Employee.findByIdAndDelete(req.query.id);
    res.send("Success");
}