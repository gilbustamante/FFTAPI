// Catches async errors and passes them to handler
module.exports = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  }
}