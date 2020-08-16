import {
  insertAt,
  moveTo,
  determineColor,
  randomHexColorCode
} from '../../utils';

const arr = ['a', 'b', 'c', 'd'];

describe('insertAt', () => {
  it('inserts correctly when index is 0', () => {
    const result = insertAt('f', arr, 0);
    expect(result[0]).toBe('f');
    expect(result.length).toBe(arr.length + 1);
  });

  it('inserts correctly when index >= length', () => {
    const result = insertAt('f', arr, arr.length + 1);
    expect(result[arr.length]).toBe('f');
    expect(result.length).toBe(arr.length + 1);
  });

  it('inserts correctly when index < length', () => {
    const result = insertAt('f', arr, 2);
    expect(result[2]).toBe('f');
    expect(result.length).toBe(arr.length + 1);
  });

  it('inserts correctly into empty array', () => {
    const result = insertAt('a', [], 0);
    expect(result[0]).toBe('a');
    expect(result.length).toBe(1);
  });
});

describe('moveTo', () => {
  it('moves correctly when index is 0', () => {
    expect(moveTo(arr[1], arr, 0)).toEqual(['b', 'a', 'c', 'd']);
  });

  it('moves correctly when index >= length', () => {
    expect(moveTo(arr[1], arr, arr.length + 1)).toEqual([ 'a', 'c', 'd', 'b']);
  });

  it('moves correctly when index < length', () => {
    expect(moveTo(arr[0], arr, 2)).toEqual(['b', 'a', 'c', 'd']);
  });
});

describe('determineColor', () => {
  it('returns the correct value for a dark background', () => {
    expect(determineColor('#000')).toBe('#fff');
  });

  it('returns the correct value for a light background', () => {
    expect(determineColor('#fff')).toBe('#000');
  });
});

describe('randomHexColorCode', () => {
  it('returns a valid hex color code', () => {
    const hex = randomHexColorCode();
    expect(hex.startsWith('#')).toBe(true);
    expect(hex.length).toBe(7);
  });
});
