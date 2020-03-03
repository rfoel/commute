export default params => {
  let seconds = params
  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds -= days * (24 * 60 * 60)
  const hours = Math.floor(seconds / (60 * 60))
  seconds -= hours * (60 * 60)
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60
  return `${(days > 0 ? `${days}d:` : '') + hours}h:${minutes}m:${seconds}s`
}
