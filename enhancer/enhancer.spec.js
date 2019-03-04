const { success, fail, repair } = require('./enhancer.js');


describe('repair()', () => {
  it('sets durability back to 100', () => {
    const item = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 5};
    expect(repair(item)).toEqual({name: 'Sword', type: 'weapon', durability: 100, enhancement: 5});
  });
});

describe('success()', () => {
  it('increments enhancement and sets name', () => {
    const item = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 5};
    const item2 = {name: 'Sword', type: 'weapon', durability: 20, enhancement: 14};
    const item3 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 15};

    expect(success(item)).toEqual({displayName: '[+6] Sword', type: 'weapon', name: 'Sword', durability: 80, enhancement: 6});
    expect(success(item2)).toEqual('Item durablility too low.')
    expect(success(item3)).toEqual({displayName: '[PRI] Sword', type: 'weapon', name: 'Sword', durability: 80, enhancement: 16});
  })
})

describe('fail()', () => {
  it('decreases durability based on a condition', () => {
    const weapon1 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 3};
    const weapon2 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 8};
    const weapon3 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 17};
    const armor1 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 3};
    const armor2 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 8};
    const armor3 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 17};

    expect(fail(weapon1)).toBe('You cannot fail, your enhancement is too low.');
    expect(fail(weapon2)).toEqual({name: 'Sword', type: 'weapon', durability: 75, enhancement: 8});
    expect(fail(weapon3)).toEqual({displayName: '[PRI] Sword', name: 'Sword', type: 'weapon', durability: 70, enhancement: 16});
    expect(fail(armor1)).toBe('You cannot fail, your enhancement is too low.');
    expect(fail(armor2)).toEqual({name: 'Helmet', type: 'armor', durability: 75, enhancement: 8});
    expect(fail(armor3)).toEqual({displayName: '[PRI] Helmet', name: 'Helmet', type: 'armor', durability: 70, enhancement: 16});
  });
});