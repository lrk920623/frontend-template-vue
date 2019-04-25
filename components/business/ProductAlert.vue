<script>
export default {
  name: 'VoProductAlert',
  render(h) {
    const message =
      '此商品列表已根据淘汰单的品类条件过滤，如果所添加的商品不在此列表，请重新创建新的淘汰单。一个单据内只允许申请同一品类组商品'
    return <a-alert message={message} type="info" show-icon />
  }
}
</script>
