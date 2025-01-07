import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => { 
    next();
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized - missing token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Server error" });
    }
}