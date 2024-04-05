const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user.model");

module.exports.index = async (req, res) => {
    const check = await User.find({tokenUser: req.query.tokenUser});
    res.send(check);
}

module.exports.signup = async (req, res) => {
    const phoneNumberCheck = await User.find({phone_number: req.body.data.phone_number});
    const emailCheck = await User.find({email: req.body.data.email});
    if (phoneNumberCheck == 0 && emailCheck == 0) {
        if (req.body.data.name == "") {
            res.end("Vui lòng nhập tên người dùng");
        } else if (req.body.data.email == "") {
            res.end("Vui lòng nhập email người dùng");
        } else if (req.body.data.phone_number == "") {
            res.end("Vui lòng nhập số điện thoại người dùng");
        } else if (req.body.data.password == "") {
            res.end("Vui lòng nhập mật khẩu người dùng");
        } else if (req.body.data.phone_number == "") {
            res.end("Vui lòng nhập lại mật khẩu người dùng");
        } else if (req.body.data.password != req.body.data.re_password) {
            res.end("Nhập lại mật khẩu không khớp. Vui lòng thử lại!")
        } else {
            req.body.data.password = bcrypt.hashSync(req.body.data.password, saltRounds);
            req.body.data.re_password = bcrypt.hashSync(req.body.data.re_password, saltRounds);

            const user = await new User(req.body.data);
            await user.save()
            res.cookie("tokenUser", user.tokenUser);
            res.send("Success");
        }
    } else {
        if (emailCheck.length != 0) {
            res.end("Email đã tồn tại trong hệ thống");
        } else {
            res.end("Số điện thoại đã tồn tại trong hệ thống");
        }
    }
}

module.exports.signin = async (req, res) => {
    const user = await User.findOne({email: req.body.data.email});
    if (user != null) {
        if (bcrypt.compareSync(req.body.data.password, user.password)) {
            res.cookie("tokenUser", user.tokenUser).send("Success");
        } else {
            res.end("Mật khẩu chưa chính xác");
        }
    } else {  
        res.end("Email không tồn tại trong hệ thống");
    }
}

module.exports.signout = async (req, res) => {
    res.clearCookie("tokenUser").send("Success");
}