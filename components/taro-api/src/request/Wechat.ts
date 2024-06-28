/* eslint-disable object-shorthand */
/* eslint-disable max-lines */
/* eslint-disable id-length */

import { ITaroRequestConfig } from "@wmeimob/request/src/types/taro-type";
import {
  ActivityOrderCreateInputDto,
  AddCommentsDTO,
  AuthMobileInputDto,
  BalanceRechargeInputDto,
  BindingMobileDto,
  CalculateOrderContext,
  CharSequence2,
  CollectionCreateInputDto,
  CouponCodeBindInputDto,
  GoodsQuery,
  GoodsQueryByNo,
  JsonResultActivityOrderOutputDto,
  JsonResultAuthMobileOutputDto,
  JsonResultBalanceGetOutputDto,
  JsonResultBigdecimal,
  JsonResultBoolean,
  JsonResultCouponAvailableGoodsOutputDto,
  JsonResultDetailResultActivityOutputDto,
  JsonResultDetailResultCheckWhiteOutputDto,
  JsonResultExpressTrackRespDto,
  JsonResultGoodsSkuStockAndPriceVo,
  JsonResultGoodsVO,
  JsonResultInt,
  JsonResultListActivityCityOutputDto,
  JsonResultListActivityClassifyOutputDto,
  JsonResultListActivityOrderOutputDto,
  JsonResultListActivityOutputDto,
  JsonResultListBannerPositionOutputDto,
  JsonResultListConfConfigOutputDto,
  JsonResultListCouponTemplateVo,
  JsonResultListHotKeywordDto,
  JsonResultListInt,
  JsonResultListLive,
  JsonResultListMallExpressCompanyVo,
  JsonResultListPopupAdsDto,
  JsonResultListPublicKeyValueDto,
  JsonResultListRechargeAmount,
  JsonResultListRefundReasonOutputDto,
  JsonResultListShopCartVO,
  JsonResultListString,
  JsonResultListTreeLong,
  JsonResultLive,
  JsonResultLivePage,
  JsonResultLong,
  JsonResultMallConfPageSimpleOutputDto,
  JsonResultMapString,
  JsonResultMapStringListPublicKeyValueDto,
  JsonResultMapStringObject,
  JsonResultMapStringString,
  JsonResultMarketingActivityDto,
  JsonResultMemberOutputDto,
  JsonResultMemCardDto,
  JsonResultMemCardRelationDto,
  JsonResultMemStatisticsDto,
  JsonResultNewcomerGiftOutputDto,
  JsonResultOrderCalculateResponse,
  JsonResultOrderCountVO,
  JsonResultOrderPayDTO,
  JsonResultOrderVO,
  JsonResultPagedResultActivityOutputDto,
  JsonResultPagedScrollResultBalanceFlowOutputDto,
  JsonResultPagedScrollResultCollectionVo,
  JsonResultPagedScrollResultCommentsVO,
  JsonResultPagedScrollResultCouponTemplateVo,
  JsonResultPagedScrollResultGoodsVO,
  JsonResultPagedScrollResultMallConfUserTaskDTO,
  JsonResultPagedScrollResultMarketingActivityDto,
  JsonResultPagedScrollResultMarketingActivityGoodsVo,
  JsonResultPagedScrollResultMarketingActivityWebResultVo,
  JsonResultPagedScrollResultMemCardDto,
  JsonResultPagedScrollResultMemCouponVo,
  JsonResultPagedScrollResultOrderVO,
  JsonResultPagedScrollResultRefundMasterDto,
  JsonResultPagedScrollResultScoreFlowOutputDto,
  JsonResultPagedScrollResultUserAddressOutPutDto,
  JsonResultPageInfoFollowGroupVO,
  JsonResultPageInfoFollowUserVO,
  JsonResultPageInfoPostsDetailVO,
  JsonResultRefundMasterDto,
  JsonResultScoreGetOutputDto,
  JsonResultSigninDetailOutputDto,
  JsonResultSigninInfoOutputDto,
  JsonResultSigninSimpleOutputDto,
  JsonResultString,
  JsonResultUserAddressOutPutDto,
  JsonResultUserStatisticsDTO,
  JsonResultVoid,
  MallConfUserTaskBatchPerformDTO,
  MallConfUserTaskPerformDTO,
  MemberModifyDto,
  MemberModifyInputDto,
  MemCardPurchaseDto,
  MemCouponReceiveInputDto,
  OrderCommentInputDto,
  PayNotifyUsingPOSTXmldata,
  RefundOrderParam,
  RefundShippingParam,
  ShopCartCreateInputDto,
  ShopCartDeleteInputDto,
  ShopCartModifyInputDto,
  UnlimitedInputDto,
  UserAddressCreateInputDto,
  UserAddressModifyInputDto,
  UserAgreementAgreeDto,
  UserFollowDTO,
  WechatActivityAllGetParams,
  WechatActivityFlashSaleGetParams,
  WechatActivityGetParams,
  WechatActivityGoodsGetParams,
  WechatActivityPreSaleGetParams,
  WechatApiQrCodeGenerateUrlLinkPostParams,
  WechatApiSmsSendCodeGetParams,
  WechatAuthTokenGetParams,
  WechatBannerQueryListGetParams,
  WechatCollectionGetParams,
  WechatGoodsClassifyGetParams,
  WechatGoodsCommentsNoGetParams,
  WechatGoodsDetailsNoGetParams,
  WechatLiveGetParams,
  WechatMallAddressQueryListGetParams,
  WechatMallBalanceQueryGetParams,
  WechatMallConfigQueryByKeyGetParams,
  WechatMallConfigQueryByMultipleKeyGetParams,
  WechatMallMemberCardGetParams,
  WechatMallMemberCardNotHaveListGetParams,
  WechatMallScoreQueryGetParams,
  WechatMallSigninPutParams,
  WechatMallSigninSwitchGetParams,
  WechatMallUserTaskConfigGetParams,
  WechatMyEventListGetParams,
  WechatMyReservationListGetParams,
  WechatOrdersCommentListGetParams,
  WechatOrdersExpressGetParams,
  WechatOrdersGetParams,
  WechatOrdersPayOrderNoGetParams,
  WechatRichtextGetParams,
  WechatSocialUserFollowGroupGetParams,
  WechatSocialUserFollowUserGetParams,
  WechatSocialUserGetUserFollowGetParams,
  WechatSocialUserHistoryGetParams,
  WechatSocialUserStatisticsGetParams,
  WechatWebMemberDecodeUserInfoGetParams,
  WechatWebMemberExistsUnionIdGetParams,
  WechatWebMemCouponGetAvailableCouponGetParams,
  WechatWebMemCouponMyGetParams,
  WechatWebMemCouponMyHistoryGetParams,
  WechatWebMemCouponReceiveGetParams,
  WechatWebRefundDeleteGetParams,
  WechatWebRefundGetParams,
  WechatWebRefundInfoGetParams,
  WechatWebRefundRefundableFreightAmountGetParams
} from "./data-contracts";
import requestInstance from "./instance";

