# deasynchronize

Run asynchronous or synchronous function in subprocess and return result synchronously

## Install

```sh
npm i -S deasynchronize
```

## Usage

```ts
const result = deasynchronize(1, 2, async (a, b) => {
    // This is not a closure!
    await new Promise(resolve => setTimeout(resolve, 0));
    return `async result ${a + b}`;
});
console.log(result); // => 'async result 3'
```

## API

```ts
deasynchronize(...args: any[], f: (...args: any[]) => any): string
```

Function `f` is not a closure and do not has access to parent scope, it runs in subprocess.
You should require all dependencies inside this function. Result will be converted to string.

```ts
const result = deasynchronize(async () => {
    // This is not a closure!
    const os = require('os');
    return os.platform();
});
```

It is possible to pass parameters to function:

```ts
const result = deasynchronize('meow', async sound => {
    // This is not a closure!
    return `Incoming sound is ${sound}`;
});
console.log(result); // => 'Incoming sound is meow'
```

Remember, this function is not a closure!
