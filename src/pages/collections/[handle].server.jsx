import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../components/category/LoadMoreProducts.client';
import Layout from '../../components/Layout.server';
import ProductCard from '../../components/product/ProductCard';
import NotFound from '../../components/NotFound.server';

function FreeShippingBar({msg}) {
  return (
    <div className="bg-secondary text-center px-4 py-3">
      <span className="text-sm text-white">{msg}</span>
    </div>
  );
}

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 24,
  params,
}) {
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  if (data?.collection == null) {
    return <NotFound />;
  }

  const collection = data.collection;
  const products = flattenConnection(collection.products);
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout hero={<FreeShippingBar msg={'Free shipping on orders over $50'} />}>
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {collection.title}
      </h1>
      <RawHtml string={collection.descriptionHtml} className="text-lg" />
      <p className="text-sm text-secondary mt-5 mb-5">
        {products.length} {products.length > 1 ? 'products' : 'product'}
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $numProducts: Int!
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 0
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml

      products(first: $numProducts) {
        edges {
          node {
            vendor
            ...ProductProviderFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }

  ${MediaFileFragment}
  ${ProductProviderFragment}
`;
