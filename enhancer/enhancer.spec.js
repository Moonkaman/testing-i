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