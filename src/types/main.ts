export interface GraphQLQueryData {
  [collection: string]: {
    [name: string]: GraphQLQueryResult<unknown>;
  };
}

export interface GraphQLQueryResult<T> {
  error: {
    status: number;
    message: string;
  } | null;
  result: T;
}

export interface GraphQLClient {
  <Data>(
    query: string,
    variables?: unknown,
    onResponse?: (req: Request, res: Response) => void,
  ): Promise<{ data: Data; errors: Array<{ message: string }> }>;
}
