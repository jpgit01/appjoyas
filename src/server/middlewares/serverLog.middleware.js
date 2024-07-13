export const serverLog = (req, __, next) => {
  console.log({
    path: req.path,
    method: req.method
  })
  next()
}
