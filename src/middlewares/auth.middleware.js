import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try{
        const decoded = jwt.verify(
            req.cookies.token,
            process.env.JWT_ACCESS_SECRET
        );
        req.user = decoded;
        next();
    }
    catch{
        res.redirect("/auth/login");
    }
}
