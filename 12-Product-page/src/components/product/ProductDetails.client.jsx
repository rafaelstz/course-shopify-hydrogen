import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';

import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import Seo from '../Seo.client';
import {
  BUTTON_TERTIARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from '../Button.client';

/**
 * A client component that displays detailed information about a product to allow buyers to make informed decisions
 */
function ProductPriceMarkup() {
  return (
    <div className="flex md:flex-col items-end font-semibold text-xl md:items-start md:mb-4">
      <Product.SelectedVariant.Price
        priceType="compareAt"
        className="text-gray-500 line-through mr-2.5"
      >
        {({amount, currencyNarrowSymbol}) => `${currencyNarrowSymbol}${amount}`}
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.Price className="text-gray-900">
        {({currencyCode, amount, currencyNarrowSymbol}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}`
        }
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.UnitPrice className="text-gray-500">
        {({currencyCode, amount, currencyNarrowSymbol, referenceUnit}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}/${referenceUnit}`
        }
      </Product.SelectedVariant.UnitPrice>
    </div>
  );
}

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8">
      <Product.SelectedVariant.AddToCartButton
        className={BUTTON_TERTIARY_CLASSES}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </Product.SelectedVariant.AddToCartButton>
      {isOutOfStock ? (
        <p className="text-black text-center">Available in 2-3 weeks</p>
      ) : (
        <Product.SelectedVariant.BuyNowButton
          className={BUTTON_SECONDARY_CLASSES}
        >
          Buy it now
        </Product.SelectedVariant.BuyNowButton>
      )}
    </div>
  );
}

function SizeChart() {
  return (
    <>
      <h3
        className="text-xl text-black font-semibold mt-8 mb-4"
        id="size-chart"
      >
        Size Chart
      </h3>
      <table className="min-w-full table-fixed text-sm text-center bg-white">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="w-1/4 py-2 px-4 font-normal">Board Size</th>
            <th className="w-1/4 py-2 px-4 font-normal">154</th>
            <th className="w-1/4 py-2 px-4 font-normal">158</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-secondary">Weight Range</td>
            <td className="p-3 border border-secondary">120-180 lbs. /54-82kg</td>
            <td className="p-3 border border-secondary">150-200 lbs. /68-91 kg</td>
          </tr>
          <tr>
            <td className="p-3 border border-secondary">Waist Width</td>
            <td className="p-3 border border-secondary">246mm</td>
            <td className="p-3 border border-secondary">255mm</td>
          </tr>
          <tr>
            <td className="p-3 border border-secondary">Stance Width</td>
            <td className="p-3 border border-secondary">-40</td>
            <td className="p-3 border border-secondary">-40</td>
          </tr>
          <tr>
            <td className="p-3 border border-secondary">Binding Sizes</td>
            <td className="p-3 border border-secondary">
              Men&rsquo;s S/M, Women&rsquo;s S/M
            </td>
            <td className="p-3 border border-secondary">
              Men&rsquo;s L, Women&rsquo;s L
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];

  return (
    <>
      <Seo product={product} />
      <Product product={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8 my-13">
          <div className="md:hidden mt-5 mb-8">
            <Product.Title
              as="h1"
              className="text-4xl font-bold text-black mb-4"
            />
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPriceMarkup />
            </div>
          </div>

          <Gallery />

          <div>
            <div className="hidden md:block">
              <Product.Title
                as="h1"
                className="text-5xl font-bold text-black my-4"
              />
              {product.vendor && (
                <div className="text-sm font-medium mb-2 text-secondary">
                  {product.vendor}
                </div>
              )}
              <ProductPriceMarkup />
            </div>
            {/* Product Options */}
            <div className="mt-8">
              <ProductOptions />
              <Product.Metafield namespace="my_fields" keyName="size_chart">
                {({value}) => {
                  return value ? (
                    <a
                      href="#size-chart"
                      className="block underline text-gray-500 text-lg tracking-wide my-6"
                    >
                      Size Chart
                    </a>
                  ) : null;
                }}
              </Product.Metafield>
              <AddToCartMarkup />
            </div>
            {/* Product Description */}
            <Product.Description className="prose border-t border-gray-200 pt-6 text-secondary text-md" />
            <Product.Metafield namespace="my_fields" keyName="size_chart">
              {({value}) => {
                return value ? (
                  <div className="border-t border-gray-200">
                    <SizeChart />
                  </div>
                ) : null;
              }}
            </Product.Metafield>
          </div>
        </div>
      </Product>
    </>
  );
}
