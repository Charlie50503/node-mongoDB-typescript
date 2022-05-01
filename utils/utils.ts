export abstract class Include {
  public static execute(list: Array<any>, key: string): boolean {
    return list.some(item => {
      item === key
    })
  }
}

