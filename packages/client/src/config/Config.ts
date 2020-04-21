export namespace Config {
  declare const process: any

  export const apiHost: string = process.env.API_HOST
}
