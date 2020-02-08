import deasynchronize from '.';
const deasynchronizeCjs = require('.');

it('smoke', () => {
    expect(typeof deasynchronize).toBe('function');
    expect(typeof deasynchronizeCjs).toBe('function');
});

it('simple sync', () => {
    const result = deasynchronize(() => 'sync');
    expect(result).toEqual('sync');
});

it('simple async', () => {
    const result = deasynchronize(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        return 'async';
    });
    expect(result).toEqual('async');
});

it('throw error', () => {
    expect(() => {
        deasynchronize(() => {
            throw new Error('error');
        });
    }).toThrow();
});

it('sum numbers', () => {
    const result = deasynchronize(1, 2, 3, (a, b, c) => {
        return a + b + c;
    });
    expect(result).toEqual('6');
});

it('concat strings', () => {
    const result = deasynchronize('a', 'b', 'c', (...arguments_) => {
        return arguments_.join(' ');
    });
    expect(result).toEqual('a b c');
});

it('argument object', () => {
    const o = { a: 1, b: 2, f: () => 'f' };
    const result = deasynchronize(o, async object => {
        return `${object.a} ${object.b} ${object.f()}`;
    });
    expect(result).toEqual('1 2 f');
});
