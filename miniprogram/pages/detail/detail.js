
// pages/detail/detail.js
Page({
	data: {
		goodsId:null,
		goodsItems:null,

		goodsNumber: 99,
    mask: true,
    cartBox: true,
    danguige: true,
    duoguige: false,
	
		guigelist: [
      {
        id: 1,
        guige: '一'
      },
      {
        id: 2,
        guige: '二'
      },
      {
        id: 1,
        guige: '三'
      }
    ]

	},
	onLoad: async function (options) {
		this.setData({
			goodsId:options.id,
		})
		let items = await this.getItems()
		console.log(items)
		this.setData({
			goodsItems:items.data[0]
		})
		console.log(this.data.goodsItems)
		
	},
	getItems() {
		return new Promise((resolve,reject) =>{
			const db = wx.cloud.database()
			db.collection('goodsItems').where({
				goodsId:this.data.goodsId
			}).get().then( (res) =>{ 
				resolve(res)
			})
		})	
	},
	postGoodsId(){
		wx.showToast({
		  title: '加购成功',
		  icon:'success',
		  duration:1500,
		  mask:true
		})
		wx.setStorageSync('goodsId', this.data.goodsId)
	},

	showCart() {
		this.setData({
			cartBox: !this.data.cartBox, 
			mask: !this.data.mask, 
		});
	},
	
	hideAllBox() {
		this.setData({
			mask: true,
			paramsBox: true,
			cartBox: true,
			choice: true,
		})
	}

})



