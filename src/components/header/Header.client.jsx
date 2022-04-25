import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-20" role="banner">
      <div
        className={`fixed z-20 h-20 lg:h-20 w-full px-6 md:px-8 md:py-6 lg:pt-3 lg:pb-0 mx-auto bg-primary text-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div 
          className="h-full flex lg:flex-col place-content-between lg:max-w-7xl m-auto"
          style={{
             paddingRight: isCartOpen ? scrollbarWidth : 0,
           }}
        >
          <div className="text-center w-full flex justify-between items-center">
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="font-bold uppercase text-3xl tracking-widest"
              to="/"
            >
              {storeName}
            </Link>
            <Navigation collections={collections} storeName={storeName} />
            <div className="flex">
              <div className="items-center mr-8 hidden lg:block">
                <CountrySelector />
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
