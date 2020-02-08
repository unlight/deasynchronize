const getStdin = require('get-stdin');

(async () => {
    const code = await getStdin();
    try {
        const func = Function(`return ${code}`)();
        const result = await func();
        process.stdout.write(String(result));
        process.exit(0);
    } catch (err) {
        process.stderr.write(String(err));
        process.exit(1);
    }
})();
