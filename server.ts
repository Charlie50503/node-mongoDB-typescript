import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"
import headers from "./headers/headers"
import { errorHandle, successHandle } from "./handle/handle"
import { PostMethod } from "./models/postMethod"
import { ObjectID } from "./mongoType/type"

dotenv.config({
  path: "config.env"
})

const requestListener = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === '/todo' && req.method === "OPTIONS") {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      "status": 200
    }))
    res.end()
    return
  }

  let body: string = ""
  req.on("data", chunk => body += chunk)

  await new Promise((resolve) => {
    req.on("end", resolve)
  })
  if (req.url === '/todo') {
    const postMethod = new PostMethod()
    switch (req.method) {
      case "GET":
        await successHandle(req, res)
        break;
      case "POST":
        try {
          const requestData = JSON.parse(body)
          await postMethod.doPost(requestData)
          await successHandle(req, res)
        } catch (error) {
          const errorStr = error as string
          if (typeof errorStr !== "string") {
            await errorHandle(req, res, "格式錯誤")
          } else {
            await errorHandle(req, res, errorStr)
          }

        }
        break;
      case "DELETE":
        try {
          const result = await postMethod.doDeleteAll()
          await successHandle(req, res)
        } catch (error) {
          await errorHandle(req, res, "刪除失敗")
        }
        break;
      default:
        errorHandle(req, res, "路由錯誤")
        break;
    }
    return
  }

  if (req.url?.startsWith('/todo/')) {
    const postMethod = new PostMethod()

    const id: ObjectID | undefined = req.url.split('/').pop() as ObjectID | undefined
    switch (req.method) {
      case "PATCH":
        try {
          const requestData = JSON.parse(body)

          await postMethod.updateOneData(id, requestData)
          await successHandle(req, res)
          // await errorHandle(req, res, "輸入內容有問題無法登錄")
        } catch (error) {
          const errorStr = error as string
          if (typeof errorStr !== "string") {
            await errorHandle(req, res, "格式錯誤")
          } else {
            await errorHandle(req, res, errorStr)
          }
        }
        break;
      case "DELETE":
        try {
          const result = await postMethod.doDeleteOne(id)
          await successHandle(req, res)
        } catch (error) {
          const errorStr = error as string
          if (typeof errorStr !== "string") {
            await errorHandle(req, res, "格式錯誤")
          } else {
            await errorHandle(req, res, errorStr)
          }

        }
        break;
      default:
        errorHandle(req, res, "路由錯誤")
        break;
    }
    return
  }
  errorHandle(req, res, "無此路由")
}

const server = http.createServer(requestListener)

const { PORT, DATABASE, DATABASE_PASSWORD } = process.env
const url = DATABASE?.replace("<password>", DATABASE_PASSWORD as string) as string

mongoose.connect(url).then(() => {
  console.log("database connected.");

})

server.listen(PORT)