import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPlanning = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Planning, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly giftForId?: string | null;
  readonly giftFromId?: string | null;
  readonly status?: string | null;
  readonly wantToGetGifts?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlanning = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Planning, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly giftForId?: string | null;
  readonly giftFromId?: string | null;
  readonly status?: string | null;
  readonly wantToGetGifts?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Planning = LazyLoading extends LazyLoadingDisabled ? EagerPlanning : LazyPlanning

export declare const Planning: (new (init: ModelInit<Planning>) => Planning) & {
  copyOf(source: Planning, mutator: (draft: MutableModel<Planning>) => MutableModel<Planning> | void): Planning;
}

type EagerAdminMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdminMessages, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message: string;
  readonly endDate?: string | null;
  readonly seenBy?: (string | null)[] | null;
  readonly startDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdminMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdminMessages, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message: string;
  readonly endDate?: string | null;
  readonly seenBy?: (string | null)[] | null;
  readonly startDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AdminMessages = LazyLoading extends LazyLoadingDisabled ? EagerAdminMessages : LazyAdminMessages

export declare const AdminMessages: (new (init: ModelInit<AdminMessages>) => AdminMessages) & {
  copyOf(source: AdminMessages, mutator: (draft: MutableModel<AdminMessages>) => MutableModel<AdminMessages> | void): AdminMessages;
}

type EagerGiving = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Giving, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: string | null;
  readonly giftId?: string | null;
  readonly actualPrice?: string | null;
  readonly buyerId?: string | null;
  readonly giverIds?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGiving = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Giving, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: string | null;
  readonly giftId?: string | null;
  readonly actualPrice?: string | null;
  readonly buyerId?: string | null;
  readonly giverIds?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Giving = LazyLoading extends LazyLoadingDisabled ? EagerGiving : LazyGiving

export declare const Giving: (new (init: ModelInit<Giving>) => Giving) & {
  copyOf(source: Giving, mutator: (draft: MutableModel<Giving>) => MutableModel<Giving> | void): Giving;
}

type EagerMoney = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Money, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owedFromName: string;
  readonly owedToName: string;
  readonly amount: number;
  readonly ownerId?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMoney = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Money, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owedFromName: string;
  readonly owedToName: string;
  readonly amount: number;
  readonly ownerId?: string | null;
  readonly note?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Money = LazyLoading extends LazyLoadingDisabled ? EagerMoney : LazyMoney

export declare const Money: (new (init: ModelInit<Money>) => Money) & {
  copyOf(source: Money, mutator: (draft: MutableModel<Money>) => MutableModel<Money> | void): Money;
}

type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email?: string | null;
  readonly authUsername?: string | null;
  readonly subuserModeOn?: boolean | null;
  readonly parentId?: string | null;
  readonly notes?: string | null;
  readonly isUser?: boolean | null;
  readonly editingUsers?: (string | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email?: string | null;
  readonly authUsername?: string | null;
  readonly subuserModeOn?: boolean | null;
  readonly parentId?: string | null;
  readonly notes?: string | null;
  readonly isUser?: boolean | null;
  readonly editingUsers?: (string | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}

type EagerGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Groups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupName?: string | null;
  readonly memberId?: (string | null)[] | null;
  readonly createdBy: string;
  readonly additionalAdmins?: (string | null)[] | null;
  readonly invitedEmail?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Groups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupName?: string | null;
  readonly memberId?: (string | null)[] | null;
  readonly createdBy: string;
  readonly additionalAdmins?: (string | null)[] | null;
  readonly invitedEmail?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Groups = LazyLoading extends LazyLoadingDisabled ? EagerGroups : LazyGroups

export declare const Groups: (new (init: ModelInit<Groups>) => Groups) & {
  copyOf(source: Groups, mutator: (draft: MutableModel<Groups>) => MutableModel<Groups> | void): Groups;
}

type EagerWishlistItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WishlistItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly custom?: boolean | null;
  readonly isPublic?: boolean | null;
  readonly createdById?: string | null;
  readonly seenBy?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWishlistItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WishlistItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly custom?: boolean | null;
  readonly isPublic?: boolean | null;
  readonly createdById?: string | null;
  readonly seenBy?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WishlistItem = LazyLoading extends LazyLoadingDisabled ? EagerWishlistItem : LazyWishlistItem

export declare const WishlistItem: (new (init: ModelInit<WishlistItem>) => WishlistItem) & {
  copyOf(source: WishlistItem, mutator: (draft: MutableModel<WishlistItem>) => MutableModel<WishlistItem> | void): WishlistItem;
}

type EagerTheme = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Theme, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly themeName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTheme = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Theme, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly themeName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Theme = LazyLoading extends LazyLoadingDisabled ? EagerTheme : LazyTheme

export declare const Theme: (new (init: ModelInit<Theme>) => Theme) & {
  copyOf(source: Theme, mutator: (draft: MutableModel<Theme>) => MutableModel<Theme> | void): Theme;
}

type EagerComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isWishlistComment: string;
  readonly posterId: string;
  readonly groupIds?: string[] | null;
  readonly isVisibleToOwner: boolean;
  readonly commentText: string;
  readonly parentId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isWishlistComment: string;
  readonly posterId: string;
  readonly groupIds?: string[] | null;
  readonly isVisibleToOwner: boolean;
  readonly commentText: string;
  readonly parentId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments>) => MutableModel<Comments> | void): Comments;
}