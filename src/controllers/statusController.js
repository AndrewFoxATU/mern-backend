exports.getStatus = (req, res) => {
  res.json({
    status: "Online",
    message: "AWS Backend is reachable!",
    owner: "Andrew Fox",
    timestamp: new Date()
  });
};