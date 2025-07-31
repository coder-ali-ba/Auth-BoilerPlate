const uploadImageController = async (req, res) => {
  console.log("🔥 ROUTE HIT");
  res.status(200).json({ message: "YES! Route hit!" });
};

export default uploadImageController;