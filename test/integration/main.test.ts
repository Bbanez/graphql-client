import { expect } from 'chai';
import { createGraphQLClient } from '../../src';

describe('Call SpaceX API', async () => {
  it('should call SpaceX API', async () => {
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
    expect(result.data)
      .to.be.an('object')
      .to.have.property('ships')
      .to.be.an('array');
    expect(result.data.ships[0]).to.be.an('object').to.have.property('name');
    expect(result.data.ships[0]).to.be.an('object').to.have.property('image');
  });
});
