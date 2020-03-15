const baseUrl = 'https://kszx.council.com.cn'
const url = {
  getAuction: `${baseUrl}/home/getPaipinDetailById`,
  getAuctionInfo: `${baseUrl}/auction/getPaipinById`,
  getRecommend: `${baseUrl}/goods/similar`,
  getZhuanChangDetail: `${baseUrl}/home/getZhuanChangDetail`,
  getGoods: `${baseUrl}/place/goods`,
  getGoodsDetail: `http://39.97.231.232:8805/product/findProduct`
}

export { url }