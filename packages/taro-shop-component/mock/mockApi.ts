import mock from 'mockjs'

export default {
  'GET /api/goods': (req, res) => {
    // const { pageNum = 1, goodName } = req.query
    res.send({
      code: 0,
      data: {
        total: 35,
        list: Array.from({ length: 10 }).map((_it, index) => {
          return {
            id: 1 + index,
            goodsName: '科学海盗螺丝钉儿童小实验套装stem玩具幼儿园小学生手工diy礼物',
            goodsNo: 'GS' + 11576621134200093 + index,
            coverImg: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg',
            price: 178 + index,
            marketPrice: 178 + index
          }
        })
      }
    })
  },
  'GET /api/good': (req, res) => {
    // const { pageNum = 1, goodName } = req.query
    res.send({
      code: 0,
      data: {
        id: 1,
        goodsName: '科学海盗螺丝钉儿童小实验套装stem玩具幼儿园小学生手工diy礼物',
        goodsNo: 'GS' + 11576621134200093,
        coverImgs: [
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/6eeb875b-c7ed-96e8-ae5c-0d9e51f5108b.jpg',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/916cad19-2ff7-5b69-eed3-56f9a59a095f.png',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/c3d08c9f-d703-4fdd-3a21-2f373174bff3.jpg',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/cfbb3f7b-50a1-e028-d499-eae8822830e9.jpg',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/7d30fdf3-72d5-20a4-2e45-c2740baf08e7.jpg',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg',
          'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/a4462a2c-7241-8ba5-fb1e-c5a7265d34ba.jpg'
        ],
        price: 178,
        marketPrice: 178,
        content:
          '<p><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/60fb4b98-a6d6-4584-81ea-e69e7e1280d3.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/de8dbce2-64b3-f62e-76be-fb0f47b86050.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/6d5b7130-8d93-2a01-e036-f847715e3e48.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/1415fc5d-5706-0d5b-66b0-598be8da7e42.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/21053222-19ae-489c-c3ce-7081d1f77a23.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/40f33abd-677d-e317-67c2-efa29164895f.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/4606f991-a022-4933-bcf1-df3b34d91a1b.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/514d9d1c-7ec2-9650-3f88-3ed09e963101.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/33e31822-d3a4-7f9d-e33b-eda9b82ca0ac.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/2af7eb5b-bcc6-3993-7e0e-a0270cc9efe0.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/d9f97732-539b-a361-056c-93bdda67e671.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/9364e80f-2785-0f49-a8eb-5803e1e8b30e.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/168b350c-2688-b77d-187f-86b23a537db9.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/a4ea69bd-fb5d-306a-cf1f-cf3c9207e8d4.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/94a7a3c8-2a81-43b1-6dfe-cc14374c6991.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/1c070443-68a3-63ee-b6b4-11606b8d31ac.jpg" style="max-width:100%;" contenteditable="false"/><img src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/da49a5ae-c9af-9600-8477-9cd3d002ab00.jpg" style="max-width:100%;" contenteditable="false"/></p>'
      }
    })
  },
  'GET /api/shopCarts': (req, res) => {
    // const { pageNum = 1, goodName } = req.query
    res.send(
      mock.mock({
        code: 0,
        data: {
          total: 35,
          list: Array.from({ length: 10 }).map((_it, index) => {
            return {
              id: 1 + index,
              goodsName: '科学海盗螺丝钉儿童小实验套装stem玩具幼儿园小学生手工diy礼物',
              goodsNo: 'GS' + 11576621134200093 + index,
              coverImg: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg',
              price: 178 + index,
              marketPrice: 178 + index,
              'status|1': [0, 1]
            }
          })
        }
      })
    )
  },
  'GET /api/address/list': (req, res) => {
    const { pageNum = 1 } = req.query

    // console.log(req.query)
    res.send(
      mock.mock({
        code: 0,
        content: {
          total: 35,
          isLastPage: pageNum * 10 > 35,
          list: Array.from({ length: 10 }).map((_it, index) => {
            return {
              id: 1 + index,
              name: '@cname',
              mobile: '@integer(13000000000, 13999999999)'
            }
          })
        }
      })
    )
  }
}
