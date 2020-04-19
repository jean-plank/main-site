import { EndedMiddleware } from './EndedMiddleware'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
type Path = string

export type Route = [Method, Path, EndedMiddleware]
