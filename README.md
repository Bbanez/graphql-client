# GraphQL Client

[![NPM Version][npm-image]][npm-url]

This project is a simple and easy GraphQL client based on project created by [nordsimon](https://github.com/nordsimon/graphql-client). Is far as I was able to see this package is not maintained any more and it does not provide types. Since I personally liked it for its simplicity, small footprint and ease of use, I decided to refactor it and move it to typescript. I hope that you will find it useful.

## Usage

```ts
const graphql = createGraphQLClient({
  url: 'https://api.spacex.land/graphql/',
});

const result = await graphql<{
  ships: Array<{
    name: string;
    image: string;
  }>;
}>(
  `
    query ($limit: Int!) {
      ships(limit: $limit) {
        name
        image
      }
    }
  `,
  {
    limit: 10,
  },
);

console.log(result);
```

[npm-url]: https://npmjs.org/package/@banez/graphql-client
