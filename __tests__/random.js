const run = require("../functions/random")

// Tests that the function returns a name from the names array
it('test_returns_name', () => {
    const name = run();
    expect(names).toContain(name);
});

// Tests that the function returns a different name on subsequent calls
it('test_returns_different_name', () => {
    const name1 = run();
    const name2 = run();
    expect(name1).not.toBe(name2);
});

// Tests that the function returns a name with correct data type
it('test_returns_correct_data_type', () => {
    const name = run();
    expect(typeof name).toBe('string');
});

// Tests that the function returns undefined when the names array is empty
it('test_returns_undefined_when_empty_array', () => {
    names.length = 0;
    const name = run();
    expect(name).toBeUndefined();
});

// Tests that the function returns a name when the names array has only one name
it('test_returns_name_when_array_has_one_name', () => {
    names.length = 1;
    const name = run();
    expect(names).toContain(name);
});

// Tests that the function can handle a large number of names in the array
it('test_handles_large_number_of_names', () => {
    names.length = 100000;
    const name = run();
    expect(names).toContain(name);
});