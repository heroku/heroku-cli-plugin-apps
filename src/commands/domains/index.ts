import {Command, flags} from '@heroku-cli/command'
import * as Heroku from '@heroku-cli/schema'
import cli from 'cli-ux'

export default class DomainsIndex extends Command {
  static description = 'list domains for an app'

  static examples = [
    `$ heroku domains
=== example Heroku Domain
example.herokuapp.com

=== example Custom Domains
Domain Name      DNS Record Type  DNS Target
www.example.com  CNAME            www.example.herokudns.com
`, "$ heroku domains --filter 'Domain Name=www.example.com'"]

  static flags = {
    help: flags.help({char: 'h'}),
    app: flags.app({required: true}),
    ...cli.table.flags()
  }

  async run() {
    const {flags} = this.parse(DomainsIndex)
    const response = await this.heroku.get<Array<Heroku.Domain>>(`/apps/${flags.app}/domains`)
    const domains = response.body
    const herokuDomain = domains.find(domain => domain.kind === 'heroku')
    const customDomains = domains.filter(domain => domain.kind === 'custom')

    cli.styledHeader(`${flags.app} Heroku Domain`)
    cli.log(herokuDomain && herokuDomain.hostname)
    if (customDomains && customDomains.length > 0) {
      cli.log()
      cli.styledHeader(`${flags.app} Custom Domains`)
      cli.table(customDomains, {
        hostname: {header: 'Domain Name'},
        kind: {header: 'DNS Record Type', get: () => 'CNAME'},
        cname: {header: 'DNS Target'},
        acm_status: {header: 'ACM Status', extended: true},
        acm_status_reason: {header: 'ACM Status', extended: true}
      }, {
        ...flags
      })
    }
  }
}
