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

const outItem = {
  getOutOrderList: '/out-order-list',
  getOutOrderDetail: '/out-order-detail',
  getOutOrderProductList: '/out-order-product-list',
  getOutOrderProductStoreList: '/out-order-product-store-list',
  getOutOrderProductStoreDetail: '/out-order-product-store-detail',
  getOutProductPublicityByMonth: '/hs-month-out-product-publicity',
  getOutPublicityOrderDetail: '/out-publicity-order-detail',
  getOutPublicityOrderProductList: '/out-publicity-order-product-list',
  getOutOrderProcessPathTimeline: '/out-order-process-path-timeline'
}

function addBase(url) {
  let api = {}

  _.forIn(url, (v, k) => {
    join(v.base ? v.list : v, v.base || '')
  })

  function join(list, base) {
    _.forIn(list, (val, key) => {
      api[key] = base + val
    })
  }

  return api
}

let urls = addBase({
  master,
  outItem
})

export { urls }
