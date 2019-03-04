const { success, fail, repair } = require('./enhancer.js');


describe('repair()', () => {
  it('sets durability back to 100', () => {
    const item = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 5};
    expect(repair(item)).toEqual({name: 'Sword', type: 'weapon', durability: 100, enhancement: 5});
  });
});

describe('success()', () => {
  const item = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 5};
  const item2 = {name: 'Sword', type: 'weapon', durability: 20, enhancement: 14};
  const item3 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 15};

  it('increments enhancement and sets name', () => {
    expect(success(item)).toEqual({displayName: '[+6] Sword', type: 'weapon', name: 'Sword', durability: 80, enhancement: 6});
  })

  it('Prevents you from enhancing if your durability is too low', () => {
    expect(success(item2)).toEqual('Item durablility too low.');
  })

  it('increments enhancement and sets name using table', () => {
    expect(success(item3)).toEqual({displayName: '[PRI] Sword', type: 'weapon', name: 'Sword', durability: 80, enhancement: 16});
  })
})

describe('fail()', () => {
  const weapon1 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 3};
  const weapon2 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 8};
  const weapon3 = {name: 'Sword', type: 'weapon', durability: 80, enhancement: 17};
  const armor1 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 3};
  const armor2 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 8};
  const armor3 = {name: 'Helmet', type: 'armor', durability: 80, enhancement: 17};

  it('makes sure you cant fail if weapon enhancement is too low', () => {
    expect(fail(weapon1)).toBe('You cannot fail, your enhancement is too low.');
  });

  it('decrements your weapon durability by 5 if your enchantment is less than 14', () => {
    expect(fail(weapon2)).toEqual({name: 'Sword', type: 'weapon', durability: 75, enhancement: 8});
  });

  it('decrements your weapon durability by 10 & enchantment by 1 if your enchantment is greater than 16', () => {
    expect(fail(weapon3)).toEqual({displayName: '[PRI] Sword', name: 'Sword', type: 'weapon', durability: 70, enhancement: 16});
  });

  it('makes sure you cant fail if armor enhancement is too low', () => {
    expect(fail(armor1)).toBe('You cannot fail, your enhancement is too low.');
  });

  it('decrements your armor durability by 5 if your enchantment is less than 14', () => {
    expect(fail(armor2)).toEqual({name: 'Helmet', type: 'armor', durability: 75, enhancement: 8});
  });

  it('decrements your armor durability by 10 & enchantment by 1 if your enchantment is greater than 16', () => {
    expect(fail(armor3)).toEqual({displayName: '[PRI] Helmet', name: 'Helmet', type: 'armor', durability: 70, enhancement: 16});
  });
});