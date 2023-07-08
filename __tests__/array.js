//@ts-check
const array = require('../functions/array').array;

// Tests that push method adds one element to inner array
it('test_push_one_arg', () => {
    const arr = new array();
    arr.push('one');
    expect(arr.inner).toEqual(['one']);
});

// Tests that push method adds multiple elements to inner array
it('test_push_multiple_args', () => {
    const arr = new array();
    arr.push('one', 'two', 'three');
    expect(arr.inner).toEqual(['one', 'two', 'three']);
});

// Tests that remove method removes one element from inner array
it('test_remove_one_element', () => {
    const arr = new array();
    arr.push({ ip: '192.168.0.1' }, { ip: '192.168.0.2' });
    arr.remove('192.168.0.1');
    expect(arr.inner).toEqual([{ ip: '192.168.0.2' }]);
});

// Tests that push method does not add elements to inner array when called with no arguments
it('test_push_no_args', () => {
    const arr = new array();
    arr.push();
    expect(arr.inner).toEqual([]);
});

// Tests that remove method does not modify inner array when called on an empty array
it('test_remove_empty_array', () => {
    const arr = new array();
    arr.remove('192.168.0.1');
    expect(arr.inner).toEqual([]);
});

// Tests that remove method does not modify inner array when called with a non-existing element
it('test_remove_non_existing_element', () => {
    const arr = new array();
    arr.push({ ip: '192.168.0.1' }, { ip: '192.168.0.2' });
    arr.remove('192.168.0.3');
    expect(arr.inner).toEqual([{ ip: '192.168.0.1' }, { ip: '192.168.0.2' }]);
});

// Tests that the remove method removes multiple elements from the array
it('test_remove_method_with_multiple_elements', () => {
    const myArray = new array();
    myArray.push({ ip: '192.168.0.1', name: 'server1' });
    myArray.push({ ip: '192.168.0.2', name: 'server2' });
    myArray.push({ ip: '192.168.0.3', name: 'server3' });
    myArray.remove('192.168.0.1');
    myArray.remove('192.168.0.2');
    expect(myArray.inner).toEqual([{ ip: '192.168.0.3', name: 'server3' }]);
});

// Tests that the EventEmitter is initialized
it('test_event_emitter_initialized', () => {
    const myArray = new array();
    expect(myArray.EE).toBeDefined();
});

// Tests that a callback function can be registered to the 'update' event
it('test_register_callback', () => {
    const arr = new array();
    const callback = jest.fn();
    arr.onUpdate(callback);
    expect(callback).not.toHaveBeenCalled();
});

// Tests that the registered callback function receives the updated inner array as a parameter
it('test_callback_receives_inner_array', () => {
    const arr = new array();
    const callback = jest.fn();
    arr.onUpdate(callback);
    arr.push(1, 2, 3);
    expect(callback).toHaveBeenCalledWith([1, 2, 3]);
});

// Tests that the registered callback function is called when the 'update' event is emitted
it('test_callback_called_on_update', () => {
    const arr = new array();
    const callback = jest.fn();
    arr.onUpdate(callback);
    arr.push(1, 2, 3);
    expect(callback).toHaveBeenCalledTimes(1);
});

// Tests that multiple callback functions can be registered to the 'update' event
it('test_multiple_callbacks', () => {
    const arr = new array();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    arr.onUpdate(callback1);
    arr.onUpdate(callback2);
    arr.push(1, 2, 3);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
});

