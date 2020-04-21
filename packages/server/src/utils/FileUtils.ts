import fs from 'fs'

import { IO } from 'main-site-shared/lib/fp'

export namespace FileUtils {
  export const readFileSync = (path: string): IO<string> =>
    IO.apply(() => fs.readFileSync(path, 'utf8'))
}
