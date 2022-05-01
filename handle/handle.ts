import http from "http"
import headers from "../headers/headers"
import Post from "../models/posts"


const successHandle = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, headers)
  const resultData = await Post.find()
  res.write(JSON.stringify({
    "status": "success",
    "data": resultData
  }))
  res.end()
}


const errorHandle = (req: http.IncomingMessage, res: http.ServerResponse, message: string) => {
  res.writeHead(400, headers)
  res.write(JSON.stringify({
    "status": "false",
    message
  }))
  res.end()
}

export { errorHandle, successHandle }