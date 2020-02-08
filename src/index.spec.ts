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
            throw new Error();
        });
    }).toThrow();
});
