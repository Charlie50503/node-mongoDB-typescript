import moment from 'moment';
import { ObjectID } from "../mongoType/type";
import { Include } from "../utils/utils";
import Post from "./posts"

interface postMethodParameter {
  name: string,
  tags: [],
  content: string,
  image?: string,
  creatAt?: Date,
  likes?: number
}

type requiredContentType = 'name' | 'tags' | 'content';

export class PostMethod {
  requiredContent: Array<requiredContentType> = ["name", "tags", "content"]

  async doPost(data: postMethodParameter) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await this.checkRequired(data)
        await this.checkType(data)
        const result = await Post.create({
          name: data.name,
          tags: data.tags,
          content: data.content,
          image: data?.image,
          creatAt: data?.creatAt,
          likes: data?.likes
        })

        if (result) resolve(true)
        reject(false)
      } catch (error) {
        reject(error)
      }
    })
  }

  async doDeleteAll() {
    return new Promise(async (resolve, reject) => {
      const result = await Post.deleteMany({})
      if (result) resolve(true)
      reject(false)
    })
  }
  async doDeleteOne(id: ObjectID | undefined) {
    return new Promise(async (resolve, reject) => {
      if (!id) reject("沒有請求用id")
      const result = await Post.findByIdAndDelete(id)
      if (result) resolve(true)
      reject("無此ID")
    })
  }

  async updateOneData(id: ObjectID | undefined, data: postMethodParameter) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) reject("沒有請求用id")
        await this.checkRequired(data)
        await this.checkType(data)

        const result = await Post.findByIdAndUpdate(id, data)

        if (result) resolve(true)
        reject("無此ID")
      } catch (error) {
        reject(error)
      }

    })
  }

  checkRequired(data: postMethodParameter) {
    // let notFoundContentName = ""
    let keys: Array<string> = []
    for (const [key] of Object.entries(data)) {
      keys.push(key)
    }

    const result = keys.every((key) => Include.execute(this.requiredContent, key) === true)

    if (result) {
      return Promise.reject("格式錯誤")
    }

    return Promise.resolve()
  }

  checkType(data: postMethodParameter): Promise<string> {
    if (typeof data.name !== "string") {
      return Promise.reject("name 格式錯誤")
    }
    if (!Array.isArray(data.tags)) {
      return Promise.reject("tags 格式錯誤")
    }
    if (typeof data.content !== "string") {
      return Promise.reject("content 格式錯誤")
    }
    if (typeof data.image !== "string") {
      return Promise.reject("image 格式錯誤")
    }
    if (typeof data.likes !== "number") {
      return Promise.reject("likes 格式錯誤")
    }
    if (data.creatAt) {
      let result = moment(data.creatAt, 'YYYY/MM/DD', true).isValid();
      if (!result) return Promise.reject("creatAt must be YYYY/MM/DD")
    }
    return Promise.resolve("")
  }
}
