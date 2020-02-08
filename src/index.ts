import { spawnSync } from 'child_process';
import serializeJavascript from 'serialize-javascript';

module.exports = deasynchronize;
module.exports.default = deasynchronize;

export function deasynchronize(f: () => any): string {
    const serialized = serializeJavascript(f, { space: 2 });
    const { stdout, stderr, status } = spawnSync('node', [`${__dirname}/subprocess`], {
        input: serialized,
        encoding: 'utf8',
    });
    if (status !== 0) {
        throw stderr;
    }
    // console.log(__filename, 'status ->', status);
    // console.log(__filename, 'stdout ->', stdout);
    // console.log(__filename, 'stderr ->', stderr);
    return stdout.trim();
}

export default deasynchronize;
