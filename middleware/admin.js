module.exports = (req, res, next) => {
  // Assume req.user is set after authentication
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'Admin access required' });
};
