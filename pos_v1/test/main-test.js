'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

   spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

   expect(console.log).toHaveBeenCalledWith(expectText);
  });
});


describe('BuildCodeAndNumArray check', () => {

  it('check return BuildCodeAndNumArray', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const codeAndNumArrayCheck =[{code:'ITEM000001',num:5},{code:'ITEM000003',num:2.5},{code:'ITEM000005',num:3}];

    spyOn(console, 'log');

    let codeAndNumArray = BuildCodeAndNumArray(tags);
    let codeAndNumArrayToJson = JSON.stringify(codeAndNumArray);
    expect(JSON.stringify(codeAndNumArrayCheck)).toBe(codeAndNumArrayToJson);
  });
});


describe('getReceiptArray check', () => {

  it('check return getReceiptArray', () => {

    const allGoodItemArray = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
    const recieptArrayCheck =[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3,num:5},{barcode:'ITEM000003',name:'荔枝',
      unit:'斤',price:15,num:2.5},{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.5,num:3}];
    const codeAndNumArray =[{code:'ITEM000001',num:5},{code:'ITEM000003',num:2.5},{code:'ITEM000005',num:3}];
    spyOn(console, 'log');

    let recieptArray = getReceiptArray(allGoodItemArray, codeAndNumArray);
    let recieptArrayToJson = JSON.stringify(recieptArray);
    expect(JSON.stringify(recieptArrayCheck)).toBe(recieptArrayToJson);
  });
});

