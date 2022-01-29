import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import CurrencySelector from './CurrencySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="h-20 lg:h-32" role="banner">
      <div
        className={`fixed z-20 h-20 lg:h-20 w-full px-6 md:px-8 md:py-6 lg:pt-3 lg:pb-0 mx-auto bg-primary text-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div className="h-full flex lg:flex-col place-content-between lg:max-w-7xl m-auto">
          <div className="text-center w-full flex justify-between items-center">
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="font-black uppercase text-3xl tracking-widest"
              to="/"
            >
              {storeName}
            </Link>
            <Navigation collections={collections} storeName={storeName} />
            <div className="flex">
              <div className="flex items-center mr-8">
                <CurrencySelector />
              </div>
              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
