# nano-bigodon

nano-bigodon is a minimal implementation of the Bigodon templating engine on Express.js in under 40 lines of code. It allows you to execute Bigodon templates with a simple REST API.

## Features

- Execute Bigodon templates through HTTP requests.
- Set execution time limits for template processing.
- Log helper function for debugging templates.

## Usage

### Using npm

To get started with nano-bigodon, clone the repository and install the dependencies:

```bash
git clone https://github.com/gabriel-pinheiro/nano-bigodon.git
cd nano-bigodon
npm install
```

Then, whenever you want to start the server, run:
```bash
npm start
```

### Using Docker

Alternatively, you can use Docker to run nano-bigodon:

```bash
docker run -p 8080:8080 gabrielctpinheiro/nano-bigodon
```

## API

To execute a Bigodon template, send a POST request to `/execute` with a JSON containing the `template` and `context`:

```bash
curl -X POST http://localhost:8080/execute \
-H "Content-Type: application/json" \
-d '{"template": "Hello, {{name}}!", "context": {"name": "World"}}'
```

The server will respond with the output of the template execution:
```
Hello, World!
```

## Configuration

You can configure the server by setting the environment variables:

- `PORT`: The port that the server will listen to. Defaults to `8080`.
- `EXECUTION_LIMIT`: The maximum time (in milliseconds) that the server will allow a template to execute. Defaults to `100`.

## Bigodon

For more information on the Bigodon language, available helpers, features or how to add extra helpers, check out the [Bigodon repository](https://github.com/gabriel-pinheiro/bigodon).

## License

nano-bigodon is licensed under the Apache-2.0 License. See [LICENSE](LICENSE) for more information.
