import Nock from '@fancy-test/nock'
import * as Test from '@oclif/test'
export {expect} from '@oclif/test'

process.stdout.columns = 80
process.stderr.columns = 80

export const test = Test.test
.register('nock', Nock)
