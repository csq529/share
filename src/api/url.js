const baseUrl = 'https://kszx.council.com.cn'
const url = {
  getAuction: `${baseUrl}/home/getPaipinDetailById`,
  getAuctionInfo: `${baseUrl}/auction/getPaipinById`,
  getRecommend: `${baseUrl}/goods/similar`,
  getZhuanChangDetail: `${baseUrl}/home/getZhuanChangDetail`,
  getGoods: `${baseUrl}/place/goods`,
  getGoodsDetail: `https://api.sczxpm.com/api/product/findProduct`,
  guessLike: 'https://api.sczxpm.com/api/index/queryAnalogous',
  getPaipinhui: 'https://api.sczxpm.com/api/auction/getAuction'
}

export { url }