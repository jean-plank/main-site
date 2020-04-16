import { pipe, IO } from 'main-site-shared/lib/fp'

import { Application } from './Application'
import { Config } from './config/Config'

const main = (): IO<unknown> => pipe(Config.load(), IO.chain(Application))

IO.runUnsafe(main())
