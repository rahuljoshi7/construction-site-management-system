const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      message: "Access denied. No token provided"
    });

  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "construction_secret");

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

exports.isAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access required"
    });

  }

  next();

};

exports.isSupervisor = (req, res, next) => {

  if (req.user.role !== "supervisor") {

    return res.status(403).json({
      message: "Supervisor access required"
    });

  }

  next();

};