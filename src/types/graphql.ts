import { MakerOrderWithSignatureAndHash } from "./orders";
import { TokenStandard } from "./config";
import { BigNumberish } from "ethers";

export interface CollectionOwner {
  address: string;
  isVerified?: boolean;
  name?: string;
  avatar?: Omit<UserAvatar, "collection" | "name" | "description">;
}

export interface CollectionVolume {
  volumeAll: BigNumberish | null;
  volume24h: BigNumberish | null;
  change24h: number | null;
}

export interface CollectionFloor {
  floorPriceOS: BigNumberish | null;
  floorPrice: BigNumberish | null;
  floorChange24h: number | null;
  floorChange7d: number | null;
  floorChange30d: number | null;
}

// Used for most minimal Collection displays i.e. within collection tables
export interface CollectionBase {
  name: string;
  address: string;
  type: TokenStandard;
  logo?: ImageData;
  isVerified?: boolean;
  isExplicit?: boolean;
  points: number | null;
  volume: CollectionVolume;
  countOwners?: number;
  totalSupply?: number;
  // @DEPRECATED floorOrder is deprecated, use floor.floorPrice instead. Remove floorOrder when fully migrated
  floorOrder?: {
    price: BigNumberish;
  };
  floor: CollectionFloor;
}

/**
 * Used for populating filters by collection
 */
export interface CollectionFilterItem {
  name: string;
  address: string;
  totalSupply: number;
  volume: Pick<CollectionVolume, "volume24h">;
  owned: BigNumberish;
  logo?: ImageData;
  isVerified: boolean;
  points: number | null;
  floorOrder?: {
    price: BigNumberish;
  };
}

export interface Collection extends CollectionBase {
  owner: CollectionOwner;
  description?: string;
  banner?: ImageData;
  totalSupply?: number;
  websiteLink?: string;
  facebookLink?: string;
  twitterLink?: string;
  telegramLink?: string;
  instagramLink?: string;
  mediumLink?: string;
  discordLink?: string;
  countOwners?: number;
}

// @TODO this needs to be renamed to be more clear as it is not a user object but an NFT
export interface UserAvatar {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: ImageData;
  collection: {
    address: string;
  };
}

// This type is used in conjunction with displaying a user link
export interface UserProfileDisplay {
  address: string;
  isVerified: boolean;
  image?: ImageData;
  name?: string;
  ensDomain?: string | null;
}

export interface User {
  address: string;
  isVerified?: boolean;
  name?: string;
  avatar?: UserAvatar;
  biography?: string;
  websiteLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  countCollections?: number;
  listingReward24h?: {
    totalPoints: number;
    points: number;
    updatedAt: string;
  } | null;
}

export interface TokenOwner {
  address: string;
  balance: BigNumberish;
}

// Not intended to be used except for extending
interface NftBase {
  id: string;
  tokenId: string;
  image: ImageData;
  name: string;
  animation?: AnimationData;
  description?: string;
  attributes?: Attribute[];
}

// Simplified NFT for displaying/selecting an nft
export interface NFTAvatar {
  id: NFT["id"];
  tokenId: NFT["tokenId"];
  collection: NFT["collection"]["address"];
  image: NFT["image"];
  name: NFT["name"];
}

// Collection props requested by NFT entity
export interface NFTCollection {
  address: string;
  name: string;
  type: TokenStandard;
  totalSupply: number;
  logo?: ImageData;
  isVerified?: boolean;
  points: number | null;
  owner?: CollectionOwner;
  description?: string;
  floorOrder?: {
    price: BigNumberish;
  };
  floor: CollectionFloor;
}

export interface NFT extends NftBase {
  countOwners: number;
  collection: NFTCollection;
  ask?: MakerOrderWithSignatureAndHash; // There is an ask only if the NFT is listed for direct sale
  bids: MakerOrderWithSignatureAndHash[]; // The bid array will be empty of there is no offer
  lastOrder?: { price: BigNumberish; currency: string };
}

// Collection props requested by NFTCard entity
export type NFTCardCollection = {
  address: string;
  name: string;
  type: TokenStandard;
  isVerified?: boolean;
  points: number | null;
  floorOrder?: { price: BigNumberish };
  floor: CollectionFloor;
  totalSupply: number;
  volume: CollectionVolume;
};

// Used for NFT Grid Card components
export interface NFTCard extends Omit<NFT, "attributes" | "collection" | "animation" | "countOwners"> {
  owners: TokenOwner[];
  collection: NFTCardCollection;
}

