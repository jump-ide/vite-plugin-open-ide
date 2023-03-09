import url from 'url'
import path from 'path'
import openEditor from './open-ide'

function middleware(req:any, res:any, next:any) {
  const queryParams = url.parse(req.url!, true)
  const loc = queryParams.query.loc as string
  if (!loc) {
    return next()
  }
  const [filePath, lineNumber] = loc.split(':')
  const cwd = process.cwd()
  try {
    openEditor(path.join(cwd, filePath), parseInt(lineNumber))
    res.statusCode = 200
    res.end('ok')
  } catch (err) {
    if (err instanceof Error) {
      console.log('open ide failed')
      console.log(err.message)
      res.statusCode = 500
      res.end('error: cmd exec failure')
    }
  }
}

export default middleware
