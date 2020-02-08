# deasynchronize

Run asynchronous or synchronous function in subprocess and return result synchronously

## Install

```sh
npm i -S deasynchronize
```

## Usage

```ts
const result = deasynchronize(async () => {
    // This is not a closure!
    await new Promise(resolve => setTimeout(resolve, 0));
    return 'async result';
});
console.log(result); // => 'async result'
```

## API

```ts
deasynchronize(f: () => any): string
```

Function `f` is not a closure and do not has access to parent scope, it runs in subprocess.
You should require all dependencies inside this function. Result will be converted to string.

```ts
const result = deasynchronize(async () => {
    const os = require('os');
    return os.platform();
});
```