/**
 * CollectionTokenTransaction
 */

export enum EventType {
  MINT = "MINT",
  TRANSFER = "TRANSFER",
  LIST = "LIST",
  SALE = "SALE",
  OFFER = "OFFER",
  CANCEL_LIST = "CANCEL_LIST",
  CANCEL_OFFER = "CANCEL_OFFER",
}

export interface EventOrder {
  price: BigNumberish;
  currency: string;
  isOrderAsk: boolean;
  strategy: string;
  endTime?: string;
  status?: OrderStatus;
  params?: any[];
}

export interface Event {
  id: string;
  from: UserProfileDisplay;
  to?: UserProfileDisplay;
  type: EventType;
  createdAt: string;
  hash?: string;
  order?: EventOrder;
  token?: {
    tokenId: number;
    image: ImageData;
    name: string;
  };
  collection: {
    address: string;
    name: string;
    description: string;
    totalSupply: number;
    logo?: ImageData;
    floorOrder?: {
      price: BigNumberish;
    };
  };
}

export interface Attribute {
  traitType: string;
  value: string;
  displayType?: string | null;
  count?: number;
  floorOrder?: {
    price: BigNumberish;
  };
}

export interface Pagination {
  first?: number;
  cursor?: string;
}

export interface TokenFilter {
  collection?: string;
  owner?: string;
  order?: OrderFilter;
  withAskOnly?: boolean;
  withoutAskOnly?: boolean;
  withStandardBidOnly?: boolean;
  withCollectionBidOnly?: boolean;
  attributes?: AttributeFilter[];
  flag?: TokenFlag[];
}

export interface TokenOwnerFilter {
  addresses?: string[];
}

export interface PriceFilter {
  min?: BigNumberish | null;
  max?: BigNumberish | null;
}

export interface AttributeFilter {
  traitType: string;
  values: string[];
}

export interface OrderFilter {
  isOrderAsk?: boolean;
  collection?: string;
  tokenId?: string;
  signer?: string;
  strategy?: string;
  price?: PriceFilter;
  currency?: string;
  startTime?: BigNumberish;
  endTime?: BigNumberish;
  status?: OrderStatus[];
}

export enum OrderStatus {
  CANCELLED = "CANCELLED",
  EXECUTED = "EXECUTED",
  EXPIRED = "EXPIRED",
  VALID = "VALID",
  INVALID_OWNER = "INVALID_OWNER", // stale ask
  ERC_APPROVAL = "ERC_APPROVAL", // stale ask
  ERC20_APPROVAL = "ERC20_APPROVAL", // stale bid
  ERC20_BALANCE = "ERC20_BALANCE", // stale bid
}

export interface EventFilter {
  collection?: string;
  tokenId?: string;
  from?: string;
  type?: EventType[];
}

export enum TokenFlag {
  NO_IMAGE = "NO_IMAGE",
  NONE = "NONE",
  ERROR = "ERROR",
  TRIAGE = "TRIAGE",
}

export enum OrderSort {
  EXPIRING_SOON = "EXPIRING_SOON",
  NEWEST = "NEWEST",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
}

// Not intended to show the user
export enum CollectionInternalSort {
  LISTING_REWARD = "LISTING_REWARD",
}

export enum CollectionsSort {
  CHANGE_24H_ASC = "CHANGE_24H_ASC",
  CHANGE_24H_DESC = "CHANGE_24H_DESC",
  HIGHEST_24H = "HIGHEST_24H",
  HIGHEST_TOTAL = "HIGHEST_TOTAL",
}

// Note - this is not all possible relative collection sorts, just those currently used by the app
export enum RelativeCollectionsSort {
  ALPHABETICAL_ASC = "ALPHABETICAL_ASC",
  HIGHEST_24H = "HIGHEST_24H",
  OWNED_ASC = "OWNED_ASC",
  OWNED_DESC = "OWNED_DESC",
}

export enum TokensSort {
  LAST_RECEIVED = "LAST_RECEIVED",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
}

export interface Royalty {
  id: string;
  currency: string;
  amount: BigNumberish;
  to: string;
  hash: string;
  createdAt: string;
  token: {
    id: string;
    tokenId: string;
    image: ImageData;
    name: string;
  };
}

export interface ImageData {
  src: string;
  contentType?: string;
}

export interface AnimationData {
  src: string;
  contentType?: string;
  original?: string;
}

export interface CurrentListingReward {
  count: number;
  totalPoints: number;
}
