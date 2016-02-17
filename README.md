# autofoos-particle-mock

Simple webserver that mocks the EventSource stream provided by particle.io APIs and allows repl-commands

## Installing

```
git clone git@github.com:rexxars/autofoos-particle-mock.git
cd autofoos-particle-mock
npm install
```

## Using

1. Start the mocker: `PORT=9876 npm start` (in `autofoos-particle-mock`)
2. Start autofoos with a `PARTICLE_BASEURL` env var to match mock:
  * `PARTICLE_BASEURL=http://localhost:9876/v1 npm start` (in `autofoos`)
3. Hooray.

## License

MIT-licensed, see LICENSE.
