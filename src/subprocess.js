const getStdin = require('get-stdin');

(async () => {
    const input = await getStdin();

    const { fn, parameters } = eval(`(${input})`);

    try {
        const result = await fn(...parameters);
        process.stdout.write(String(result));
    } catch (err) {
        process.stderr.write(String(err));
        process.exit(1);
    }
})();
