import { spawnSync } from 'child_process';
import serializeJavascript from 'serialize-javascript';

module.exports = deasynchronize;
module.exports.default = deasynchronize;

/**
 * Signature is similar to [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
 * Last argument is a function body, all arguments before last are parameters to the function.
 */
export function deasynchronize(...args: unknown[]): string {
    const [fn] = args.slice(-1);
    const parameters = args.slice(0, -1);
    const input = serializeJavascript(
        {
            fn,
            parameters,
        },
        { space: 2 },
    );
    const { stdout, stderr, status } = spawnSync('node', [`${__dirname}/subprocess`], {
        input,
        encoding: 'utf8',
    });
    // console.log(__filename, 'status ->', status);
    // console.log(__filename, 'stdout ->', stdout);
    // console.log(__filename, 'stderr ->', stderr);
    if (status !== 0) {
        throw stderr;
    }
    return stdout.trim();
}
// tslint:disable-next-line:no-default-export
export default deasynchronize;
