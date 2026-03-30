const jwt = require("jsonwebtoken");

/* ==============================
   VERIFY TOKEN MIDDLEWARE
============================== */

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token or wrong format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 Verify token using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user (id + role)
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/* ==============================
   ROLE-BASED AUTHORIZATION
============================== */

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // ❌ If user not attached
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // ❌ Role not allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
      });
    }
  };
};