import 'isomorphic-fetch';
import type { GraphQLClient } from './types';

function highlightQuery(
  query: string,
  errors: Array<{
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>,
) {
  const locations = errors
    .map(function (e) {
      return e.locations;
    })
    .reduce(function (a, b) {
      return a.concat(b);
    }, []);

  let queryHighlight = '';

  query.split('\n').forEach(function (row, index) {
    const line = index + 1;
    const lineErrors = locations.filter(function (loc) {
      return loc && loc.line === line;
    });

    queryHighlight += row + '\n';

    if (lineErrors.length) {
      const errorHighlight: unknown[] = [];

      lineErrors.forEach(function (l) {
        for (let i = 0; i < 8; i++) {
          errorHighlight[l.column + i] = '~';
        }
      });

      for (let i = 0; i < errorHighlight.length; i++) {
        queryHighlight += errorHighlight[i] || ' ';
      }
      queryHighlight += '\n';
    }
  });

  return queryHighlight;
}

export function createGraphQLClient(params: {
  url: string;
  credentials?: RequestCredentials;
  headers?: {
    [name: string]: string;
  };
}): GraphQLClient {
  if (!params.url) {
    throw new Error('Missing url parameter');
  }
  if (!params.headers) {
    params.headers = {};
  }
  params.headers['Content-Type'] = 'application/json';

  return async (query, variables) => {
    const res = await fetch(params.url, {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
      headers: params.headers,
      credentials: params.credentials,
    });
    // if (onResponse) {
    //   onResponse(req, res);
    // }
    const body = await res.json();
    if (body.errors && body.errors.length) {
      body.highlightQuery = highlightQuery(query, body.errors);
    }
    return body;
  };
}
