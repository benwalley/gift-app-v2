// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Money, Users, Groups, WishlistItem, Theme, Comments } = initSchema(schema);

export {
  Money,
  Users,
  Groups,
  WishlistItem,
  Theme,
  Comments
};