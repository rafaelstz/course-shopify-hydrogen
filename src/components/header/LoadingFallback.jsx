import CartIcon from './CartIcon';
import OpenIcon from './OpenIcon';

/**
 * A shared component and Suspense call that's used in `App.server.jsx` to let your app wait for code to load while declaring a loading state
 */
export default function LoadingFallback() {
  return (
    <header className="h-20 lg:h-20">
      <div className="fixed z-20 h-20 lg:h-20 w-full px-6 md:px-8 md:py-6 lg:pt-3 lg:pb-0 mx-auto bg-primary text-white">
        <div className="h-full flex lg:flex-col place-content-between lg:max-w-7xl m-auto">
          <div className="text-center w-full flex justify-between items-center">
            <div className="lg:hidden flex justify-center items-center w-7 h-full">
              <OpenIcon />
            </div>
            <p className="font-bold uppercase text-3xl tracking-widest">
              Snowdevil
            </p>
            <div className="hidden lg:block w-16" />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
