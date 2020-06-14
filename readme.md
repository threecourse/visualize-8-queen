### visualize-8-queen

Nuxt.jsで作成した、エイト・クイーン問題を題材にしたGUIです。  
GitHub Pagesで公開しています。 

https://threecourse.github.io/visualize-8-queen/

#### コードを手元で動かす

```
# yarnのインストールが必要
yarn dev
```

#### スクラッチからこのコードの構成にする

```
PROJECT_NAME=visualize-8-queen

# create nuxt-app
# eslint, prettierは導入
yarn create nuxt-app $PROJECT_NAME

# install bulma
# follow https://qiita.com/mnmemo/items/5eb4fb8cbfe17670fd36

# install libraries
yarn add @fortawesome/fontawesome-free
yarn add nuxt-svg-loader --dev
yarn add toastr
```