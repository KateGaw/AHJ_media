import checkValidation from '../../js/validator';

test('test true', () => {
    const value = '254.51, -254.54';
    const result = checkValidation(value);
    expect(result).toBe(true);
});

test('test true', () => {
    const value = '[254.51, -254.54]';
    const result = checkValidation(value);
    expect(result).toBe(true);
});

test('test true', () => {
    const value = '254.51,-254.54';
    const result = checkValidation(value);
    expect(result).toBe(true);
});

test('test true', () => {
    const value = '254.51, 254.54';
    const result = checkValidation(value);
    expect(result).toBe(true);
});

test('test false', () => {
    const value = '254.51-254.54';
    const result = checkValidation(value);
    expect(result).toBe(false);
});

test('test false', () => {
    const value = '254,51,254,54';
    const result = checkValidation(value);
    expect(result).toBe(false);
});