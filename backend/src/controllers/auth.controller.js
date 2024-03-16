import User from "../models/user.model.js";
import Cart from "../models/cart.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authController = {
    async signUp(req, res) {
        const { fullName, userName, email, passWord } = req.body;
        try {
            const cartID = await Cart.create(req.body)
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(passWord, salt);
            const newUser = new User({
                fullName: fullName,
                userName: userName,
                email: email,
                passWord: hashed,
                cart: cartID._id
            })
            const user = await newUser.save();
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json('Something wrong!')
        }
    },
    async changePass(req, res) {
        const { pass, newPass, passConfirm } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(400).json({ messsage: "người dùng không tồn tại" });
        }
        try {
          const check = await bcrypt.compare(pass, user.passWord);
          if (!check) {
            return res
              .status(400)
              .json({ message: "Mật khẩu cũ không chính xác" });
          }
          if (newPass !== passConfirm) {
            return res
              .status(400)
              .json({ message: "Mật khẩu không khớp" });
          }
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(newPass, salt);
          await User.findByIdAndUpdate(
            req.user.id,
            {
              $set: {
                passWord: hashed,
              },
            },
            { new: true }
          );
          return res.status(200).json({message: 'Đổi mật khẩu thành công'});
        } catch (error) {
          console.log(error);
          return res.status(500).json({message: 'Đã có lỗi xảy ra'});
        }
      }, 
    //GENERATE_ACCSESS_TOKEN
    genarateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCSESS_KEY,
            { expiresIn: "20d" }
        );
    },
    //GENERATE_REFRESH_TOKEN
    genarateRegreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    async signIn(req, res) {
        const { userName, passWord } = req.body;
        try {
            const user = await User.findOne({ userName })
            if (!user) {
                return res.status(400).json("Wrong username!");
            }
            const vaidPassword = await bcrypt.compare(

                passWord,
                user.passWord
            )
            if (!vaidPassword) {
                return res.status(400).json("Wrong Password!");
            }
            if (user && vaidPassword) {
                const accessToken = authController.genarateAccessToken(user);
                const refreshToken = authController.genarateRegreshToken(user);
                user.refreshToken = refreshToken;

                await user.save();
                const { passWord, ...other } = user._doc;
                return res.status(200).json({ ...other, accessToken});
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async(req,res) => {
        const { userName} = req.body;
        const user = await User.findOne({ userName })

        if (!user.refreshToken)
            return res.status(401).json("You 're not a auth!!!");

        jwt.verify(user.refreshToken, process.env.JWT_REFRESH_KEY, async (err, data)=>{
            if (err) {
                console.log(err);
            }
            //Create a new access, refresh token
            const newAccessToken = authController.genarateAccessToken(data);
            const newRefreshToken = authController.genarateRegreshToken(data);
            user.refreshToken = newRefreshToken;
            await user.save();
            
            res.status(200).json(newAccessToken);
        })
    },

    async signOut(req, res) {
        const { userName} = req.body;
        const user = await User.findOne({ userName })
            if (!user) {
                return res.status(400).json("Wrong username!");
            }
        
        user.refreshToken = undefined;

        await user.save();
        return res.status(200).json("Thoát Thành Công!!!!")
    }
};

export default authController;