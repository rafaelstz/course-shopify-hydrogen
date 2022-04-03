import {useServerState} from '@shopify/hydrogen/client';
import SpinnerIcon from '../SpinnerIcon.client';

/**
 * A client component that provides functionality to initially show a subset of products and a button to load more products
 */
export default function LoadMoreProducts({startingCount}) {
  const {pending, serverState, setServerState} = useServerState();

  return (
    <div className="flex justify-center h-14 mb-20">
      {pending ? (
        <SpinnerIcon />
      ) : (
        <button
          type="button"
          disabled={pending}
          className={`rounded-full uppercase border border-secondary text-secondary text-center px-5 py-3 hover:bg-secondary hover:text-white hover:border-secondary ${
            pending ? 'opacity-50' : undefined
          }`}
          onClick={() => {
            setServerState(
              'collectionProductCount',
              serverState.collectionProductCount
                ? serverState.collectionProductCount + 24
                : startingCount + 1,
            );
          }}
        >
          See more
        </button>
      )}
    </div>
  );
}
