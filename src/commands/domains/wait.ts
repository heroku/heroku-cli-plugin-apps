import {color} from '@heroku-cli/color'
import {Command, flags} from '@heroku-cli/command'
import * as Heroku from '@heroku-cli/schema'
import cli from 'cli-ux'
import shellescape from 'shell-escape'

export default class DomainsWait extends Command {
  static description = 'remove a domain from an app'

  static examples = ['heroku domains:remove www.example.com']

  static flags = {
    help: flags.help({char: 'h'}),
    app: flags.app({required: true}),
    json: flags.string({description: 'output in json format', char: 'j'}),
    wait: flags.string()
  }

  static args = [{name: 'hostname'}]

  async run() {
    const {args, flags} = this.parse(DomainsWait)
    const {hostname} = args
    cli.action.start(`Adding ${color.green(args.hostname)} to ${color.app(flags.app)}`)
    const {body: domain} = await this.heroku.get<Heroku.Domain>(`/apps/${flags.app}/domains/${hostname}`)
    if (flags.json) {
      cli.styledJSON(domain)
    } else {
      cli.warn(`Configure your app's DNS provider to point to the DNS Target ${color.green(domain.cname)}.
      For help, see https://devcenter.heroku.com/articles/custom-domains`)
      if (domain.status !== 'none') {
        cli.error('')
        if (flags.wait) {
          // yield waitForDomain(context, heroku, domain)
        } else {
          cli.error(`The domain ${color.green(hostname)} has been enqueued for addition`)
          let command = `heroku domains:wait ${shellescape([hostname])}`
          cli.warn(`Run ${color.cmd(command)} to wait for completion`)
        }
      }
    }
  }
}
