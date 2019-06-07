exports.playClip = async (req, res) => {
  const { clipId } = req.params;
  res.send({ msg: clipId });
};
