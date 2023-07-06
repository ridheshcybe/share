const Arrayobv = require('../classes/array');

it('test push with one value', () => {
    const arr = new Arrayobv();
    arr.push({ name: 'test' });
    expect(arr.inner).toEqual([{ name: 'test' }]);
});

it('test push with multiple values', () => {
    const arr = new Arrayobv();
    arr.push({ name: 'test1' }, { name: 'test2' });
    expect(arr.inner).toEqual([{ name: 'test1' }, { name: 'test2' }]);
});

it('test delete with one value', () => {
    const arr = new Arrayobv();
    arr.push({ name: 'test' });
    arr.delete('test');
    expect(arr.inner).toEqual([]);
});

it('test delete with multiple values', () => {
    const arr = new Arrayobv();
    arr.push({ name: 'test1' }, { name: 'test2' });
    arr.delete('test1');
    expect(arr.inner).toEqual([{ name: 'test2' }]);
});

it('test push with no value', () => {
    const arr = new Arrayobv();
    arr.push();
    expect(arr.inner).toEqual([]);
});

it('test delete with non existent value', () => {
    const arr = new Arrayobv();
    arr.push({ name: 'test' });
    arr.delete('non-existent');
    expect(arr.inner).toEqual([{ name: 'test' }]);
});

it('inner should return an array', () => {
    const arr = new Arrayobv();
    expect(arr.inner).toEqual([]);
})

it('add should return an array', () => {
    const arr = new Arrayobv();
    arr.EE.on("ADD", (val) => {
        expect(val).toEqual([{ name: 'hi' }])
    });
    arr.push({ name: 'hi' })
})

it('delete should return an array', () => {
    const arr = new Arrayobv();
    arr.EE.on("DELETE", (val) => {
        expect(val).toEqual({ name: 'hi' })
    });
    arr.push({ name: 'hi' })
    arr.delete({ name: 'hi' })
})