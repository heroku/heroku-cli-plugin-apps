heroku-cli-plugin-apps
======================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-cli-plugin-apps.svg)](https://npmjs.org/package/heroku-cli-plugin-apps)
[![CircleCI](https://circleci.com/gh/brettgoulder/heroku-cli-plugin-apps/tree/master.svg?style=shield)](https://circleci.com/gh/brettgoulder/heroku-cli-plugin-apps/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-cli-plugin-apps.svg)](https://npmjs.org/package/heroku-cli-plugin-apps)
[![License](https://img.shields.io/npm/l/heroku-cli-plugin-apps.svg)](https://github.com/brettgoulder/heroku-cli-plugin-apps/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g heroku-cli-plugin-apps
$ heroku COMMAND
running command...
$ heroku (-v|--version|version)
heroku-cli-plugin-apps/0.0.0 darwin-x64 node-v10.16.0
$ heroku --help [COMMAND]
USAGE
  $ heroku COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku domains`](#heroku-domains)
* [`heroku domains:info [HOSTNAME]`](#heroku-domainsinfo-hostname)

## `heroku domains`

list domains for an app

```
USAGE
  $ heroku domains

OPTIONS
  -a, --app=app      (required) app to run command against
  -h, --help         show CLI help
  -x, --extended     show extra columns
  --columns=columns  only show provided columns (comma-separated)
  --csv              output is csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --sort=sort        property to sort by (prepend '-' for descending)

EXAMPLES
  $ heroku domains
  === example Heroku Domain
  example.herokuapp.com

  === example Custom Domains
  Domain Name      DNS Record Type  DNS Target
  www.example.com  CNAME            www.example.herokudns.com

  $ heroku domains --filter 'Domain Name=www.example.com'
```

_See code: [src/commands/domains/index.ts](https://github.com/brettgoulder/heroku-cli-plugin-apps/blob/v0.0.0/src/commands/domains/index.ts)_

## `heroku domains:info [HOSTNAME]`

show detailed information for a domain on an app

```
USAGE
  $ heroku domains:info [HOSTNAME]

OPTIONS
  -a, --app=app  (required) app to run command against
  -h, --help     show CLI help

EXAMPLE
  $ heroku domains:info www.example.com
```

_See code: [src/commands/domains/info.ts](https://github.com/brettgoulder/heroku-cli-plugin-apps/blob/v0.0.0/src/commands/domains/info.ts)_
<!-- commandsstop -->
