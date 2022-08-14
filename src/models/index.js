// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comments, Theme, Money, WishlistItem, Groups, Users } = initSchema(schema);

export {
  Comments,
  Theme,
  Money,
  WishlistItem,
  Groups,
  Users
};