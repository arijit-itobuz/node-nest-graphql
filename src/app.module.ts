import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'node:path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrivilegeModule } from './privilege/privilege.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    UserModule,
    PrivilegeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
