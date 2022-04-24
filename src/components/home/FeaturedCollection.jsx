import {Image, Link} from '@shopify/hydrogen';

/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function FeaturedCollection({collection}) {
  return collection ? (
    <div className="shadow-xl mb-5 rounded-xl grid grid-cols-1 lg:grid-cols-2 items-center bg-white overflow-hidden w-full">
      {collection.image ? (
        <Image width="622" height="465" data={collection.image} />
      ) : null}
      <div className="text-center md:text-left px-10 py-10 lg:py-0">
        <h2 className="text-secondary text-3xl font-bold mb-5">
          {collection.title}
        </h2>
        <p className="text-lg text-secondary mb-6">{collection.description}</p>
        <Link
          to={`/collections/${collection.handle}`}
          className="border border-black font-bold hover:bg-secondary hover:text-white hover:border-secondary inline-block text-black text-lg rounded-full py-4 px-16 uppercase"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  ) : null;
}
