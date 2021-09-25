import { QueryInput, Cache } from '@urql/exchange-graphcache';

export function typedCacheUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any); //in this line, we are actually performing the update to the cache.
}
