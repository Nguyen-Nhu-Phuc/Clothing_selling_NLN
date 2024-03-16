import jwt from 'jsonwebtoken';

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        // console.log(token);
        if (token) {
            const accessToken_1 = token.split(" ")[1];
            const accessToken = accessToken_1.substr(1, accessToken_1.length - 2)
           //console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_ACCSESS_KEY,(err, user) =>{
                if (err){
                   return res.status(403).json("Token is not valid!!!");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You 're not auth!!!");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
       
        middlewareController.verifyToken(req, res, () => {
            //console.log(req.user);
            //console.log(accessToken);
            console.log(req.user)
            if (req.user.admin == true){
                next();
            }
            else {
              return  res.status(403).json("You 're not allowed to delete other!!!");
            }
        });
    },

    verifyTokenPOST: (req, res, next) => {
        const token = req.body.headers['Authorization'];
        //console.log(token);
        if (token) {
            const accessToken_1 = token.split(" ")[1];
            const accessToken = accessToken_1.substr(1, accessToken_1.length - 2)
           //console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_ACCSESS_KEY,(err, user) =>{
                if (err){
                   return  res.status(403).json("Token is not valid!!!");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You 're not auth!!!");
        }
    },

    verifyTokenAndAdminAuthPOST: (req, res, next) => {
       
        middlewareController.verifyTokenPOST(req, res, () => {
           // console.log(req.user);
           // console.log(accessToken);
            if (req.user.admin == true){
                next();
            }
            else {
                res.status(403).json("You 're not allowed to delete other!!!");
            }
        });
    },

};

export default middlewareController;