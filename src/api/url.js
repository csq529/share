const baseUrl = 'https://kszx.council.com.cn'
const url = {
  getAuction: `${baseUrl}/home/getPaipinDetailById`,
  getAuctionInfo: `${baseUrl}/auction/getPaipinById`,
  getRecommend: `${baseUrl}/goods/similar`,
  getZhuanChangDetail: `${baseUrl}/home/getZhuanChangDetail`,
  getGoods: `${baseUrl}/place/goods`,
  getGoodsDetail: `https://api.sczxpm.com/api/product/findProduct`,
  guessLike: 'https://api.sczxpm.com/api/index/queryAnalogous',
  getPaipinhui: 'http://39.97.231.232:8805/auction/getAuction'
}

export { url }