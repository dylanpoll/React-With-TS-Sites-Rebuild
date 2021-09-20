import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import { GRAPHQL_URL } from '../constants';

function typedCacheUpdateQuery<Result, Query>(//used this to enforce type definitions will review and look for better options.
    cache: Cache,                             //this function is more or less creating a local object to position the managed data for updating the cache
    qi: QueryInput,                           //this needs to be optimized later but doing this allows me to enforce types without linter or runtime errors
    result: any,
    fn: (r: Result, q: Query) => Query
  ){
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);  //in this line, we are actually performing the update to the cache.
  }
  
  //reason for disabling unused var is due to it not being called but it will be used as a check against events where listed mutations are ran.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const client = createClient({  //https://formidable.com/open-source/urql/docs/graphcache/cache-updates/
    url: GRAPHQL_URL,   //this should always be your graphql link -> mine is set as a exported variable incase I use it multiple places for any reason
    exchanges: [
      dedupExchange, 
      cacheExchange({  //any actions taken within queries to or from graphQL that need to end with a immediate update to the cache can be listed here within updates: {}
        updates: {
          Mutation: {
            logout: (_result, args, cache, info) => {  // this ensures that the site will immediately reflect signing in avoiding refreshing
              typedCacheUpdateQuery<LogoutMutation,  MeQuery>(
                cache, 
                {query: MeDocument},
                _result,
                () => ({ me: null})
              );
            },
            login: (_result, args, cache, info) => {  // this ensures that the site will immediately reflect signing in avoiding refreshing
                typedCacheUpdateQuery<LoginMutation, MeQuery>(  //this is the function that will take the data and actually perform the cache update
                  cache, 
                  {query: MeDocument},
                  _result,
                  (result, query) => {
                      if(result.login.errors){
                        return query;
                      }else{
                        return { me: result.login.user };
                      }
                  }
                );
            },
            register: (_result, args, cache, info) => {// this ensures that the site will immediately reflect registering as it auto signs you in avoiding refreshing
              typedCacheUpdateQuery<RegisterMutation, MeQuery>(
                cache, 
                {query: MeDocument},
                _result,
                (result, query) => {
                    if(result.register.errors){
                      return query;
                    }else{
                      return { me: result.register.user };
                    }
                }
              );
          }
          }
        },
      }), fetchExchange],
  });