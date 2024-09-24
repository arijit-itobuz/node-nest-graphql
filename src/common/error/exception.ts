import { GraphQLError } from 'graphql';

// use this only in catch block
export function Exception(error: any, message: string) {
  if (error.name === 'GraphQLError' && error.message) {
    throw new GraphQLError(error.message);
  }
  throw new GraphQLError(message);
}
