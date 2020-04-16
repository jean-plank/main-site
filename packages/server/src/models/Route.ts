import * as H from 'hyper-ts'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
type Path = string
export type EndedMiddleware = H.Middleware<H.StatusOpen, H.ResponseEnded, unknown, void>

export type Route = [Method, Path, EndedMiddleware]
