import { insertAt, moveTo } from '../../utils';

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
