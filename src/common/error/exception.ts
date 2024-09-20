import { GraphQLError } from 'graphql';

export function Exception(error: any, message: string) {
  if (error.name === 'GraphQLError' && error.message) {
    throw new GraphQLError(error.message);
  }
  throw new GraphQLError(message);
}
