import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NFT_Marketplace/NFT_Marketplace";
import {
  ItemBought,
  ActiveItem,
  ItemCancelled,
  ItemListed,
} from "../generated/schema";

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
    );
  }
  itemListed.owner = event.params.owner;
  activeItem.owner = event.params.owner;

  itemListed.NFTaddress = event.params.NFTaddress;
  activeItem.NFTaddress = event.params.NFTaddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCancelled = ItemCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  if (!itemCancelled) {
    itemCancelled = new ItemCancelled(
      getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
    );
  }
  itemCancelled.buyer = event.params.buyer;
  itemCancelled.NFTaddress = event.params.NFTaddress;
  itemCancelled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCancelled.save();
  activeItem!.save();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
  );
  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.NFTaddress)
    );
  }
  itemBought.buyer = event.params.buyer;
  itemBought.NFTaddress = event.params.NFTaddress;
  itemBought.tokenId = event.params.tokenId;
  activeItem!.owner = event.params.buyer;

  itemBought.save();
  activeItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, NFTaddress: Address): string {
  return tokenId.toHexString() + NFTaddress.toHexString();
}

// export function handleItemBought(event: ItemBoughtEvent): void {
//   let entity = new ItemBought(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.NFTaddress = event.params.NFTaddress
//   entity.tokenId = event.params.tokenId
//   entity.price = event.params.price

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleItemCancelled(event: ItemCancelledEvent): void {
//   let entity = new ItemCancelled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.NFTaddress = event.params.NFTaddress
//   entity.tokenId = event.params.tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleItemListed(event: ItemListedEvent): void {
//   let entity = new ItemListed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.owner = event.params.owner
//   entity.NFTaddress = event.params.NFTaddress
//   entity.tokenId = event.params.tokenId
//   entity.price = event.params.price

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
