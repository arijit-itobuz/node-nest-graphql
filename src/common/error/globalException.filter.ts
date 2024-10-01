import { ExceptionFilter, Catch } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any): void {
    if (exception?.response?.message) {
      throw new GraphQLError(exception.response.message);
    }

    throw new GraphQLError(exception?.message ?? 'Server Error');
  }
}
