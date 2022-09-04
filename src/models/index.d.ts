import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CommentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ThemeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MoneyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WishlistItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GroupsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Comments {
  readonly id: string;
  readonly isWishlistComment: string;
  readonly posterId: string;
  readonly groupIds?: string[] | null;
  readonly isVisibleToOwner: boolean;
  readonly commentText: string;
  readonly parentId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comments, CommentsMetaData>);
  static copyOf(source: Comments, mutator: (draft: MutableModel<Comments, CommentsMetaData>) => MutableModel<Comments, CommentsMetaData> | void): Comments;
}

export declare class Theme {
  readonly id: string;
  readonly userId?: string | null;
  readonly themeName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Theme, ThemeMetaData>);
  static copyOf(source: Theme, mutator: (draft: MutableModel<Theme, ThemeMetaData>) => MutableModel<Theme, ThemeMetaData> | void): Theme;
}

export declare class Money {
  readonly id: string;
  readonly owedFromName: string;
  readonly owedToName: string;
  readonly amount: number;
  readonly ownerId?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Money, MoneyMetaData>);
  static copyOf(source: Money, mutator: (draft: MutableModel<Money, MoneyMetaData>) => MutableModel<Money, MoneyMetaData> | void): Money;
}

export declare class WishlistItem {
  readonly id: string;
  readonly name: string;
  readonly price?: string | null;
  readonly images?: (string | null)[] | null;
  readonly note?: string | null;
  readonly groups?: (string | null)[] | null;
  readonly ownerId: string;
  readonly priority?: string | null;
  readonly link?: string | null;
  readonly gottenBy?: (string | null)[] | null;
  readonly wantsToGet?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<WishlistItem, WishlistItemMetaData>);
  static copyOf(source: WishlistItem, mutator: (draft: MutableModel<WishlistItem, WishlistItemMetaData>) => MutableModel<WishlistItem, WishlistItemMetaData> | void): WishlistItem;
}

export declare class Groups {
  readonly id: string;
  readonly groupName?: string | null;
  readonly memberId?: (string | null)[] | null;
  readonly createdBy: string;
  readonly additionalAdmins?: (string | null)[] | null;
  readonly invitedEmail?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Groups, GroupsMetaData>);
  static copyOf(source: Groups, mutator: (draft: MutableModel<Groups, GroupsMetaData>) => MutableModel<Groups, GroupsMetaData> | void): Groups;
}

export declare class Users {
  readonly id: string;
  readonly username: string;
  readonly email?: string | null;
  readonly authUsername?: string | null;
  readonly subuserModeOn?: boolean | null;
  readonly parentId?: string | null;
  readonly notes?: string | null;
  readonly isUser?: boolean | null;
  readonly editingUsers?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}