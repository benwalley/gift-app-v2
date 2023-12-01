// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Planning, AdminMessages, Giving, Money, Users, Groups, WishlistItem, Theme, Comments } = initSchema(schema);

export {
  Planning,
  AdminMessages,
  Giving,
  Money,
  Users,
  Groups,
  WishlistItem,
  Theme,
  Comments
};