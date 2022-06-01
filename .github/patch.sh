# Apply updates to the folders

# yarn create hydrogen-app test -s
# rm -rf 01-Fundamentals
# mv test 01-Fundamentals
# git diff > mypatch.patch

cp mypatch.patch 02-Components.patch && sed -i '' 's/01-Fundamentals/02-Components/g' ./02-Components.patch && patch -p1 < ./02-Components.patch && \
cp mypatch.patch 03-Header.patch && sed -i '' 's/01-Fundamentals/03-Header/g' ./03-Header.patch && patch -p1 < ./03-Header.patch && \
cp mypatch.patch 04-Header-mobile.patch && sed -i '' 's/01-Fundamentals/04-Header-mobile/g' ./04-Header-mobile.patch && patch -p1 < ./04-Header-mobile.patch && \
cp mypatch.patch 05-Header-fallback.patch && sed -i '' 's/01-Fundamentals/05-Header-fallback/g' ./05-Header-fallback.patch && patch -p1 < ./05-Header-fallback.patch && \
cp mypatch.patch 06-Footer.patch && sed -i '' 's/01-Fundamentals/06-Footer/g' ./06-Footer.patch && patch -p1 < ./06-Footer.patch && \
cp mypatch.patch 07-Home-banner.patch && sed -i '' 's/01-Fundamentals/07-Home-banner/g' ./07-Home-banner.patch && patch -p1 < ./07-Home-banner.patch && \
cp mypatch.patch 08-Home-products.patch && sed -i '' 's/01-Fundamentals/08-Home-products/g' ./08-Home-products.patch && patch -p1 < ./08-Home-products.patch && \
cp mypatch.patch 09-Home-new-collection.patch && sed -i '' 's/01-Fundamentals/09-Home-new-collection/g' ./09-Home-new-collection.patch && patch -p1 < ./09-Home-new-collection.patch && \
cp mypatch.patch 10-Featured-banner.patch && sed -i '' 's/01-Fundamentals/10-Featured-banner/g' ./10-Featured-banner.patch && patch -p1 < ./10-Featured-banner.patch && \
cp mypatch.patch 11-Category-page.patch && sed -i '' 's/01-Fundamentals/11-Category-page/g' ./11-Category-page.patch && patch -p1 < ./11-Category-page.patch && \
cp mypatch.patch 12-Product-page.patch && sed -i '' 's/01-Fundamentals/12-Product-page/g' ./12-Product-page.patch && patch -p1 < ./12-Product-page.patch && \
cp mypatch.patch 13-Page-not-found.patch && sed -i '' 's/01-Fundamentals/13-Page-not-found/g' ./13-Page-not-found.patch && patch -p1 < ./13-Page-not-found.patch 

rm -rf ./**/*.orig


# Moving files to folder structure
mkdir -p src/components/{category,footer,header,home,product}
mv src/components/LoadMoreProducts.client.jsx src/components/category/
mv src/components/Footer.server.jsx src/components/footer/
mv src/components/{Cart.client.jsx,CartIcon.jsx,CartIconWithItems.client.jsx,CartProvider.client.jsx,CartToggle.client.jsx,CartUIProvider.client.jsx,CountrySelector.client.jsx,Header.client.jsx,LoadingFallback.jsx,MobileCountrySelector.client.jsx,MobileNavigation.client.jsx,Navigation.client.jsx,OpenIcon.jsx} src/components/header/
mv src/components/{FeaturedCollection.jsx,Welcome.server.jsx} src/components/home/
mv src/components/{Gallery.client.jsx,MoneyCompareAtPrice.client.jsx,MoneyPrice.client.jsx,ProductCard.jsx,ProductDetails.client.jsx,ProductOptions.client.jsx} src/components/product/
