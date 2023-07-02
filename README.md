# hongkong-bus-arrival-serverless

Hong Kong Bus Arrival Api (香港巴士到站時間Api)

- New World First Bus Services Limited

- Citybus Limited

- The Kowloon Motor Bus Company (1933) Limited

- Long Win Bus Company Limited (LWB)

- New Lantao Bus Company (1973) Limited

documentation: <https://documenter.getpostman.com/view/3827865/UUxtEAPV>

api url: <https://aqpt2d6lud.execute-api.ap-southeast-1.amazonaws.com/prod>

## Requirement

- install yarn
- install node (v16+)
- install serverless

## Testing and run

```zsh
// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// lint code
$ yarn run lint

// format code
$ yarn run format

// run test case
$ yarn run test

// remove serverless services in aws (api gateway, lambda, s3, cloudformation)
$ yarn run remove
```
