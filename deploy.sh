# Downloads assets for the map rendering and builds the app
git remote add origin https://github.com/abiola-ajibola/sst-raster-globe.git
git lfs install
git lfs fetch --include="assets.tar.gz"
git lfs checkout assets.tar.gz
tar -xzf assets.tar.gz
# ls -r ./public
npm run build
