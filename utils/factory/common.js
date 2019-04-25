import Vue from 'vue'
import { urls } from 'utils/api'
import { types } from 'utils/constant'
import { CHANGE_TABLE_LOADING } from 'utils/types/mutation-types'

/**
 * 获取指定类型的模态框接口信息
 * @param type 类型（门店，品牌等）
 * @returns {*}
 */
export function getUrlByType(type) {
  switch (type) {
    case types.brand.sign:
      return urls.getBrand

    case types.category.sign:
      return {
        tree: urls.getCategory,
        list: urls.getCategoryLevel
      }

    case types.product.sign:
      return urls.getProduct

    case types.store.sign:
      return {
        store: urls.getStore,
        operation: urls.getOperation,
        district: urls.getDistrict
      }

    case types.class.sign:
      return {
        tree: urls.getClass,
        list: urls.getClassLevel
      }

    case types.district.sign:
      return urls.getDistrict

    case types.group.sign:
      return urls.getStoreGroup

    case types.operation.sign:
      return urls.getOperation

    case types.supplier.sign:
      return urls.getSupplier
  }
}

/**
 * 构建指定类型的模态框promise
 * @param url 请求地址
 * @returns {*}
 */
export function buildPromise(url) {
  function fetch(url) {
    return payload => {
      const axios = Vue.prototype.$nuxt.$axios
      return axios.post(url, payload)
    }
  }

  if (url instanceof Object) {
    _.forIn(url, (val, key) => {
      url[key] = fetch(val)
    })
    return url
  } else {
    return fetch(url)
  }
}

/**
 * 构建表单校验对象
 * @param validator
 * @returns {*}
 */
export function buildValidator(validator) {
  _.forIn(validator, (val, key) => {
    val.code = key
    val.rule = [key, { ...getRules(val.rule) }]
  })

  return validator
}

/**
 * 获取表单校验规则
 * @param rule
 * @returns {{rules: *}}
 */
export function getRules(rule) {
  const rules = rule.map(s => {
    return {
      [s[0]]: true,
      message: s[1]
    }
  })

  return { rules }
}

/**
 * 封装表格加载的逻辑
 * @param promise
 */
export async function tableWithLoading(promise) {
  const store = Vue.prototype.$nuxt.$store

  store.commit(CHANGE_TABLE_LOADING, true)
  const { data } = await promise()
  store.commit(CHANGE_TABLE_LOADING)

  return data || {}
}
