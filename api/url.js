let urls = {}

const bi = {
  base: '/huashang/bi/',
  list: {
    getCategory: 'category/list',
    getSubCategoryLevel: 'sub/category/list',
    getAllSubCategoryLevel: 'category/search'
  }
}

const master = {
  base: '/api/master-data/',
  list: {
    getOperation: 'get-store-operation',
    getDistrict: 'get-mt-store-district',
    getProduct: 'get-product-list-with-page',
    getStoreGroup: 'get-storegroup',
    getStore: 'get-mt-store-by-condition',
    getBrand: 'get-brand-list-with-page',
    getSupplier: 'get-supplier',
    getClass: 'get-class-list',
    getClassLevel: 'get-sub-class-level-list',
    getCategory: 'get-category-list',
    getCategoryLevel: 'get-sub-category-level-list'
  }
}

function addBase(url) {
  _.forIn(url, (v, k) => {
    join(v.base ? v.list : v, v.base || '')
  })

  function join(list, base) {
    _.forIn(list, (val, key) => {
      urls[key] = base + val
    })
  }
}

addBase({
  master,
  bi
})

export { urls }
