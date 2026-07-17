# Downloads assets for the map rendering and builds the app
git remote add origin $GIT_ORIGIN
git lfs install
git lfs fetch --include="$LFS_FILENAME"
git lfs checkout $LFS_FILENAME
tar -xzf $LFS_FILENAME
npm run build
