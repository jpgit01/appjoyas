export const serverLog = (req, __, next) => {
  console.log({
    path: req.path,
    method: req.method,
    query: req.query,
    params: req.params,
    headers: req.headers,
    body: req.body,
    cookies: req.cookies,
    ip: req.ip,
    remote: req.connection.remoteAddress,
    protocol: req.protocol,
    secure: req.secure,
    url: req.url,
    originalUrl: req.originalUrl

  })
  next()
}
