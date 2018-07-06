'use strict';

function printReceipt(tags) {
  //计算数量
  let typeAndNumberOfItems = calculatingTypeAndNumber(tags);
  const allItems = loadAllItems();
  let itemsDetails = getItemsDetails(typeAndNumberOfItems, allItems);
  const promotions = loadPromotions();
  itemsDetails = getPromotion(itemsDetails, promotions);
  itemsDetails = countItem(itemsDetails);
  itemsDetails = countAllItems(itemsDetails);
   print(itemsDetails);

}

//计算数量
function calculatingTypeAndNumber(tags) {

  let typeAndNumberOfItems = [];

  for (let barcode of tags) {
    let tempId = splitItem(barcode);
    let Iscontain = containId(tempId, typeAndNumberOfItems);
    if (!Iscontain) {
      typeAndNumberOfItems.push({
        code: tempId.code,
        number: tempId.number
      });
    }
  }
  return typeAndNumberOfItems;
}

function getItemsDetails(typeAndNumberOfItems, allItems) {
  // for(let det of deatil)
  for (let typeAndNumberOfItem of typeAndNumberOfItems) {
    for (let item of allItems) {
      if (typeAndNumberOfItem.code === item.barcode) {
        typeAndNumberOfItem.name = item.name;
        typeAndNumberOfItem.unit = item.unit;
        typeAndNumberOfItem.price = item.price;
      }
    }
  }
  return typeAndNumberOfItems;
}

function getPromotion(itemsDetails, Promotions) {
  let barcode = Promotions[0].barcodes;
  for (let tempitem of itemsDetails) {
    for (let i = 0; i < barcode.length; i++) {
      if (tempitem.code === barcode[i]) {
        tempitem.status = 'Promotion';

      }
    }
  }
  return itemsDetails;
}

function countItem(itemsDetails) {
  for (let it of itemsDetails) {
    let mycount;
    if (it.hasOwnProperty('status')) {
      mycount = (parseInt(it.number / 3) * 2 + it.number % 3) * it.price;
      it.count = mycount;
    }
    else {
      mycount = it.number * it.price;
      it.count = mycount;
    }
  }
  return itemsDetails;
}

function countAllItems(itemsDetails) {
  let count = 0;
  let countfanal = 0;
  for (let it of itemsDetails) {
    count = count + it.count;
    countfanal = it.number * it.price + countfanal;
  }

  itemsDetails.push({
    finalcount: count,
    saved: countfanal - count
  })
  return itemsDetails;
}


function print(item) {
  let final = '***<没钱赚商店>收据***\n';
  for (let i = 0; i < item.length - 1; i++) {
    final = final + '名称：' + item[i].name + '，数量：' + item[i].number + '' + item[i].unit + '，单价：' + parseFloat(item[i].price).toFixed(2) + '(元)，小计：' + parseFloat(item[i].count).toFixed(2) + '(元)' + '\n';
  }
  final = final + '----------------------\n';
  final = final + '总计：' + parseFloat(item[item.length - 1].finalcount).toFixed(2) + '(元)' + '\n';
  final = final + '节省：' + item[item.length - 1].saved.toFixed(2) + '(元)' + '\n';
  final = final + '**********************';

  final = `${final}`;
  console.log(final);
}


function splitItem(barcode) {
  let tempId = {};
  if (barcode.indexOf('-') >= 0) {
    tempId = {
      code: barcode.split('-')[0],
      number: parseFloat(barcode.split('-')[1])
    }
  }
  else {
    tempId = {
      code: barcode,
      number: 1
    }
  }
  return tempId;
}

function containId(tempId, typeAndNumberOfItems) {
  let isContain=false;
  if (typeAndNumberOfItems.length !== 0) {
    for (let temp of typeAndNumberOfItems) {
      if (temp.code == tempId.code) {
        temp.number = temp.number + tempId.number;
        isContain=true;
      }
  }
  }
  return isContain;
}
