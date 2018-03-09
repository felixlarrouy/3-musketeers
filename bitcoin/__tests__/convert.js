'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning then default itself', () => {
  expect(convert(2, 'BTC', 'BTC')).toBe(2);
});

test('should return a Number', () => {
  expect(typeof(convert(2, 'BTC', 'BTC', 'Number'))).toBe("number");
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big') instanceof Big).toBe(true);
});

test('should return a String', () => {
  expect(typeof(convert(2100, 'mBTC', 'BTC', 'String'))).toBe("string");
});

test('should convert an integer', () => {
  expect(typeof(convert(123456789012345, 'Satoshi', 'BTC', 'Number'))).toBe("number");
  expect(Number.isInteger(convert(123456789012345, 'Satoshi', 'BTC', 'Number'))).toBe(false);

});

test('should convert a number', () => {
  expect(typeof(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number'))).toBe("number");
});

test('should convert a string', () => {
  expect(typeof(convert('2', 'BTC', 'BTC', 'Number'))).toBe("number");
  expect(convert('2', 'BTC', 'BTC', 'Number')).toBe(2);
});

test('should convert a Big number', () => {
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number') instanceof Big).toBe(false);
  expect(typeof(convert(new Big(2), 'BTC', 'BTC', 'Number'))).toBe('number')

});

test('should convert a NaN to a Number', () => {
  expect(typeof(convert(NaN, 'BTC', 'BTC', 'Number'))).toBe("number");
  expect(typeof(convert(NaN, 'BTC', 'mBTC', 'Number'))).toBe("number");

});

test('should convert a NaN to a String', () => {
  expect(typeof(convert(NaN, 'BTC', 'BTC', 'String'))).toBe("string");
  expect(typeof(convert(NaN, 'BTC', 'mBTC', 'String'))).toBe("string");
  expect(isNaN(convert(NaN, 'BTC', 'BTC', 'String'))).toBe(true);
  expect(isNaN(convert(NaN, 'BTC', 'mBTC', 'String'))).toBe(true);
});

test('should not convert a NaN to a Big', () => {
  expect(() => {
    convert(NaN, 'BTC', 'BTC', 'Big');
  }).toThrow();
});

test('should handle rounding errors', () => {
  expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).not.toBe(convert(0.46, 'Satoshi', 'BTC', 'Number'));
  expect(typeof convert(4.6, 'Satoshi', 'BTC', 'Number')).toBe('number')
  expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).not.toBe(convert(0.46, 'BTC', 'Satoshi', 'Number'));
  expect(typeof convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBe('number');
});

test('should throw when untest is undefined', () => {
  expect(() => {
    convert(new Big(2), 'x', 'BTC', 'Number');
  }).toThrow();
  expect(() => {
    convert(new Big(2), 'BTC', 'x', 'Number');
  }).toThrow();
  expect(() => {
    convert(NaN, 'x', 'BTC', 'Number');
  }).toThrow();
  expect(() => {
    convert(NaN, 'BTC', 'x', 'Number');
  }).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {
    convert(2, 'BTC', 'mBTC', 'x');;
  }).toThrow();
  expect(() => {
    convert(NaN, 'BTC', 'mBTC', 'x');
  }).toThrow();
});

test('should allow untest aliases', () => {
  expect(() => {
    convert(4.6, 'Satoshi', 'sat');
  }).not.toThrow();

  expect(convert(4.6, 'Satoshi', 'μBTC')).toBe(convert(4.6, 'sat', 'bit'));
  expect(convert(4.6, 'BTC', 'μBTC')).toBe(convert(4.6, 'BTC', 'bit'));
});

test('add a new currency', () => {
  convert.addUnit('AUS', 0.001);
  expect(convert.units()).toContain('AUS');
})

test('should throw when adding existing currency with different conversion factor', () => {
  expect(() => {
    convert.addUnit('sat', 0.002);
  }).toThrow();
});

test('delete a currency', () => {
  convert.removeUnit('AUS');
  expect(convert.units()).not.toContain('AUS');
})

test('should throw when removing predefined currency', () => {
  expect(() => {
    convert.removeUnit('BTC');
  }).toThrow();
});
