# hongkong-bus-arrival-serverless

Hong Kong Bus Arrival Api

- New World First Bus Services Limited

- Citybus Limited

- The Kowloon Motor Bus Company (1933) Limited

- Long Win Bus Company Limited (LWB)

documentation: <https://documenter.getpostman.com/view/3827865/UUxtEAPV>

api url: <https://mnasat17b2.execute-api.ap-southeast-1.amazonaws.com/prod>

## Requirement

- install yarn
- install node (v14+)
- install serverless

## Testing and run

```zsh
// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// use eslint and prettier to format code
$ yarn run lint

// run test case
$ yarn run test

// remove serverless services in aws (api gateway, lambda, s3, cloudformation)
$ yarn run remove
```