type RequestConfig = Omit<ITaroRequestConfig, "url" | "method">;

export const API = {
  /**
   * No description
   * @name POST /wechat/web/member/register
   * @summary 注册
   * @tags web/注册
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/register_PUT": (body: MemberModifyDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/member/register`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /wechat/mall/banner/queryList
   * @summary 根据显示位置查询 banner 列表
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/banner/queryList_GET": (params: WechatBannerQueryListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/banner/queryList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListBannerPositionOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/activityAll
   * @summary 查询所有活动接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/activityAll_GET": (params: WechatActivityAllGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/activityAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListActivityOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/activityList
   * @summary 查询活动分页接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/activityList_GET": (params: WechatActivityAllGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/activityList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultPagedResultActivityOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/myBookRecord
   * @summary 查询我的预约活动接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/myBookRecord_GET": (params: WechatMyEventListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/myBookRecord`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListActivityOrderOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/myCheckRecord
   * @summary 查询我的核销记录接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/myCheckRecord_GET": (params: {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/myCheckRecord`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListActivityOrderOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/bookRecordDetail/{orderNo}
   * @summary 查询我的预约活动详情接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/bookRecordDetail/{orderNo}_GET": (params: WechatMyReservationListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/bookRecordDetail/${params.orderNo}`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultActivityOrderOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/bookRecordDetail/check/{verifyCode}
   * @summary 查询我的预约活动详情接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/bookRecordDetail/check/{verifyCode}_GET": (params: WechatMyReservationListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/bookRecordDetail/check/${params.verifyCode}`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultActivityOrderOutputDto>,
  /**
   * No description
   * @name POST /wechat/activity/check/{verifyCode}
   * @summary 核销码核销接口
   * @tags web/核销码核销
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/check/{verifyCode}_POST": (params: WechatMyReservationListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/check/${params.verifyCode}`,
      method: "POST",
      data: params,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name POST /wechat/activity/check/{orderNo}
   * @summary 核销码核销接口
   * @tags web/核销码核销
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/userCheck/{orderNo}_POST": (params: WechatMyReservationListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/userCheck/${params.orderNo}`,
      method: "POST",
      data: params,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /wechat/activity/cityList
   * @summary 查询城市列表接口
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/cityList_GET": (params: {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/cityList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListActivityCityOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/classList
   * @summary 查询所有活动分类
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/classList_GET": (params: {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/classList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListActivityClassifyOutputDto>,
  /**
   * No description
   * @name GET /wechat/activity/detail/{id}
   * @summary 查询活动详情
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/detail/{id}_GET": (params: WechatActivityAllGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/detail/${params.id}`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultDetailResultActivityOutputDto>,
  /**
   * No description
   * @name POST /wechat/activity/checkWhite/{activityId}
   * @summary 报名校验
   * @tags web/报名活动
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/checkWhite/{activityId}_GET": (params, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/checkWhite/${params.activityId}`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultDetailResultCheckWhiteOutputDto>,
  /**
   * No description
   * @name POST /wechat/activity/book
   * @summary 报名
   * @tags web/报名活动
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/book_POST": (body: ActivityOrderCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/book`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name POST /wechat/activity/cancelBook/{orderNo}
   * @summary 报名
   * @tags web/报名活动
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/cancelBook/{orderNo}_POST": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/cancelBook/${orderNo}`,
      method: "POST",
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /wechat/activity/getAddress
   * @summary 云存储信息
   * @tags web/云存储
   * @response `200` `JsonResultMapStringObject` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/getAddress_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/getAddress`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapString>,
  /**
   * No description
   * @name GET /wechat/api/oss/info
   * @summary 云存储信息
   * @tags web/云存储
   * @response `200` `JsonResultMapStringObject` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/oss/info_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/oss/info`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapStringObject>,
  /**
   * No description
   * @name GET /wechat/collection
   * @summary 商品收藏分页查询
   * @tags web/商品收藏
   * @response `200` `JsonResultPagedScrollResultCollectionVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/collection_GET": (query: WechatCollectionGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/collection`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultCollectionVo>,
  /**
   * No description
   * @name DELETE /wechat/collection
   * @summary 删除收藏
   * @tags web/商品收藏
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/wechat/collection_DELETE": (body: CollectionCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/collection`,
      method: "DELETE",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/collection
   * @summary 添加收藏
   * @tags web/商品收藏
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/collection_POST": (body: CollectionCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/collection`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * @description 活动详情
   * @name GET /wechat/activity/{activityNo}
   * @summary 活动详情
   * @tags web/活动相关接口
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name GET /wechat/goods/classify
   * @summary 商品分类
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultListTreeLong` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/classify_GET": (query: WechatGoodsClassifyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/classify`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListTreeLong>,
  /**
   * No description
   * @name GET /wechat/api/sms/sendCode
   * @summary 发送短信验证码
   * @tags web/短信服务
   * @response `200` `JsonResultVoid` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/sms/sendCode_GET": (query: WechatApiSmsSendCodeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/sms/sendCode`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/activity/goods
   * @summary 活动商品列表
   * @tags web/活动相关接口
   * @response `200` `JsonResultPagedScrollResultMarketingActivityGoodsVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/goods_GET": (query: WechatActivityGoodsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/goods`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMarketingActivityGoodsVo>,
  /**
   * No description
   * @name GET /wechat/goods/comments/total/{no}
   * @summary 商品评价总数量
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultInt` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/comments/total/{no}_GET": (no: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/comments/total/${no}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultInt>,
  /**
   * No description
   * @name GET /wechat/goods/details/{no}
   * @summary 商品详情
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultGoodsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/details/{no}_GET": ({ no, ...query }: WechatGoodsDetailsNoGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/details/${no}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultGoodsVO>,
  /**
   * No description
   * @name GET /wechat/goods/comments/{no}
   * @summary 商品评价列表
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultPagedScrollResultCommentsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/comments/{no}_GET": ({ no, ...query }: WechatGoodsCommentsNoGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/comments/${no}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultCommentsVO>,
  /**
   * No description
   * @name GET /wechat/goods/classifyExists/{id}
   * @summary 商品分类是否存在
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultBoolean` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/classifyExists/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/classifyExists/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultBoolean>,
  /**
   * No description
   * @name POST /wechat/goods
   * @summary 商品列表
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultPagedScrollResultGoodsVO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods_POST": (body: GoodsQuery, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultGoodsVO>,
  /**
   * No description
   * @name GET /wechat/goods/skuStockAndPrice/{skuNo}
   * @summary SKU库存和价格
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultGoodsSkuStockAndPriceVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/skuStockAndPrice/{skuNo}_GET": (skuNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/skuStockAndPrice/${skuNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultGoodsSkuStockAndPriceVo>,
  /**
   * No description
   * @name POST /wechat/goods/listByNos
   * @summary 根据No列表查询商品列表
   * @tags web/移动端商品相关接口
   * @response `200` `JsonResultPagedScrollResultGoodsVO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/goods/listByNos_POST": (body: GoodsQueryByNo, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/goods/listByNos`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultGoodsVO>,
  /**
   * No description
   * @name GET /wechat/collection/exists/{no}
   * @summary 是否已收藏
   * @tags web/商品收藏
   * @response `200` `JsonResultBoolean` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/collection/exists/{no}_GET": (no: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/collection/exists/${no}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultBoolean>,
  /**
   * No description
   * @name POST /wechat/collection/list
   * @summary 批量添加
   * @tags web/商品收藏
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/collection/list_POST": (body: CollectionCreateInputDto[], options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/collection/list`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/api/qrCode/getUnlimited
   * @summary 获取小程序码 - getUnlimited
   * @tags web/小程序码
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/qrCode/getUnlimited_POST": (body: UnlimitedInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/qrCode/getUnlimited`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/mall/address/getDefault
   * @summary 获取当前用户默认地址
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultUserAddressOutPutDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/address/getDefault_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/getDefault`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultUserAddressOutPutDto>,
  /**
   * No description
   * @name DELETE /wechat/mall/address/delete/{id}
   * @summary 删除地址
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/wechat/mall/address/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 退出
   * @name POST /wechat/logout
   * @summary 退出
   * @tags web/退出
   * @response `200` `CharSequence2` OK
   */
  "/wechat/logout_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/logout`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name POST /wechat/mall/address/create
   * @summary 创建地址
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/address/create_POST": (body: UserAddressCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/create`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /wechat/mall/address/queryList
   * @summary 获取地址列表
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultPagedScrollResultUserAddressOutPutDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/address/queryList_GET": (query: WechatMallAddressQueryListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultUserAddressOutPutDto>,
  /**
   * No description
   * @name POST /wechat/mall/address/update
   * @summary 更新地址信息
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/address/update_POST": (body: UserAddressModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/update`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /wechat/mall/address/setDefault/{id}
   * @summary 设置默认地址
   * @tags web/收货地址操作接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/address/setDefault/{id}_PUT": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/address/setDefault/${id}`,
      method: "PUT",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/mall/logisticsCompany/expressCompanyAll
   * @summary 查询全部快递公司与编号
   * @tags web/物流公司
   * @response `200` `JsonResultListMallExpressCompanyVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/logisticsCompany/expressCompanyAll_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/mall/logisticsCompany/expressCompanyAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListMallExpressCompanyVo>,
  /**
   * No description
   * @name GET /wechat/mall/page/get/{id}
   * @summary 获取自定义页面内容
   * @tags web/自定义页面
   * @response `200` `JsonResultMallConfPageSimpleOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/page/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/page/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMallConfPageSimpleOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/refundReason/queryAll
   * @summary 售后原因不分页查询
   * @tags web/售后原因
   * @response `200` `JsonResultListRefundReasonOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/refundReason/queryAll_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/refundReason/queryAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListRefundReasonOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/banner/queryList/{position}
   * @summary 根据显示位置查询 banner 列表
   * @tags web/Banner相关接口
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/banner/queryList/{position}_GET": (position: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/banner/queryList/${position}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListBannerPositionOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/shopCart
   * @summary 用户购物车列表
   * @tags web/购物车
   * @response `200` `JsonResultListShopCartVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/shopCart_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/shopCart`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListShopCartVO>,
  /**
   * No description
   * @name POST /wechat/mall/shopCart
   * @summary 添加购物车
   * @tags web/购物车
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/shopCart_POST": (body: ShopCartCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/shopCart`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /wechat/mall/shopCart
   * @summary 变更商品
   * @tags web/购物车
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/shopCart_PUT": (body: ShopCartModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/shopCart`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /wechat/mall/shopCart
   * @summary 删除商品
   * @tags web/购物车
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/wechat/mall/shopCart_DELETE": (body: ShopCartDeleteInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/shopCart`,
      method: "DELETE",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/orders
   * @summary 获取订单列表
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultPagedScrollResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders_GET": (query: WechatOrdersGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultOrderVO>,
  /**
   * No description
   * @name POST /wechat/orders
   * @summary 提交订单
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultOrderPayDTO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders_POST": (body: CalculateOrderContext, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/mall/shopCart/count
   * @summary 购物车商品数量
   * @tags web/购物车
   * @response `200` `JsonResultInt` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/shopCart/count_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/shopCart/count`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultInt>,
  /**
   * No description
   * @name POST /wechat/orders/addComment
   * @summary 追评
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/addComment_POST": (body: AddCommentsDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/addComment`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/orders/calculate
   * @summary 计算订单
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultOrderCalculateResponse` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/calculate_POST": (body: CalculateOrderContext, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/calculate`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderCalculateResponse>,
  /**
   * No description
   * @name GET /wechat/orders/comment/list
   * @summary 评价列表
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultPagedScrollResultCommentsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/comment/list_GET": (query: WechatOrdersCommentListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/comment/list`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultCommentsVO>,
  /**
   * No description
   * @name DELETE /wechat/orders/comment/{id}
   * @summary 删除评价
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/wechat/orders/comment/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/comment/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/orders/comment
   * @summary 评价订单
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/comment_POST": (body: OrderCommentInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/comment`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/orders/cancel/{orderNo}
   * @summary 取消订单
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/cancel/{orderNo}_POST": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/cancel/${orderNo}`,
      method: "POST",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/orders/confirm/{orderNo}
   * @summary 确认收货
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/confirm/{orderNo}_POST": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/confirm/${orderNo}`,
      method: "POST",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/orders/count
   * @summary 获取订单角标数量
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultOrderCountVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/count_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/count`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultOrderCountVO>,
  /**
   * No description
   * @name DELETE /wechat/orders/{orderNo}
   * @summary 删除订单
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/wechat/orders/{orderNo}_DELETE": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/${orderNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/orders/{orderNo}
   * @summary 获取订单详情
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/{orderNo}_GET": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/${orderNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultOrderVO>,
  /**
   * No description
   * @name GET /wechat/orders/pay/{orderNo}
   * @summary 待支付订单获取支付参数
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultOrderPayDTO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/pay/{orderNo}_GET": (
    { orderNo, ...query }: WechatOrdersPayOrderNoGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/orders/pay/${orderNo}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/orders/express
   * @summary 查看物流
   * @tags web/移动端订单相关接口
   * @response `200` `JsonResultExpressTrackRespDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/express_GET": (query: WechatOrdersExpressGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/express`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultExpressTrackRespDto>,
  /**
   * No description
   * @name GET /wechat/richtext
   * @summary 获取富文本内容
   * @tags web/富文本接口
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/richtext_GET": (query: WechatRichtextGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/richtext`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/web/memCoupon/getAvailableCoupon
   * @summary 小程序-可领取优惠券查询
   * @tags web/用户优惠劵
   * @response `200` `JsonResultPagedScrollResultCouponTemplateVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/getAvailableCoupon_GET": (
    query: WechatWebMemCouponGetAvailableCouponGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/web/memCoupon/getAvailableCoupon`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultCouponTemplateVo>,
  /**
   * No description
   * @name POST /wechat/web/memCoupon/getAvailableCouponByTemplateNos
   * @summary 小程序首页-根据编号查询可领取优惠券
   * @tags web/用户优惠劵
   * @response `200` `JsonResultListCouponTemplateVo` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/getAvailableCouponByTemplateNos_POST": (body: string[], options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/getAvailableCouponByTemplateNos`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultListCouponTemplateVo>,
  /**
   * No description
   * @name GET /wechat/web/memCoupon/my
   * @summary 小程序-我的优惠劵列表（分页）
   * @tags web/用户优惠劵
   * @response `200` `JsonResultPagedScrollResultMemCouponVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/my_GET": (query: WechatWebMemCouponMyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/my`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMemCouponVo>,
  /**
   * No description
   * @name GET /wechat/web/memCoupon/goods/{no}
   * @summary 获取礼券可用商品编号列表
   * @tags web/用户优惠劵
   * @response `200` `JsonResultCouponAvailableGoodsOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/goods/{no}_GET": (no: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/goods/${no}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultCouponAvailableGoodsOutputDto>,
  /**
   * No description
   * @name GET /wechat/web/memCoupon/myHistory
   * @summary 小程序-我的历史优惠劵列表（分页）
   * @tags web/用户优惠劵
   * @response `200` `JsonResultPagedScrollResultMemCouponVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/myHistory_GET": (query: WechatWebMemCouponMyHistoryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/myHistory`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMemCouponVo>,
  /**
   * No description
   * @name GET /wechat/web/memCoupon/receive
   * @summary 小程序-领取优惠劵
   * @tags web/用户优惠劵
   * @response `200` `JsonResultVoid` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/receive_GET": (query: WechatWebMemCouponReceiveGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/receive`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/web/memCoupon/receiveGoodsAuto
   * @summary 小程序-自动领取优惠券
   * @tags web/用户优惠劵
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/receiveGoodsAuto_POST": (body: MemCouponReceiveInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/receiveGoodsAuto`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/web/memCoupon/receiveGoodsCoupon
   * @summary 小程序-商品可领优惠券查询
   * @tags web/用户优惠劵
   * @response `200` `JsonResultListCouponTemplateVo` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/memCoupon/receiveGoodsCoupon_POST": (body: MemCouponReceiveInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/memCoupon/receiveGoodsCoupon`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultListCouponTemplateVo>,
  /**
   * No description
   * @name POST /wechat/web/refund/save
   * @summary 申请售后
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/save_POST": (body: RefundOrderParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund/save`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/web/refund
   * @summary 会员售后订单分页查询
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultPagedScrollResultRefundMasterDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund_GET": (query: WechatWebRefundGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultRefundMasterDto>,
  /**
   * No description
   * @name GET /wechat/web/refund/delete
   * @summary 售后单删除
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultInt` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/delete_GET": (query: WechatWebRefundDeleteGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund/delete`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultInt>,
  /**
   * No description
   * @name POST /wechat/web/refund/allsave
   * @summary 整单申请售后
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/allsave_POST": (body: RefundOrderParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund/allsave`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/web/refund/info
   * @summary 售后单信息
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultRefundMasterDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/info_GET": (query: WechatWebRefundInfoGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund/info`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultRefundMasterDto>,
  /**
   * No description
   * @name POST /wechat/wepay/refund-notify
   * @summary refundNotify
   * @tags web/微信支付回调
   * @response `200` `PayNotifyUsingPOSTXmldata` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/wepay/refund-notify_POST": (body: PayNotifyUsingPOSTXmldata, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/wepay/refund-notify`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<PayNotifyUsingPOSTXmldata>,
  /**
   * No description
   * @name POST /wechat/wepay/notify
   * @summary payNotify
   * @tags web/微信支付回调
   * @response `200` `PayNotifyUsingPOSTXmldata` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/wepay/notify_POST": (body: PayNotifyUsingPOSTXmldata, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/wepay/notify`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<PayNotifyUsingPOSTXmldata>,
  /**
   * No description
   * @name PUT /wechat/web/refund/shipping
   * @summary 退货物流填写
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/shipping_PUT": (body: RefundShippingParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/refund/shipping`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/mall/score/query
   * @summary 分页获取积分流水
   * @tags web/积分相关接口
   * @response `200` `JsonResultPagedScrollResultScoreFlowOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/score/query_GET": (query: WechatMallScoreQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/score/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultScoreFlowOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/score/get
   * @summary 获取积分汇总信息
   * @tags web/积分相关接口
   * @response `200` `JsonResultScoreGetOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/score/get_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/score/get`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultScoreGetOutputDto>,
  /**
   * No description
   * @name GET /wechat/web/member/decodeUserInfo
   * @summary 解析用户信息并保存（昵称、头像）
   * @tags web/会员-会员管理
   * @response `200` `JsonResultVoid` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/decodeUserInfo_GET": (
    query: WechatWebMemberDecodeUserInfoGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/web/member/decodeUserInfo`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/web/member/getUserInfo
   * @summary 获取用户信息
   * @tags web/会员-会员管理
   * @response `200` `JsonResultMemberOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/getUserInfo_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/member/getUserInfo`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMemberOutputDto>,
  /**
   * No description
   * @name PUT /wechat/web/member/saveUserInfo
   * @summary 保存用户信息（昵称、头像）
   * @tags web/会员-会员管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/saveUserInfo_PUT": (body: MemberModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/member/saveUserInfo`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /wechat/web/member/updateMobile
   * @summary 用户修改手机号
   * @tags web/会员-会员管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/updateMobile_PUT": (body: BindingMobileDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/member/updateMobile`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/web/member/presentNewcomerGift
   * @summary 新人赠礼
   * @tags web/会员-会员管理
   * @response `200` `JsonResultNewcomerGiftOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/presentNewcomerGift_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/web/member/presentNewcomerGift`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<JsonResultNewcomerGiftOutputDto>,
  /**
   * No description
   * @name GET /wechat/hotKeyword/hot
   * @summary 热词
   * @tags web/热词
   * @response `200` `JsonResultListHotKeywordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/hotKeyword/hot_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/hotKeyword/hot`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListHotKeywordDto>,
  /**
   * @description 活动分页查询
   * @name GET /wechat/activity
   * @summary 活动分页查询
   * @tags web/活动相关接口
   * @response `200` `JsonResultPagedScrollResultMarketingActivityWebResultVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity_GET": (query: WechatActivityGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMarketingActivityWebResultVo>,
  /**
   * No description
   * @name POST /wechat/activity
   * @summary 添加活动订阅
   * @tags web/活动相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 限时抢购分页查询
   * @name GET /wechat/activity/flashSale
   * @summary 限时抢购分页查询
   * @tags web/限时抢购管理
   * @response `200` `JsonResultPagedScrollResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/flashSale_GET": (query: WechatActivityFlashSaleGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/flashSale`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMarketingActivityDto>,
  /**
   * @description 限时抢购详情
   * @name GET /wechat/activity/flashSale/{activityNo}
   * @summary 限时抢购详情
   * @tags web/限时抢购管理
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/flashSale/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/flashSale/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name GET /wechat/mall/config/query
   * @summary 查询所有配置项
   * @tags web/系统配置（支付、提现、客服等）
   * @response `200` `JsonResultListConfConfigOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/config/query_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/config/query`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListConfConfigOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/config/queryByKey
   * @summary 根据key查询
   * @tags web/系统配置（支付、提现、客服等）
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/config/queryByKey_GET": (query: WechatMallConfigQueryByKeyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/config/queryByKey`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/popupAds
   * @summary 弹窗列表
   * @tags web/弹窗广告
   * @response `200` `JsonResultListPopupAdsDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/popupAds_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/popupAds`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListPopupAdsDto>,
  /**
   * No description
   * @name GET /wechat/mall/balance/query
   * @summary 分页获取余额流水
   * @tags web/余额相关接口
   * @response `200` `JsonResultPagedScrollResultBalanceFlowOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/query_GET": (query: WechatMallBalanceQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultBalanceFlowOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/balance/get
   * @summary 获取余额汇总信息
   * @tags web/余额相关接口
   * @response `200` `JsonResultBalanceGetOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/get_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/get`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultBalanceGetOutputDto>,
  /**
   * No description
   * @name POST /wechat/mall/balance/pay/{orderNo}
   * @summary 去支付
   * @tags web/余额相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/pay/{orderNo}_POST": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/pay/${orderNo}`,
      method: "POST",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /wechat/mall/balance/recharge
   * @summary 去充值
   * @tags web/余额相关接口
   * @response `200` `JsonResultOrderPayDTO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/recharge_POST": (body: BalanceRechargeInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/recharge`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/mall/balance/rechargeAmountList
   * @summary 获取充值列表
   * @tags web/余额相关接口
   * @response `200` `JsonResultListRechargeAmount` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/rechargeAmountList_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/rechargeAmountList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListRechargeAmount>,
  /**
   * No description
   * @name POST /wechat/wepay/rechargeNotify
   * @summary rechargeNotify
   * @tags web/微信支付回调
   * @response `200` `PayNotifyUsingPOSTXmldata` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/wepay/rechargeNotify_POST": (body: PayNotifyUsingPOSTXmldata, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/wepay/rechargeNotify`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<PayNotifyUsingPOSTXmldata>,
  /**
   * No description
   * @name GET /wechat/mall/config/queryByMultipleKey
   * @summary 根据keys查询，多个按逗号分割
   * @tags web/系统配置（支付、提现、客服等）
   * @response `200` `JsonResultMapStringString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/config/queryByMultipleKey_GET": (
    query: WechatMallConfigQueryByMultipleKeyGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/mall/config/queryByMultipleKey`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultMapStringString>,
  /**
   * No description
   * @name GET /wechat/mall/userTaskConfig
   * @summary 列表
   * @tags web/用户任务
   * @response `200` `JsonResultPagedScrollResultMallConfUserTaskDTO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/userTaskConfig_GET": (query: WechatMallUserTaskConfigGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/userTaskConfig`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMallConfUserTaskDTO>,
  /**
   * No description
   * @name PUT /wechat/mall/userTaskConfig/perform
   * @summary 执行
   * @tags web/用户任务
   * @response `200` `JsonResultBoolean` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/userTaskConfig/perform_PUT": (body: MallConfUserTaskPerformDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/userTaskConfig/perform`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultBoolean>,
  /**
   * No description
   * @name PUT /wechat/mall/userTaskConfig/performs
   * @summary 批量执行
   * @tags web/用户任务
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/userTaskConfig/performs_PUT": (body: MallConfUserTaskBatchPerformDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/userTaskConfig/performs`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/mall/memberCard/{id}
   * @summary 详情
   * @tags web/会员卡
   * @response `200` `JsonResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memberCard/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMemCardDto>,
  /**
   * No description
   * @name GET /wechat/mall/memberCard
   * @summary 列表
   * @tags web/会员卡
   * @response `200` `JsonResultPagedScrollResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard_GET": (query: WechatMallMemberCardGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memberCard`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMemCardDto>,
  /**
   * No description
   * @name GET /wechat/mall/memStatistics/info
   * @summary 统计项
   * @tags web/用户统计
   * @response `200` `JsonResultMemStatisticsDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memStatistics/info_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memStatistics/info`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMemStatisticsDto>,
  /**
   * No description
   * @name GET /wechat/mall/memberCard/{id}/relation
   * @summary 关联详情
   * @tags web/会员卡
   * @response `200` `JsonResultMemCardRelationDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard/{id}/relation_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memberCard/${id}/relation`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMemCardRelationDto>,
  /**
   * @description type 签到方式 1：自动签到 2：手动签到
   * @name PUT /wechat/mall/signin
   * @summary 签到
   * @tags web/签到
   * @response `200` `JsonResultSigninSimpleOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/signin_PUT": (query: WechatMallSigninPutParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/signin`,
      method: "PUT",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultSigninSimpleOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/signin/detail
   * @summary 获取签到详情
   * @tags web/签到
   * @response `200` `JsonResultSigninDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/signin/detail_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/signin/detail`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultSigninDetailOutputDto>,
  /**
   * @description 日期格式为 yyyy-MM
   * @name GET /wechat/mall/signin/switch
   * @summary 根据日期切换签到信息
   * @tags web/签到
   * @response `200` `JsonResultListString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/signin/switch_GET": (query: WechatMallSigninSwitchGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/signin/switch`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListString>,
  /**
   * No description
   * @name GET /wechat/mall/signin/info
   * @summary 获取签到信息
   * @tags web/签到
   * @response `200` `JsonResultSigninInfoOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/signin/info_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/signin/info`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultSigninInfoOutputDto>,
  /**
   * No description
   * @name GET /wechat/mall/memberCard/notHaveList
   * @summary 未持有列表
   * @tags web/会员卡
   * @response `200` `JsonResultPagedScrollResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard/notHaveList_GET": (
    query: WechatMallMemberCardNotHaveListGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/mall/memberCard/notHaveList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMemCardDto>,
  /**
   * No description
   * @name POST /wechat/mall/memberCard/purchase
   * @summary 购买
   * @tags web/会员卡
   * @response `200` `JsonResultOrderPayDTO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard/purchase_POST": (body: MemCardPurchaseDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memberCard/purchase`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/web/member/exists/unionId
   * @summary 判断是否存在 unionId
   * @tags web/会员-会员管理
   * @response `200` `JsonResultBoolean` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/member/exists/unionId_GET": (
    query: WechatWebMemberExistsUnionIdGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/web/member/exists/unionId`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultBoolean>,
  /**
   * No description
   * @name POST /wechat/wepay/purchaseMemberCardNotify
   * @summary purchaseMemberCardNotify
   * @tags web/微信支付回调
   * @response `200` `PayNotifyUsingPOSTXmldata` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/wepay/purchaseMemberCardNotify_POST": (body: PayNotifyUsingPOSTXmldata, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/wepay/purchaseMemberCardNotify`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<PayNotifyUsingPOSTXmldata>,
  /**
   * No description
   * @name PUT /wechat/mall/couponCode
   * @summary 优惠码绑定
   * @tags web/优惠码管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/couponCode_PUT": (body: CouponCodeBindInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/couponCode`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/activity/preSale
   * @summary 预售分页列表查询
   * @tags web/预售管理
   * @response `200` `JsonResultPagedScrollResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/preSale_GET": (query: WechatActivityPreSaleGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/preSale`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedScrollResultMarketingActivityDto>,
  /**
   * No description
   * @name GET /wechat/activity/preSale/{activityNo}
   * @summary 预售详情
   * @tags web/预售管理
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/activity/preSale/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/activity/preSale/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name GET /wechat/userAgreement/notAgreeAgreementTypeList
   * @summary 未同意的协议类型列表
   * @tags web/用户协议
   * @response `200` `JsonResultListInt` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/userAgreement/notAgreeAgreementTypeList_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/userAgreement/notAgreeAgreementTypeList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListInt>,
  /**
   * No description
   * @name PUT /wechat/userAgreement/userAgreeRecord/agree
   * @summary 同意协议
   * @tags web/用户协议
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/userAgreement/userAgreeRecord/agree_PUT": (body: UserAgreementAgreeDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/userAgreement/userAgreeRecord/agree`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/auth/token
   * @summary 授权token
   * @tags web/授权（登录、注册、修改密码、获取当前权限、忘记密码）
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/auth/token_GET": (query: WechatAuthTokenGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/auth/token`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /wechat/orders/pay/h5/{orderNo}
   * @summary H5待支付订单获取支付参数
   * @tags web/移动端订单相关接口
   * @deprecated
   * @response `200` `JsonResultOrderPayDTO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/orders/pay/h5/{orderNo}_GET": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/orders/pay/h5/${orderNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/web/refund/refundableFreightAmount
   * @summary 获得可退运费
   * @tags web/移动端售后相关接口
   * @response `200` `JsonResultBigdecimal` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/web/refund/refundableFreightAmount_GET": (
    query: WechatWebRefundRefundableFreightAmountGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/web/refund/refundableFreightAmount`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultBigdecimal>,
  /**
   * No description
   * @name GET /wechat/live
   * @summary 查询根据id集合
   * @tags web/直播
   * @response `200` `JsonResultListLive` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/live_GET": (query: WechatLiveGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/live`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListLive>,
  /**
   * No description
   * @name GET /wechat/live/{id}
   * @summary 查询根据id
   * @tags web/直播
   * @response `200` `JsonResultLive` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/live/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/live/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultLive>,
  /**
   * No description
   * @name GET /wechat/livePage/{id}
   * @summary 详情
   * @tags web/直播页面
   * @response `200` `JsonResultLivePage` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/livePage/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/livePage/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultLivePage>,
  /**
   * No description
   * @name GET /wechat/live/{id}/token
   * @summary 获取用户直播token
   * @tags web/直播
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/live/{id}/token_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/live/${id}/token`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name POST /wechat/mall/memberCard/h5/purchase
   * @summary H5 购买
   * @tags web/会员卡
   * @deprecated
   * @response `200` `JsonResultOrderPayDTO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/memberCard/h5/purchase_POST": (body: MemCardPurchaseDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/memberCard/h5/purchase`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name POST /wechat/api/qrCode/generateUrlLink
   * @summary 生成 url link
   * @tags web/小程序码
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/qrCode/generateUrlLink_POST": (
    query: WechatApiQrCodeGenerateUrlLinkPostParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/api/qrCode/generateUrlLink`,
      method: "POST",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name POST /wechat/mall/balance/h5/recharge
   * @summary H5去充值
   * @tags web/余额相关接口
   * @response `200` `JsonResultOrderPayDTO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/mall/balance/h5/recharge_POST": (body: BalanceRechargeInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/mall/balance/h5/recharge`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultOrderPayDTO>,
  /**
   * No description
   * @name GET /wechat/social/user/followGroup
   * @summary 我关注的圈子
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultPageInfoFollowGroupVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/followGroup_GET": (query: WechatSocialUserFollowGroupGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/followGroup`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPageInfoFollowGroupVO>,
  /**
   * No description
   * @name PUT /wechat/social/user/followGroup
   * @summary 圈子关注/取关
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/followGroup_PUT": (body: UserFollowDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/followGroup`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/social/user/followUser
   * @summary 我关注的用户
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultPageInfoFollowUserVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/followUser_GET": (query: WechatSocialUserFollowUserGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/followUser`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPageInfoFollowUserVO>,
  /**
   * No description
   * @name PUT /wechat/social/user/followUser
   * @summary 用户关注/取关
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/followUser_PUT": (body: UserFollowDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/followUser`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /wechat/social/user/getUserFollow
   * @summary 获得当前用户对指定用户的关注状态
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultBoolean` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/getUserFollow_GET": (
    query: WechatSocialUserGetUserFollowGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/wechat/social/user/getUserFollow`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultBoolean>,
  /**
   * No description
   * @name GET /wechat/social/user/history
   * @summary 查询用户浏览记录
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultPageInfoPostsDetailVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/history_GET": (query: WechatSocialUserHistoryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/history`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPageInfoPostsDetailVO>,
  /**
   * No description
   * @name GET /wechat/social/user/statistics
   * @summary 查询用户社交统计数据
   * @tags web/用户-用户信息相关接口
   * @response `200` `JsonResultUserStatisticsDTO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/social/user/statistics_GET": (query: WechatSocialUserStatisticsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/social/user/statistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultUserStatisticsDTO>,
  /**
   * No description
   * @name POST /wechat/auth/decodePhone
   * @summary 获取手机号
   * @tags web/授权（登录、注册、修改密码、获取当前权限、忘记密码）
   * @response `200` `JsonResultAuthMobileOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/auth/decodePhone_POST": (body: AuthMobileInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/auth/decodePhone`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultAuthMobileOutputDto>,
  /**
   * No description
   * @name GET /wechat/api/enum
   * @summary 获取所有枚举配置
   * @tags web/枚举
   * @response `200` `JsonResultMapStringListPublicKeyValueDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/enum_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/enum`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapStringListPublicKeyValueDto>,
  /**
   * No description
   * @name GET /wechat/api/enum/types
   * @summary 获取所有枚举配置类型名称
   * @tags web/枚举
   * @response `200` `JsonResultListString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/enum/types_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/enum/types`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListString>,
  /**
   * No description
   * @name GET /wechat/api/enum/{type}
   * @summary 根据枚举配置类型名称获取枚举信息
   * @tags web/枚举
   * @response `200` `JsonResultListPublicKeyValueDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/wechat/api/enum/{type}_GET": (type: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/wechat/api/enum/${type}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListPublicKeyValueDto>
};
