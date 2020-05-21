const baseUrl = 'https://kszx.council.com.cn'
// const baseUrl2 = 'http://39.97.231.232:8805' // 测试
const baseUrl2 = 'https://api.sczxpm.com/api' // 生产
const url = {
  getAuction: `${baseUrl}/home/getPaipinDetailById`,
  getAuctionInfo: `${baseUrl}/auction/getPaipinById`,
  getRecommend: `${baseUrl}/goods/similar`,
  getZhuanChangDetail: `${baseUrl}/home/getZhuanChangDetail`,
  getGoods: `${baseUrl}/place/goods`,
  getGoodsDetail: `https://api.sczxpm.com/api/product/findProduct`,
  guessLike: 'https://api.sczxpm.com/api/index/queryAnalogous',
  getPaipinhui: 'https://api.sczxpm.com/api/auction/getAuction',
  getRotation: `${baseUrl2}/megaEvents/getRotation`,
  getModule: `${baseUrl2}/megaEvents/getModule`,
  getCategory: `${baseUrl2}/megaEvents/getCategory`,
  getTodayAuction: `${baseUrl2}/megaEvents/getAuction`,
  getPageMessage: `${baseUrl2}/megaEvents/getPageMessage`,
  getAuctionCatalogue: `${baseUrl2}/megaEvents/getAuctionCatalogue`,
  ticketActivityIndex: `${baseUrl2}/ticketActivity/ticketActivityIndex`,
  receiveTicket: `${baseUrl2}/ticketActivity/receiveTicket`,
  attendShareActivity: `${baseUrl2}/ticketActivity/attendShareActivity`,
  inviteNow: `${baseUrl2}/ticketActivity/inviteNow`,
  queryRecAuction: `${baseUrl2}/index/queryRecAuction`,
  shareBillImage: `${baseUrl2}/ticketActivity/shareBillImage`,
  getSubjectTicket: `${baseUrl2}/ticketActivity/getSubjectTicket`,
  receiveSubjectTicket: `${baseUrl2}/ticketActivity/receiveSubjectTicket`
}

export { url }