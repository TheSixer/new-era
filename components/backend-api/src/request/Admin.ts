/* eslint-disable object-shorthand */
/* eslint-disable max-lines */
/* eslint-disable id-length */

import { ITaroRequestConfig } from "@wmeimob/request/src/types/taro-type";
import {
  ActiveOrderListParam,
  ActiveOrderUnifyParam,
  ActiveOrderUnifySetasParam,
  ActivityCreateInputDto,
  ActivityOpenDto,
  ActivityOrderSeatArrangeParam,
  ActivityWhiteCreateInputDto,
  ActivityWhiteOutputDto,
  ActivityWhiteQueryListParam,
  AddressCreateInputDto,
  AddressModifyInputDto,
  AdminActivityClassifyGetParams,
  AdminActivityFlashSaleGetParams,
  AdminActivityFreeShippingGetParams,
  AdminActivityFullGetParams,
  AdminActivityGetParams,
  AdminActivityPresaleGetParams,
  AdminApiMallConfMaterialDeleteDeleteParams,
  AdminApiMallConfMaterialGroupDeleteDeleteParams,
  AdminApiMallConfMaterialGroupQueryListAllGetParams,
  AdminApiMallConfMaterialQueryListGetParams,
  AdminApiMemberExportGetParams,
  AdminApiMemberQueryGetParams,
  AdminApiQrCodeGenerateUrlLinkPostParams,
  AdminApiSmsSendCodeGetParams,
  AdminApiSysDeptDeleteDeleteParams,
  AdminApiSysDeptQueryGetParams,
  AdminApiSysResourceGetParams,
  AdminApiSysResourceTreeGetParams,
  AdminApiSysRoleDeleteDeleteParams,
  AdminApiSysRoleQueryGetParams,
  AdminApiSysUserDeleteDeleteParams,
  AdminApiSysUserExportGetParams,
  AdminApiSysUserQueryGetParams,
  AdminApiSysUserResetDefaultDeleteParams,
  AdminCacheGetParams,
  AdminCommentsExportGetParams,
  AdminCommentsGetParams,
  AdminEventListGetParams,
  AdminGoodsGetParams,
  AdminHotKeywordGetParams,
  AdminLiveGetParams,
  AdminLivePageGetParams,
  AdminLiveStatisticsExportGetParams,
  AdminLiveStatisticsGetParams,
  AdminLiveUpdateGetParams,
  AdminMallAddressQueryListAllGetParams,
  AdminMallBalanceGetGetParams,
  AdminMallBalanceQueryUserIdGetParams,
  AdminMallBannerQueryListGetParams,
  AdminMallClassifyTreeGetParams,
  AdminMallCommentsHeadImgListGetParams,
  AdminMallConfigQueryByKeyGetParams,
  AdminMallConfigQueryByMultipleKeyGetParams,
  AdminMallCouponCodeDetailGetParams,
  AdminMallCouponCodeGetParams,
  AdminMallCouponExportGetParams,
  AdminMallCouponTemplateDeleteDeleteParams,
  AdminMallCouponTemplateDetailGetParams,
  AdminMallCouponTemplateQueryListGetParams,
  AdminMallExpressCallbackPostParams,
  AdminMallExpressQueryGetParams,
  AdminMallMemberCardGetParams,
  AdminMallMemberCardMemberUserIdGetParams,
  AdminMallPageDeleteDeleteParams,
  AdminMallPageDetailGetParams,
  AdminMallPageQueryGetParams,
  AdminMallScoreQueryUserIdGetParams,
  AdminMallSpecQueryGetParams,
  AdminMallStatisticsExportOrderDetailsStatisticsGetParams,
  AdminMallStatisticsGraphOrderCountStatisticsGetParams,
  AdminMallStatisticsGraphSaleAmountStatisticsGetParams,
  AdminMallStatisticsGraphUserCountStatisticsGetParams,
  AdminMallStatisticsOrderDetailsStatisticsGetParams,
  AdminMallUserTaskConfigGetParams,
  AdminMemCouponDetailGetParams,
  AdminMemCouponExportGetParams,
  AdminMemCouponQueryListGetParams,
  AdminOperateLogsExportGetParams,
  AdminOperateLogsGetParams,
  AdminOrdersExportGetParams,
  AdminOrdersGetParams,
  AdminOrdersListGetParams,
  AdminPopupAdsGetParams,
  AdminRefundInfoGetParams,
  AdminRefundListGetParams,
  AdminRefundReRefundPutParams,
  AdminRichtextGetParams,
  AdminScoreOrdersExportGetParams,
  AdminScoreOrdersGetParams,
  AdminUserAgreementUserAgreementRecordGetParams,
  AdminUserAgreementUserAgreeRecordGetParams,
  BalanceAdjustInputDto,
  BalanceRefundCardInputDto,
  BannerCreateInputDto,
  BannerModifyInputDto,
  BannerModifyStatusInputDto,
  BatchShipInfoParam,
  CharSequence2,
  CheckUserCreateInputDto,
  CheckUserParam,
  CommentsImportInputDto,
  CouponCodeCreateInputDto,
  CouponRecordDetailQuery,
  CouponRecordQuery,
  CouponSendInputDto,
  CouponTemplateCreateInputDto,
  CouponTemplateModifyInputDto,
  CouponTemplateStatusInputDto,
  ExpressTemplateSaveDto,
  ExpressTemplateUpdateDto,
  ForgotPasswordDto,
  GoodsClassifyMoveInputDto,
  GoodsClassifySaveDto,
  GoodsClassifyUpdateDto,
  GoodsQueryByNo,
  GoodsSaveDTO,
  GoodsSpecCrerateInputDto,
  GoodsSpecModifyInputDto,
  GoodsStatusInputDto,
  HotKeywordSaveDto,
  HotKeywordUpdateDto,
  JsonResultActivityOrderOutputDto,
  JsonResultActivitySeatInfoListDto,
  JsonResultActivityUnifyOutputDto,
  JsonResultAddressOutputDto,
  JsonResultBalanceGetOutputDto,
  JsonResultBannerOutputDto,
  JsonResultCouponTemplateVo,
  JsonResultExpressTemplateDetailOutputDto,
  JsonResultGoodsClassifyOutputDto,
  JsonResultGoodsSpecOutputDto,
  JsonResultGoodsVO,
  JsonResultHotKeywordDto,
  JsonResultListActivitySeatOutputDto,
  JsonResultListAddressOutputDto,
  JsonResultListBannerPositionOutputDto,
  JsonResultListConfConfigOutputDto,
  JsonResultListCouponTemplateVo,
  JsonResultListLive,
  JsonResultListMallConfPageOutputDto,
  JsonResultListMallExpressCompanyVo,
  JsonResultListMaterialGroupVo,
  JsonResultListMenuTreeOutputDto,
  JsonResultListPublicKeyValueDto,
  JsonResultListRefundReasonOutputDto,
  JsonResultListString,
  JsonResultListSysApi,
  JsonResultListSysResource,
  JsonResultListSysRole,
  JsonResultListSysRoleSelectOutputDto,
  JsonResultListTreeLong,
  JsonResultLive,
  JsonResultLivePage,
  JsonResultLoginOutputDto,
  JsonResultLong,
  JsonResultMallConfPageOutputDto,
  JsonResultMapStringListPublicKeyValueDto,
  JsonResultMapStringObject,
  JsonResultMapStringString,
  JsonResultMarketingActivityDto,
  JsonResultMemberDetailOutputDto,
  JsonResultMemCardDto,
  JsonResultObject,
  JsonResultOrderVO,
  JsonResultPagedResultActivityItemOutputDto,
  JsonResultPagedResultActivityOutputDto,
  JsonResultPagedResultBalanceFlowOutputDto,
  JsonResultPagedResultBannerOutputDto,
  JsonResultPagedResultCommentsHeadImgOutputDto,
  JsonResultPagedResultCommentsVO,
  JsonResultPagedResultCouponCodeDetailOutputDto,
  JsonResultPagedResultCouponCodeOutputDto,
  JsonResultPagedResultCouponRecordDetailOutputDto,
  JsonResultPagedResultCouponRecordOutputDto,
  JsonResultPagedResultCouponTemplateVo,
  JsonResultPagedResultEventTypesVo,
  JsonResultPagedResultExpressTemplateListOutputDto,
  JsonResultPagedResultGoodsSpecOutputDto,
  JsonResultPagedResultGoodsVO,
  JsonResultPagedResultHotKeywordDto,
  JsonResultPagedResultLivePage,
  JsonResultPagedResultLiveStatistics,
  JsonResultPagedResultMallConfPageOutputDto,
  JsonResultPagedResultMallConfUserTaskDTO,
  JsonResultPagedResultMarketingActivityVo,
  JsonResultPagedResultMaterialVo,
  JsonResultPagedResultMemberDetailOutputDto,
  JsonResultPagedResultMemCardDto,
  JsonResultPagedResultMemCouponRecordVo,
  JsonResultPagedResultOperateLogsDto,
  JsonResultPagedResultOrderVO,
  JsonResultPagedResultPopupAdsDto,
  JsonResultPagedResultRefundMasterDto,
  JsonResultPagedResultScoreFlowOutputDto,
  JsonResultPagedResultSysDeptVo,
  JsonResultPagedResultSysResource,
  JsonResultPagedResultSysRoleOutputDto,
  JsonResultPagedResultSysUserVo,
  JsonResultPagedResultUserAgreementRecordDto,
  JsonResultPagedResultUserAgreeRecordDto,
  JsonResultPagedResultUserTagsVo,
  JsonResultPopupAdsDto,
  JsonResultRefundMasterDto,
  JsonResultResourceDetailVo,
  JsonResultScoreGetOutputDto,
  JsonResultSigninTaskOutputDto,
  JsonResultStatisticsCountOutputDto,
  JsonResultStatisticsGraphOutputDto,
  JsonResultString,
  JsonResultSysAuthVo,
  JsonResultSysResource,
  JsonResultSysRoleDetailOutputDto,
  JsonResultUserAgreementRecordDto,
  JsonResultVoid,
  KdniaoExpressCallbackResponseDto,
  LivePageInsert,
  LivePageUpdate,
  LiveUpdateVolcengineVo,
  LoginDto,
  MallConfPageCreateInputDto,
  MallConfPageModifyInputDto,
  MallConfUserTaskUpdateDTO,
  MapStringString,
  MarketingActivityClassifyDto,
  MarketingActivityOfFlashSaleDto,
  MarketingActivityOfFreeShippingDto,
  MarketingActivityOfFullDto,
  MarketingActivityOfPreSaleDto,
  MarketingUserTagsDto,
  MarketingUserTagsParam,
  MaterialAddParam,
  MaterialGroupSaveDto,
  MaterialGroupUpdateDto,
  MaterialModifyParam,
  MaterialMoveParam,
  MemCardSaveDto,
  MemCardUpdateDto,
  ModifyEventStatusInputDto,
  PopupAdsSaveDto,
  PopupAdsUpdateDto,
  RefundAgreeParam,
  RefundCheckParam,
  RefundReasonCreateInputDto,
  RefundReasonModifyInputDto,
  RefundRefuseParam,
  RefundShippingParam,
  ReplyCommentsDto,
  ResetPwdDto,
  ResourceCreateDto,
  ResourceUpdateDto,
  RichText,
  RoleResourceSaveDto,
  ScoreChangeInputDto,
  ShipInfoParam,
  ShowDto,
  SigninTaskInputDto,
  SkuStockAndPriceUpdateDto,
  StatusDto,
  SysDeptCreateInputDto,
  SysDeptModifyInputDto,
  SysResourceReq,
  SysRoleCreateInputDto,
  SysRoleModifyInputDto,
  SysUserCreateInputDto,
  SysUserModifyInputDto,
  TagsBind4usersDTO,
  UnlimitedInputDto,
  UserChangeStatusInputDto,
  UserRolesDto
} from "./data-contracts";
import requestInstance from "./instance";

type RequestConfig = Omit<ITaroRequestConfig, "url" | "method">;

export const API = {
  /**
   * @description 新增
   * @name POST /admin/mall/activityWhite/add
   * @summary 白名单新增
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityWhite/add_POST": (body: ActivityWhiteCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityWhite/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 修改
   * @name POST /admin/mall/activityWhite/update
   * @summary 白名单修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityWhite/update_PUT": (body: ActivityWhiteCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityWhite/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
    
  /**
   * @description 修改
   * @name POST /admin/mall/activityWhite/update
   * @summary 白名单修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityWhite/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityWhite/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/activityWhite/queryList
   * @summary 列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityWhite/queryList_GET": (query: ActivityWhiteQueryListParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityWhite/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<ActivityWhiteOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/activityOrder/queryList
   * @summary 列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityOrder/queryList_GET": (query: ActiveOrderListParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityOrder/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultActivityOrderOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/activity/queryUnifyList
   * @summary 活动场次列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activity/queryUnifyList_GET": (query: ActiveOrderUnifyParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activity/queryUnifyList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultActivityUnifyOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/activityOrder/distributionInfo
   * @summary 活动座位列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityOrder/distributionInfo_GET": (query: ActiveOrderUnifySetasParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityOrder/distributionInfo`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultActivitySeatInfoListDto>,
  /**
   * No description
   * @name GET /admin/mall/activity/querySeatList
   * @summary 活动座位列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activity/querySeatList_GET": (query: ActiveOrderUnifyParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activity/querySeatList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListActivitySeatOutputDto>,
  /**
   * @description 座位分配
   * @name POST /admin/mall/activityOrder/distribution
   * @summary 座位分配
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityOrder/distribution_POST": (body: ActivityOrderSeatArrangeParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityOrder/distribution`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 新增
   * @name POST /admin/mall/activity/add
   * @summary 活动类型新增
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityClassify/add_POST": (body: MarketingActivityClassifyDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityClassify/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 修改
   * @name POST /admin/mall/activity/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityClassify/update_PUT": (body: MarketingActivityClassifyDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityClassify/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
    
  /**
   * @description 修改
   * @name POST /admin/mall/activity/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityClassify/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityClassify/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 列表
   * @name GET /admin/mall/activityClassify/queryList
   * @summary 活动类型分页查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityClassify/queryList_GET": (query: AdminActivityClassifyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityClassify/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * @description 列表
   * @name GET /admin/mall/activityClassify/queryList
   * @summary 活动类型分页查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activityClassify/queryClassifyList_GET": (query: AdminActivityClassifyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activityClassify/queryClassifyList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultEventTypesVo>,
  
  /**
   * @description 新增
   * @name POST /admin/mall/tag/add
   * @summary 活动类型新增
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/tag/add_POST": (body: MarketingUserTagsDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/tag/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 修改
   * @name POST /admin/mall/tag/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/tag/update_PUT": (body: MarketingActivityClassifyDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/tag/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
    
  /**
   * @description 修改
   * @name POST /admin/mall/tag/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/tag/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/tag/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 列表
   * @name GET /admin/mall/tag/queryList
   * @summary 活动类型分页查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/tag/get/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/tag/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * @description 列表
   * @name GET /admin/mall/tag/queryList
   * @summary 活动类型分页查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/tag/queryList_GET": (query: MarketingUserTagsParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/tag/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultUserTagsVo>,

  /**
   * @description 新增
   * @name POST /admin/mall/checkUser/add
   * @summary 核销人员新增
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/checkUser/add_POST": (body: CheckUserCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/checkUser/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 修改
   * @name POST /admin/mall/tag/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/checkUser/update_PUT": (body: CheckUserCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/checkUser/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
    
  /**
   * @description 修改
   * @name POST /admin/mall/checkUser/update
   * @summary 活动类型修改
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/checkUser/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/checkUser/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 列表
   * @name GET /admin/mall/checkUser/get/${id}
   * @summary 活动类型查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/checkUser/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/checkUser/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * @description 列表
   * @name GET /admin/mall/checkUser/queryList
   * @summary 活动类型分页查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/checkUser/queryList_GET": (query: CheckUserParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/checkUser/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultUserTagsVo>,
  /**
   * @description banner查询
   * @name GET /admin/mall/banner/get/${id}
   * @summary banner查询
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/banner/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * @description 列表
   * @name GET /admin/activity/flashSale
   * @summary 活动分页查询
   * @tags admin/限时抢购
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activity/queryList_GET": (query: AdminEventListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activity/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultActivityOutputDto>,
  /**
   * @description 新增
   * @name POST /admin/mall/activity/add
   * @summary 活动新增
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activity/add_POST": (body: ActivityCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activity/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
    /**
     * @description 修改
     * @name POST /admin/mall/activity/update
     * @summary 活动修改
     * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
     */
    "/admin/mall/activity/update_PUT": (body: CheckUserCreateInputDto, options: RequestConfig = {}) =>
      requestInstance({
        url: `/admin/mall/activity/update`,
        method: "PUT",
        data: body,
        ...options
      }) as unknown as Promise<JsonResultString>,
      
    /**
     * @description 修改
     * @name POST /admin/mall/activity/delete/{id}
     * @summary 活动删除
     * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
     */
    "/admin/mall/activity/delete/{id}_DELETE": (id: string, options: RequestConfig = {}) =>
      requestInstance({
        url: `/admin/mall/activity/delete/${id}`,
        method: "DELETE",
        ...options
      }) as unknown as Promise<JsonResultVoid>,
    /**
     * @description 活动查询
     * @name GET /admin/mall/activity/get/${id}
     * @summary 活动查询
     * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
     */
    "/admin/mall/activity/get/{activityId}_GET": (activityId: string, options: RequestConfig = {}) =>
      requestInstance({
        url: `/admin/mall/activity/get/${activityId}`,
        method: "GET",
        ...options
      }) as unknown as Promise<JsonResultPagedResultActivityItemOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/activity/updateStatus
   * @summary 启用或停用
   * @tags admin/满活动
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/activity/updateStatus_PUT": (body: ModifyEventStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/activity/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 列表
   * @name GET /admin/activity/flashSale
   * @summary 活动分页查询
   * @tags admin/限时抢购
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/flashSale_GET": (query: AdminActivityFlashSaleGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/flashSale`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * @description 新增和修改
   * @name POST /admin/activity/flashSale
   * @summary 活动新增和修改
   * @tags admin/限时抢购
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/flashSale_POST": (body: MarketingActivityOfFlashSaleDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/flashSale`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * @description 详情
   * @name GET /admin/activity/flashSale/{activityNo}
   * @summary 活动详情
   * @tags admin/限时抢购
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/flashSale/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/flashSale/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * @description 删除
   * @name DELETE /admin/activity/flashSale/{activityNo}
   * @summary 活动删除
   * @tags admin/限时抢购
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/activity/flashSale/{activityNo}_DELETE": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/flashSale/${activityNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 启用或停用
   * @name PUT /admin/activity/flashSale/updateStatus
   * @summary 活动启用和停用
   * @tags admin/限时抢购
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/flashSale/updateStatus_PUT": (body: ActivityOpenDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/flashSale/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/mallConfMaterialGroup/add
   * @summary 新增
   * @tags admin/素材库分组
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterialGroup/add_POST": (body: MaterialGroupSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/mallConfMaterialGroup/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/api/mallConfMaterialGroup/queryListAll
   * @summary 列表
   * @tags admin/素材库分组
   * @response `200` `JsonResultListMaterialGroupVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterialGroup/queryListAll_GET": (
    query: AdminApiMallConfMaterialGroupQueryListAllGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/mallConfMaterialGroup/queryListAll`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListMaterialGroupVo>,
  /**
   * No description
   * @name DELETE /admin/api/mallConfMaterialGroup/delete
   * @summary 删除
   * @tags admin/素材库分组
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/mallConfMaterialGroup/delete_DELETE": (
    query: AdminApiMallConfMaterialGroupDeleteDeleteParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/mallConfMaterialGroup/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/api/mallConfMaterialGroup/update
   * @summary 编辑
   * @tags admin/素材库分组
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterialGroup/update_PUT": (body: MaterialGroupUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/mallConfMaterialGroup/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/member/export
   * @summary 导出
   * @tags admin/会员管理
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/export_GET": (query: AdminApiMemberExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name POST /admin/api/member/changeStatus
   * @summary 修改状态
   * @tags admin/会员管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/changeStatus_POST": (body: UserChangeStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/changeStatus`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/member/changeScore
   * @summary 修改会员积分
   * @tags admin/会员管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/changeScore_POST": (body: TagsBind4usersDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/changeScore`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/member/tag
   * @summary 修改会员积分
   * @tags admin/会员管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/tag_POST": (body: ScoreChangeInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/tag`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/member/query
   * @summary 列表
   * @tags admin/会员管理
   * @response `200` `JsonResultPagedResultMemberDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/query_GET": (query: AdminApiMemberQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMemberDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/api/member/query/{id}
   * @summary 详情
   * @tags admin/会员管理
   * @response `200` `JsonResultMemberDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/member/query/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/member/query/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMemberDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/api/oss/info
   * @summary 云存储信息
   * @tags admin/云存储
   * @response `200` `JsonResultMapStringObject` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/oss/info_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/oss/info`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapStringObject>,
  /**
   * No description
   * @name POST /admin/api/qrCode/getUnlimited
   * @summary 获取小程序码 - getUnlimited
   * @tags admin/小程序码
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/qrCode/getUnlimited_POST": (body: UnlimitedInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/qrCode/getUnlimited`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /admin/api/sms/sendCode
   * @summary 发送短信验证码
   * @tags admin/短信服务
   * @response `200` `JsonResultVoid` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sms/sendCode_GET": (query: AdminApiSmsSendCodeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sms/sendCode`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/sysDept/add
   * @summary 新增
   * @tags admin/系统-部门
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysDept/add_POST": (body: SysDeptCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysDept/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/api/sysDept/queryAll
   * @summary 部门表树列表
   * @tags admin/系统-部门
   * @response `200` `JsonResultListMenuTreeOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysDept/queryAll_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysDept/queryAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListMenuTreeOutputDto>,
  /**
   * No description
   * @name PUT /admin/api/sysDept/update
   * @summary 修改
   * @tags admin/系统-部门
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysDept/update_PUT": (body: SysDeptModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysDept/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysResource
   * @summary 搜索资源
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultPagedResultSysResource` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource_GET": (query: AdminApiSysResourceGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultSysResource>,
  /**
   * No description
   * @name POST /admin/api/sysResource
   * @summary 新增
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource_POST": (body: SysResourceReq, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name PUT /admin/api/sysResource
   * @summary 修改
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource_PUT": (body: SysResourceReq, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /admin/api/sysDept/query
   * @summary 部门表分页查询
   * @tags admin/系统-部门
   * @response `200` `JsonResultPagedResultSysDeptVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysDept/query_GET": (query: AdminApiSysDeptQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysDept/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultSysDeptVo>,
  /**
   * No description
   * @name DELETE /admin/api/sysDept/delete
   * @summary 删除
   * @tags admin/系统-部门
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/sysDept/delete_DELETE": (query: AdminApiSysDeptDeleteDeleteParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysDept/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysResource/apis
   * @summary 获取所有api集合
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultListSysApi` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/apis_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/apis`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListSysApi>,
  /**
   * No description
   * @name GET /admin/api/sysResource/detail/{resource-id}
   * @summary 加载资源详情
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultResourceDetailVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/detail/{resource-id}_GET": (resourceId: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/detail/${resourceId}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultResourceDetailVo>,
  /**
   * No description
   * @name GET /admin/api/sysResource/tree
   * @summary 获取所有资源列表（树状结构）
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultListTreeLong` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/tree_GET": (query: AdminApiSysResourceTreeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/tree`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListTreeLong>,
  /**
   * No description
   * @name POST /admin/api/sysResource/resourceCreate
   * @summary 创建资源
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/resourceCreate_POST": (body: ResourceCreateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/resourceCreate`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/api/sysResource/{id}
   * @summary 详情
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultSysResource` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultSysResource>,
  /**
   * No description
   * @name PUT /admin/api/sysResource/{id}
   * @summary 修改
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/{id}_PUT": (id: number, body: SysResourceReq, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name DELETE /admin/api/sysResource/{id}
   * @summary 删除
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultString` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/sysResource/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name PUT /admin/api/sysResource/resourceUpdate/{id}
   * @summary 更新资源
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/resourceUpdate/{id}_PUT": (
    id: number,
    body: ResourceUpdateDto,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/sysResource/resourceUpdate/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysResource/{menu-id}/buttons
   * @summary 根据菜单ID加载菜单下所有的按钮资源
   * @tags admin/系统-资源管理
   * @response `200` `JsonResultListSysResource` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysResource/{menu-id}/buttons_GET": (menuId: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysResource/${menuId}/buttons`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListSysResource>,
  /**
   * No description
   * @name DELETE /admin/api/sysRole/delete
   * @summary 删除角色
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/sysRole/delete_DELETE": (query: AdminApiSysRoleDeleteDeleteParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/sysRole/add
   * @summary 新增角色
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/add_POST": (body: SysRoleCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/api/sysRole/query
   * @summary 角色列表
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultPagedResultSysRoleOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/query_GET": (query: AdminApiSysRoleQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultSysRoleOutputDto>,
  /**
   * No description
   * @name POST /admin/api/sysRole/resources-role
   * @summary 批量保存角色和资源的对应关系
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/resources-role_POST": (body: RoleResourceSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/resources-role`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysRole/queryAll
   * @summary 角色列表 不分页
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultListSysRoleSelectOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/queryAll_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/queryAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListSysRoleSelectOutputDto>,
  /**
   * No description
   * @name PUT /admin/api/sysRole/update
   * @summary 修改角色
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/update_PUT": (body: SysRoleModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysRole/{id}
   * @summary 详情
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultSysRoleDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultSysRoleDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/api/sysRole/{id}/resources
   * @summary 获取角色对应的资源集合
   * @tags admin/系统-角色管理
   * @response `200` `JsonResultListSysResource` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysRole/{id}/resources_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysRole/${id}/resources`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListSysResource>,
  /**
   * No description
   * @name POST /admin/api/sysUser/add
   * @summary 新增
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultLoginOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/add_POST": (body: SysUserCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLoginOutputDto>,
  /**
   * No description
   * @name GET /admin/api/sysUser/current-authorities
   * @summary 获取当前用户权限
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultSysAuthVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/current-authorities_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/current-authorities`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultSysAuthVo>,
  /**
   * No description
   * @name POST /admin/api/sysUser/changeStatus
   * @summary 修改状态
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/changeStatus_POST": (body: UserChangeStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/changeStatus`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/api/sysUser/delete
   * @summary 删除
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/sysUser/delete_DELETE": (query: AdminApiSysUserDeleteDeleteParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysUser/export
   * @summary 导出人员
   * @tags admin/系统-用户管理
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/export_GET": (query: AdminApiSysUserExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/api/sysUser/query
   * @summary 列表
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultPagedResultSysUserVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/query_GET": (query: AdminApiSysUserQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultSysUserVo>,
  /**
   * No description
   * @name DELETE /admin/api/sysUser/resetDefault
   * @summary 重置密码
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultLoginOutputDto` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/sysUser/resetDefault_DELETE": (
    query: AdminApiSysUserResetDefaultDeleteParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/sysUser/resetDefault`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultLoginOutputDto>,
  /**
   * No description
   * @name PUT /admin/api/sysUser/resetPwd
   * @summary 修改密码
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/resetPwd_PUT": (body: ResetPwdDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/resetPwd`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/sysUser/roles-user
   * @summary 保存员工与角色的对应关系
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/roles-user_POST": (body: UserRolesDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/roles-user`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/api/sysUser/update
   * @summary 修改
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/update_PUT": (body: SysUserModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/sysUser/{id}/resources
   * @summary 根据员工ID获取员工可访问的资源
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultListSysResource` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/{id}/resources_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/${id}/resources`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListSysResource>,
  /**
   * No description
   * @name GET /admin/api/sysUser/{id}/roles
   * @summary 根据员工ID查询员工关联的角色集合
   * @tags admin/系统-用户管理
   * @response `200` `JsonResultListSysRole` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/sysUser/{id}/roles_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/sysUser/${id}/roles`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListSysRole>,
  /**
   * No description
   * @name GET /admin/comments/export
   * @summary 导出评价
   * @tags admin/商品评价
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/export_GET": (query: AdminCommentsExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/comments
   * @summary 评价列表
   * @tags admin/商品评价
   * @response `200` `JsonResultPagedResultCommentsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments_GET": (query: AdminCommentsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCommentsVO>,
  /**
   * No description
   * @name POST /admin/comments/import
   * @summary 导入评价
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/import_POST": (body: CommentsImportInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/import`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/comments/reply
   * @summary 回复评价
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/reply_PUT": (body: ReplyCommentsDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/reply`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/comments/replyAdd
   * @summary 回复追评
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/replyAdd_PUT": (body: ReplyCommentsDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/replyAdd`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/comments/show
   * @summary 显示或隐藏
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/show_PUT": (body: StatusDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/show`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/goods
   * @summary 商品列表
   * @tags admin/商品
   * @response `200` `JsonResultPagedResultGoodsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods_GET": (query: AdminGoodsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultGoodsVO>,
  /**
   * No description
   * @name DELETE /admin/comments/{id}
   * @summary 删除
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/comments/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/goods/listByNos
   * @summary 商品列表根据No列表查询
   * @tags admin/商品
   * @response `200` `JsonResultPagedResultGoodsVO` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/listByNos_POST": (body: GoodsQueryByNo, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/listByNos`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultPagedResultGoodsVO>,
  /**
   * No description
   * @name POST /admin/goods/save
   * @summary 保存商品
   * @tags admin/商品
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/save_POST": (body: GoodsSaveDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/save`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name PUT /admin/goods/shelved
   * @summary 上下架
   * @tags admin/商品
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/shelved_PUT": (body: GoodsStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/shelved`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/goods/updateSku
   * @summary 修改Sku库存和价格
   * @tags admin/商品
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/updateSku_PUT": (body: SkuStockAndPriceUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/updateSku`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/goods/{no}
   * @summary 详情
   * @tags admin/商品
   * @response `200` `JsonResultGoodsVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/{no}_GET": (no: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/${no}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultGoodsVO>,
  /**
   * No description
   * @name DELETE /admin/goods/{no}
   * @summary 删除商品
   * @tags admin/商品
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/goods/{no}_DELETE": (no: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/${no}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 退出
   * @name POST /admin/logout
   * @summary 退出
   * @tags admin/退出
   * @response `200` `CharSequence2` OK
   */
  "/admin/logout_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/logout`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name DELETE /admin/mall/address/delete/{id}
   * @summary 删除
   * @tags admin/地址库
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/address/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/address/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/address/add
   * @summary 新增
   * @tags admin/地址库
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/address/add_POST": (body: AddressCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/address/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/mall/address/get/{id}
   * @summary 地址详情
   * @tags admin/地址库
   * @response `200` `JsonResultAddressOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/address/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/address/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultAddressOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/address/queryListAll
   * @summary 地址列表 不分页
   * @tags admin/地址库
   * @response `200` `JsonResultListAddressOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/address/queryListAll_GET": (query: AdminMallAddressQueryListAllGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/address/queryListAll`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListAddressOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/address/update
   * @summary 编辑
   * @tags admin/地址库
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/address/update_PUT": (body: AddressModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/address/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/banner/add
   * @summary 新增
   * @tags admin/Banner
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/add_POST": (body: BannerCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name DELETE /admin/mall/banner/delete/{id}
   * @summary 删除
   * @tags admin/Banner
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/banner/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/banner/get/{id}
   * @summary 详情
   * @tags admin/Banner
   * @response `200` `JsonResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultBannerOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/banner/queryList
   * @summary 列表
   * @tags admin/Banner
   * @response `200` `JsonResultPagedResultBannerOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/queryList_GET": (query: AdminMallBannerQueryListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultBannerOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/banner/update
   * @summary 编辑
   * @tags admin/Banner
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/update_PUT": (body: BannerModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/classify/add
   * @summary 新增
   * @tags admin/商品分类
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/classify/add_POST": (body: GoodsClassifySaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name PUT /admin/mall/banner/updateStatus
   * @summary 修改状态
   * @tags admin/Banner
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/updateStatus_PUT": (body: BannerModifyStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/classify/get/{id}
   * @summary 详情
   * @tags admin/商品分类
   * @response `200` `JsonResultGoodsClassifyOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/classify/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultGoodsClassifyOutputDto>,
  /**
   * No description
   * @name POST /admin/mall/classify/move
   * @summary 移动分类
   * @tags admin/商品分类
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/classify/move_POST": (body: GoodsClassifyMoveInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/move`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/mall/classify/delete/{id}
   * @summary 删除
   * @tags admin/商品分类
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/classify/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/classify/tree
   * @summary 商品分类树形结构列表
   * @tags admin/商品分类
   * @response `200` `JsonResultListTreeLong` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/classify/tree_GET": (query: AdminMallClassifyTreeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/tree`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListTreeLong>,
  /**
   * No description
   * @name POST /admin/mall/comments/headImg/batchAdd
   * @summary 批量新增
   * @tags admin/评价头像
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/comments/headImg/batchAdd_POST": (body: string[], options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/comments/headImg/batchAdd`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/mall/classify/update
   * @summary 编辑
   * @tags admin/商品分类
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/classify/update_PUT": (body: GoodsClassifyUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/classify/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/mall/comments/headImg/delete/{id}
   * @summary 删除
   * @tags admin/评价头像
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/comments/headImg/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/comments/headImg/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/comments/headImg/list
   * @summary 列表
   * @tags admin/评价头像
   * @response `200` `JsonResultPagedResultCommentsHeadImgOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/comments/headImg/list_GET": (
    query: AdminMallCommentsHeadImgListGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/comments/headImg/list`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCommentsHeadImgOutputDto>,
  /**
   * No description
   * @name POST /admin/mall/config/insertAndUpdate
   * @summary 保存和修改 key:value格式
   * @tags admin/系统配置项
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/config/insertAndUpdate_POST": (body: MapStringString, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/config/insertAndUpdate`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/config/query
   * @summary 查询所有配置项
   * @tags admin/系统配置项
   * @response `200` `JsonResultListConfConfigOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/config/query_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/config/query`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListConfConfigOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/config/queryByKey
   * @summary 根据key查询
   * @tags admin/系统配置项
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/config/queryByKey_GET": (query: AdminMallConfigQueryByKeyGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/config/queryByKey`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name POST /admin/mall/coupon/detail
   * @summary 发放记录详情列表
   * @tags admin/优惠劵发放
   * @response `200` `JsonResultPagedResultCouponRecordOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/coupon/detail_POST": (body: CouponRecordDetailQuery, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/coupon/detail`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCouponRecordOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/coupon/export
   * @summary 导出发放记录详情
   * @tags admin/优惠劵发放
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/coupon/export_GET": (query: AdminMallCouponExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/coupon/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name POST /admin/mall/express/add
   * @summary 新增
   * @tags admin/运费模板
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/express/add_POST": (body: ExpressTemplateSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name DELETE /admin/mall/express/delete/{id}
   * @summary 删除
   * @tags admin/运费模板
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/express/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/coupon/receive
   * @summary 发放优惠券
   * @tags admin/优惠劵发放
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/coupon/receive_POST": (body: CouponSendInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/coupon/receive`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/coupon/list
   * @summary 发放记录列表
   * @tags admin/优惠劵发放
   * @response `200` `JsonResultPagedResultCouponRecordDetailOutputDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/coupon/list_POST": (body: CouponRecordQuery, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/coupon/list`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCouponRecordDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/express/get/{id}
   * @summary 详情
   * @tags admin/运费模板
   * @response `200` `JsonResultExpressTemplateDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/express/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultExpressTemplateDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/express/query
   * @summary 列表
   * @tags admin/运费模板
   * @response `200` `JsonResultPagedResultExpressTemplateListOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/express/query_GET": (query: AdminMallExpressQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultExpressTemplateListOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/express/update
   * @summary 编辑
   * @tags admin/运费模板
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/express/update_PUT": (body: ExpressTemplateUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/page/add
   * @summary 新增
   * @tags admin/自定义页面
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/page/add_POST": (body: MallConfPageCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/mall/page/query
   * @summary 列表
   * @tags admin/自定义页面
   * @response `200` `JsonResultPagedResultMallConfPageOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/page/query_GET": (query: AdminMallPageQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMallConfPageOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/page/detail
   * @summary 详情
   * @tags admin/自定义页面
   * @response `200` `JsonResultMallConfPageOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/page/detail_GET": (query: AdminMallPageDetailGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultMallConfPageOutputDto>,
  /**
   * No description
   * @name DELETE /admin/mall/page/delete
   * @summary 删除
   * @tags admin/自定义页面
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/page/delete_DELETE": (query: AdminMallPageDeleteDeleteParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/page/queryAll
   * @summary 列表 不分页
   * @tags admin/自定义页面
   * @response `200` `JsonResultListMallConfPageOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/page/queryAll_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/queryAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListMallConfPageOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/page/update
   * @summary 修改
   * @tags admin/自定义页面
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/page/update_PUT": (body: MallConfPageModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/page/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/refundReason/add
   * @summary 新增
   * @tags admin/售后原因
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/refundReason/add_POST": (body: RefundReasonCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/refundReason/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name DELETE /admin/mall/refundReason/delete/{id}
   * @summary 删除
   * @tags admin/售后原因
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/refundReason/delete/{id}_DELETE": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/refundReason/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/refundReason/queryAll
   * @summary 列表 不分页
   * @tags admin/售后原因
   * @response `200` `JsonResultListRefundReasonOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/refundReason/queryAll_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/refundReason/queryAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListRefundReasonOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/refundReason/update
   * @summary 编辑
   * @tags admin/售后原因
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/refundReason/update_PUT": (body: RefundReasonModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/refundReason/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mallCouponTemplate/add
   * @summary 优惠劵新增
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/add_POST": (body: CouponTemplateCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/mallConfLogisticsCompany/mallExpressCompanyAll
   * @summary 查询全部快递公司与编号
   * @tags admin/物流公司
   * @response `200` `JsonResultListMallExpressCompanyVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallConfLogisticsCompany/mallExpressCompanyAll_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mallConfLogisticsCompany/mallExpressCompanyAll`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListMallExpressCompanyVo>,
  /**
   * No description
   * @name DELETE /admin/mallCouponTemplate/delete
   * @summary 优惠劵作废
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mallCouponTemplate/delete_DELETE": (
    query: AdminMallCouponTemplateDeleteDeleteParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mallCouponTemplate/detail
   * @summary 详情
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultCouponTemplateVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/detail_GET": (
    query: AdminMallCouponTemplateDetailGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultCouponTemplateVo>,
  /**
   * No description
   * @name GET /admin/mallCouponTemplate/queryList
   * @summary 列表
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultPagedResultCouponTemplateVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/queryList_GET": (
    query: AdminMallCouponTemplateQueryListGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCouponTemplateVo>,
  /**
   * No description
   * @name POST /admin/mallCouponTemplate/queryListByTemplateNos
   * @summary 列表 根据编号
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultListCouponTemplateVo` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/queryListByTemplateNos_POST": (body: string[], options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/queryListByTemplateNos`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultListCouponTemplateVo>,
  /**
   * No description
   * @name PUT /admin/mallCouponTemplate/update
   * @summary 优惠劵修改
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/update_PUT": (body: CouponTemplateModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/memCoupon/detail
   * @summary 详情
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultCouponTemplateVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/memCoupon/detail_GET": (query: AdminMemCouponDetailGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/memCoupon/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultCouponTemplateVo>,
  /**
   * No description
   * @name PUT /admin/mallCouponTemplate/updatePublicStatus
   * @summary 优惠劵显示状态修改
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mallCouponTemplate/updatePublicStatus_PUT": (
    body: CouponTemplateStatusInputDto,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mallCouponTemplate/updatePublicStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/memCoupon/export
   * @summary 导出优惠券领用记录
   * @tags admin/优惠劵模板
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/memCoupon/export_GET": (query: AdminMemCouponExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/memCoupon/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/memCoupon/queryList
   * @summary 用户领取优惠券查询
   * @tags admin/优惠劵模板
   * @response `200` `JsonResultPagedResultMemCouponRecordVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/memCoupon/queryList_GET": (query: AdminMemCouponQueryListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/memCoupon/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMemCouponRecordVo>,
  /**
   * No description
   * @name GET /admin/orders
   * @summary 列表
   * @tags admin/订单
   * @response `200` `JsonResultPagedResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/orders_GET": (query: AdminOrdersGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/orders`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultOrderVO>,
  /**
   * No description
   * @name GET /admin/orders/export
   * @summary 导出
   * @tags admin/订单
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/orders/export_GET": (query: AdminOrdersExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/orders/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/orders/{orderNo}
   * @summary 详情
   * @tags admin/订单
   * @response `200` `JsonResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/orders/{orderNo}_GET": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/orders/${orderNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultOrderVO>,
  /**
   * No description
   * @name POST /admin/public/forgot
   * @summary 忘记密码
   * @tags admin/公开的API
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/public/forgot_POST": (body: ForgotPasswordDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/public/forgot`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/refund/agree
   * @summary 同意退款
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/agree_PUT": (body: RefundAgreeParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/agree`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/refund/checkAgree
   * @summary 验货通过
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/checkAgree_PUT": (body: RefundCheckParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/checkAgree`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/refund/checkRefuse
   * @summary 验货不通过
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/checkRefuse_PUT": (body: RefundRefuseParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/checkRefuse`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/refund/list
   * @summary 列表
   * @tags admin/售后
   * @response `200` `JsonResultPagedResultRefundMasterDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/list_GET": (query: AdminRefundListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/list`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultRefundMasterDto>,
  /**
   * No description
   * @name GET /admin/refund/info
   * @summary 详情
   * @tags admin/售后
   * @response `200` `JsonResultRefundMasterDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/info_GET": (query: AdminRefundInfoGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/info`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultRefundMasterDto>,
  /**
   * @description 重新退款
   * @name PUT /admin/refund/reRefund
   * @summary 重新退款
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/reRefund_PUT": (query: AdminRefundReRefundPutParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/reRefund`,
      method: "PUT",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/refund/refuse
   * @summary 拒绝退款
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/refuse_PUT": (body: RefundRefuseParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/refuse`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/richtext
   * @summary 获取富文本内容
   * @tags admin/富文本管理接口
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/richtext_GET": (query: AdminRichtextGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/richtext`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name POST /admin/richtext
   * @summary 新增富文本
   * @tags admin/富文本管理接口
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/richtext_POST": (body: RichText, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/richtext`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name PUT /admin/refund/shipping
   * @summary 填写退货物流
   * @tags admin/售后
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/refund/shipping_PUT": (body: RefundShippingParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/refund/shipping`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/richtext/{id}
   * @summary 删除富文本
   * @tags admin/富文本管理接口
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/richtext/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/richtext/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/richtext/{id}
   * @summary 修改富文本
   * @tags admin/富文本管理接口
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/richtext/{id}_PUT": (id: number, body: RichText, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/richtext/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/shipping/shipping/batch
   * @summary 订单批量发货
   * @tags admin/发货管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/shipping/shipping/batch_POST": (body: BatchShipInfoParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/shipping/shipping/batch`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/shipping/updateShipping
   * @summary 订单物流修改
   * @tags admin/发货管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/shipping/updateShipping_PUT": (body: ShipInfoParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/shipping/updateShipping`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/shipping/shipping
   * @summary 订单发货
   * @tags admin/发货管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/shipping/shipping_POST": (body: ShipInfoParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/shipping/shipping`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/goods/useScore
   * @summary 修改是否使用积分
   * @tags admin/商品
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/useScore_PUT": (body: GoodsStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/useScore`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/hotKeyword
   * @summary 列表
   * @tags admin/热词
   * @response `200` `JsonResultPagedResultHotKeywordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/hotKeyword_GET": (query: AdminHotKeywordGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultHotKeywordDto>,
  /**
   * No description
   * @name POST /admin/hotKeyword
   * @summary 新增
   * @tags admin/热词
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/hotKeyword_POST": (body: HotKeywordSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/hotKeyword/{id}
   * @summary 详情
   * @tags admin/热词
   * @response `200` `JsonResultHotKeywordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/hotKeyword/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultHotKeywordDto>,
  /**
   * No description
   * @name DELETE /admin/hotKeyword/{id}
   * @summary 删除
   * @tags admin/热词
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/hotKeyword/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/hotKeyword/{id}
   * @summary 编辑
   * @tags admin/热词
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/hotKeyword/{id}_PUT": (id: number, body: HotKeywordUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/hotKeyword/{id}/show
   * @summary 显示或隐藏
   * @tags admin/热词
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/hotKeyword/{id}/show_PUT": (id: number, body: ShowDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/hotKeyword/${id}/show`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 列表
   * @name GET /admin/activity/full
   * @summary 活动分页查询
   * @tags admin/满活动
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/full_GET": (query: AdminActivityFullGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/full`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * No description
   * @name POST /admin/activity/full
   * @summary 新增和修改
   * @tags admin/满活动
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/full_POST": (body: MarketingActivityOfFullDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/full`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /admin/activity/full/{activityNo}
   * @summary 详情
   * @tags admin/满活动
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/full/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/full/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name DELETE /admin/activity/full/{activityNo}
   * @summary 删除
   * @tags admin/满活动
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/activity/full/{activityNo}_DELETE": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/full/${activityNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/activity/full/updateStatus
   * @summary 启用或停用
   * @tags admin/满活动
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/full/updateStatus_PUT": (body: ActivityOpenDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/full/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/popupAds
   * @summary 列表
   * @tags admin/弹窗广告
   * @response `200` `JsonResultPagedResultPopupAdsDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/popupAds_GET": (query: AdminPopupAdsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultPopupAdsDto>,
  /**
   * No description
   * @name POST /admin/popupAds
   * @summary 新增
   * @tags admin/弹窗广告
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/popupAds_POST": (body: PopupAdsSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/popupAds/{id}
   * @summary 详情
   * @tags admin/弹窗广告
   * @response `200` `JsonResultPopupAdsDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/popupAds/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultPopupAdsDto>,
  /**
   * No description
   * @name PUT /admin/popupAds/{id}
   * @summary 编辑
   * @tags admin/弹窗广告
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/popupAds/{id}_PUT": (id: number, body: PopupAdsUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/popupAds/{id}
   * @summary 删除
   * @tags admin/弹窗广告
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/popupAds/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/popupAds/{id}/show
   * @summary 显示或隐藏
   * @tags admin/弹窗广告
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/popupAds/{id}/show_PUT": (id: number, body: ShowDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/popupAds/${id}/show`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/balance/get
   * @summary 获取余额汇总信息
   * @tags admin/余额
   * @response `200` `JsonResultBalanceGetOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/balance/get_GET": (query: AdminMallBalanceGetGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/balance/get`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultBalanceGetOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/balance/query/{userId}
   * @summary 余额流水列表
   * @tags admin/余额
   * @response `200` `JsonResultPagedResultBalanceFlowOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/balance/query/{userId}_GET": (
    { userId, ...query }: AdminMallBalanceQueryUserIdGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/balance/query/${userId}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultBalanceFlowOutputDto>,
  /**
   * @description 默认账号:19999999999 密码ocj123456 密码需要aes加密，获取token后放在header中{Authorization:你的token}
   * @name POST /admin/public/login
   * @summary 登录
   * @tags admin/公开的API
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/public/login_POST": (body: LoginDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/public/login`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name POST /admin/mall/balance/adjust
   * @summary 调整余额
   * @tags admin/余额
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/balance/adjust_POST": (body: BalanceAdjustInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/balance/adjust`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/balance/get/{userId}
   * @summary 余额汇总信息
   * @tags admin/余额
   * @response `200` `JsonResultBalanceGetOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/balance/get/{userId}_GET": (userId: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/balance/get/${userId}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultBalanceGetOutputDto>,
  /**
   * No description
   * @name POST /admin/mall/balance/refundCard
   * @summary 退卡
   * @tags admin/余额
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/balance/refundCard_POST": (body: BalanceRefundCardInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/balance/refundCard`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/config/queryByMultipleKey
   * @summary 根据keys查询，多个按逗号分割
   * @tags admin/系统配置项
   * @response `200` `JsonResultMapStringString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/config/queryByMultipleKey_GET": (
    query: AdminMallConfigQueryByMultipleKeyGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/config/queryByMultipleKey`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultMapStringString>,
  /**
   * No description
   * @name GET /admin/mall/userTaskConfig
   * @summary 列表
   * @tags admin/用户任务
   * @response `200` `JsonResultPagedResultMallConfUserTaskDTO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/userTaskConfig_GET": (query: AdminMallUserTaskConfigGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/userTaskConfig`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMallConfUserTaskDTO>,
  /**
   * No description
   * @name PUT /admin/mall/userTaskConfig/{id}
   * @summary 编辑
   * @tags admin/用户任务
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/userTaskConfig/{id}_PUT": (id: number, body: MallConfUserTaskUpdateDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/userTaskConfig/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/mall/memberCard
   * @summary 新增
   * @tags admin/会员卡
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/memberCard_POST": (body: MemCardSaveDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/memberCard`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/mall/memberCard
   * @summary 列表
   * @tags admin/会员卡
   * @response `200` `JsonResultPagedResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/memberCard_GET": (query: AdminMallMemberCardGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/memberCard`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMemCardDto>,
  /**
   * No description
   * @name GET /admin/mall/memberCard/{id}
   * @summary 详情
   * @tags admin/会员卡
   * @response `200` `JsonResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/memberCard/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/memberCard/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMemCardDto>,
  /**
   * No description
   * @name PUT /admin/mall/memberCard/{id}
   * @summary 编辑
   * @tags admin/会员卡
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/memberCard/{id}_PUT": (id: number, body: MemCardUpdateDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/memberCard/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/signin
   * @summary 获取签到任务信息
   * @tags admin/签到
   * @response `200` `JsonResultSigninTaskOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/signin_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/signin`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultSigninTaskOutputDto>,
  /**
   * No description
   * @name POST /admin/mall/signin
   * @summary 保存签到任务信息
   * @tags admin/签到
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/signin_POST": (body: SigninTaskInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/signin`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/api/mallConfMaterial/add
   * @summary 新增
   * @tags admin/素材库
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterial/add_POST": (body: MaterialAddParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/mallConfMaterial/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name DELETE /admin/api/mallConfMaterial/delete
   * @summary 删除
   * @tags admin/素材库
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/api/mallConfMaterial/delete_DELETE": (
    query: AdminApiMallConfMaterialDeleteDeleteParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/mallConfMaterial/delete`,
      method: "DELETE",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/api/mallConfMaterial/move
   * @summary 移动
   * @tags admin/素材库
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterial/move_PUT": (body: MaterialMoveParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/mallConfMaterial/move`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /admin/api/mallConfMaterial/update
   * @summary 修改
   * @tags admin/素材库
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterial/update_PUT": (body: MaterialModifyParam, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/mallConfMaterial/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/api/mallConfMaterial/queryList
   * @summary 列表
   * @tags admin/素材库
   * @response `200` `JsonResultPagedResultMaterialVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/mallConfMaterial/queryList_GET": (
    query: AdminApiMallConfMaterialQueryListGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/mallConfMaterial/queryList`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMaterialVo>,
  /**
   * No description
   * @name PUT /admin/goods/frontShow
   * @summary 修改是否前台可见
   * @tags admin/商品
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/goods/frontShow_PUT": (body: GoodsStatusInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/goods/frontShow`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/couponCode
   * @summary 优惠码列表
   * @tags admin/优惠码
   * @response `200` `JsonResultPagedResultCouponCodeOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/couponCode_GET": (query: AdminMallCouponCodeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/couponCode`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCouponCodeOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/couponCode
   * @summary 生成优惠码
   * @tags admin/优惠码
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/couponCode_PUT": (body: CouponCodeCreateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/couponCode`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name GET /admin/mall/couponCode/detail
   * @summary 优惠码详情列表
   * @tags admin/优惠码
   * @response `200` `JsonResultPagedResultCouponCodeDetailOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/couponCode/detail_GET": (query: AdminMallCouponCodeDetailGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/couponCode/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultCouponCodeDetailOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/couponCode/export/{id}
   * @summary 导出优惠码详情
   * @tags admin/优惠码
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/couponCode/export/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/couponCode/export/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * @description 列表
   * @name GET /admin/activity/presale
   * @summary 活动分页查询
   * @tags admin/预售活动
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/presale_GET": (query: AdminActivityPresaleGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/presale`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * No description
   * @name POST /admin/activity/presale
   * @summary 新增和修改
   * @tags admin/预售活动
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/presale_POST": (body: MarketingActivityOfPreSaleDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/presale`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name PUT /admin/activity/presale/updateStatus
   * @summary 启用或停用
   * @tags admin/预售活动
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/presale/updateStatus_PUT": (body: ActivityOpenDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/presale/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/activity/presale/{activityNo}
   * @summary 详情
   * @tags admin/预售活动
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/presale/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/presale/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name DELETE /admin/activity/presale/{activityNo}
   * @summary 删除
   * @tags admin/预售活动
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/activity/presale/{activityNo}_DELETE": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/presale/${activityNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/memberCard/member/{userId}
   * @summary 持有的会员卡列表
   * @tags admin/会员卡
   * @response `200` `JsonResultPagedResultMemCardDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/memberCard/member/{userId}_GET": (
    { userId, ...query }: AdminMallMemberCardMemberUserIdGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/memberCard/member/${userId}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMemCardDto>,
  /**
   * No description
   * @name GET /admin/userAgreement/userAgreementRecord
   * @summary 用户协议记录 列表
   * @tags admin/用户协议
   * @response `200` `JsonResultPagedResultUserAgreementRecordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/userAgreement/userAgreementRecord_GET": (
    query: AdminUserAgreementUserAgreementRecordGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/userAgreement/userAgreementRecord`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultUserAgreementRecordDto>,
  /**
   * No description
   * @name GET /admin/userAgreement/userAgreementRecord/{id}
   * @summary 用户协议记录 详情
   * @tags admin/用户协议
   * @response `200` `JsonResultUserAgreementRecordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/userAgreement/userAgreementRecord/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/userAgreement/userAgreementRecord/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultUserAgreementRecordDto>,
  /**
   * No description
   * @name GET /admin/userAgreement/userAgreeRecord
   * @summary 用户同意记录 列表
   * @tags admin/用户协议
   * @response `200` `JsonResultPagedResultUserAgreeRecordDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/userAgreement/userAgreeRecord_GET": (
    query: AdminUserAgreementUserAgreeRecordGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/userAgreement/userAgreeRecord`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultUserAgreeRecordDto>,
  /**
   * @description 列表
   * @name GET /admin/activity/freeShipping
   * @summary 活动分页查询
   * @tags admin/包邮活动
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/freeShipping_GET": (query: AdminActivityFreeShippingGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/freeShipping`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * No description
   * @name POST /admin/activity/freeShipping
   * @summary 新增和修改
   * @tags admin/包邮活动
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/freeShipping_POST": (body: MarketingActivityOfFreeShippingDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/freeShipping`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name PUT /admin/activity/freeShipping/updateStatus
   * @summary 启用或停用
   * @tags admin/包邮活动
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/freeShipping/updateStatus_PUT": (body: ActivityOpenDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/freeShipping/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/activity/freeShipping/{activityNo}
   * @summary 详情
   * @tags admin/包邮活动
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/freeShipping/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/freeShipping/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name DELETE /admin/activity/freeShipping/{activityNo}
   * @summary 删除
   * @tags admin/包邮活动
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/activity/freeShipping/{activityNo}_DELETE": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/freeShipping/${activityNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/scoreOrders
   * @summary 列表
   * @tags admin/积分订单
   * @response `200` `JsonResultPagedResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/scoreOrders_GET": (query: AdminScoreOrdersGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/scoreOrders`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultOrderVO>,
  /**
   * No description
   * @name GET /admin/scoreOrders/export
   * @summary 订单导出
   * @tags admin/积分订单
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/scoreOrders/export_GET": (query: AdminScoreOrdersExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/scoreOrders/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name PUT /admin/activity/updateStatus
   * @summary 活动启用或停用
   * @tags admin/活动管理
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/updateStatus_PUT": (body: ActivityOpenDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/updateStatus`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/activity
   * @summary 活动列表
   * @tags admin/活动管理
   * @response `200` `JsonResultPagedResultMarketingActivityVo` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity_GET": (query: AdminActivityGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultMarketingActivityVo>,
  /**
   * No description
   * @name GET /admin/activity/{activityNo}
   * @summary 活动详情
   * @tags admin/活动管理
   * @response `200` `JsonResultMarketingActivityDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/{activityNo}_GET": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/${activityNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultMarketingActivityDto>,
  /**
   * No description
   * @name DELETE /admin/activity/{activityNo}
   * @summary 活动删除
   * @tags admin/活动管理
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/activity/{activityNo}_DELETE": (activityNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/${activityNo}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/activity/conflict/{goodsNo}
   * @summary 活动冲突
   * @tags admin/活动管理
   * @response `200` `JsonResultVoid` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/activity/conflict/{goodsNo}_GET": (goodsNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/activity/conflict/${goodsNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/score/export/{userId}
   * @summary 导出积分流水
   * @tags admin/积分
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/score/export/{userId}_GET": (userId: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/score/export/${userId}`,
      method: "GET",
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/mall/score/get/{userId}
   * @summary 积分汇总信息
   * @tags admin/积分
   * @response `200` `JsonResultScoreGetOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/score/get/{userId}_GET": (userId: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/score/get/${userId}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultScoreGetOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/score/query/{userId}
   * @summary 积分流水列表
   * @tags admin/积分
   * @response `200` `JsonResultPagedResultScoreFlowOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/score/query/{userId}_GET": (
    { userId, ...query }: AdminMallScoreQueryUserIdGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/score/query/${userId}`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultScoreFlowOutputDto>,
  /**
   * No description
   * @name POST /admin/mall/spec/add
   * @summary 新增
   * @tags admin/商品规格
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/spec/add_POST": (body: GoodsSpecCrerateInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/spec/add`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name DELETE /admin/mall/spec/delete/{id}
   * @summary 删除
   * @tags admin/商品规格
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/mall/spec/delete/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/spec/delete/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/spec/get/{id}
   * @summary 详情
   * @tags admin/商品规格
   * @response `200` `JsonResultGoodsSpecOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/spec/get/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/spec/get/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultGoodsSpecOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/spec/query
   * @summary 列表
   * @tags admin/商品规格
   * @response `200` `JsonResultPagedResultGoodsSpecOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/spec/query_GET": (query: AdminMallSpecQueryGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/spec/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultGoodsSpecOutputDto>,
  /**
   * No description
   * @name PUT /admin/mall/spec/update
   * @summary 编辑
   * @tags admin/商品规格
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/spec/update_PUT": (body: GoodsSpecModifyInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/spec/update`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/mall/statistics/exportOrderDetailsStatistics
   * @summary 导出营业额明细
   * @tags admin/首页统计
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/exportOrderDetailsStatistics_GET": (
    query: AdminMallStatisticsExportOrderDetailsStatisticsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/statistics/exportOrderDetailsStatistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/mall/statistics/graphOrderCountStatistics
   * @summary 统计图成交订单量查询
   * @tags admin/首页统计
   * @response `200` `JsonResultStatisticsGraphOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/graphOrderCountStatistics_GET": (
    query: AdminMallStatisticsGraphOrderCountStatisticsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/statistics/graphOrderCountStatistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultStatisticsGraphOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/statistics/graphSaleAmountStatistics
   * @summary 统计图营业额查询
   * @tags admin/首页统计
   * @response `200` `JsonResultStatisticsGraphOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/graphSaleAmountStatistics_GET": (
    query: AdminMallStatisticsGraphSaleAmountStatisticsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/statistics/graphSaleAmountStatistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultStatisticsGraphOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/statistics/graphUserCountStatistics
   * @summary 统计图新增用户数查询
   * @tags admin/首页统计
   * @response `200` `JsonResultStatisticsGraphOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/graphUserCountStatistics_GET": (
    query: AdminMallStatisticsGraphUserCountStatisticsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/statistics/graphUserCountStatistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultStatisticsGraphOutputDto>,
  /**
   * No description
   * @name GET /admin/mall/statistics/orderDetailsStatistics
   * @summary 营业额明细查询
   * @tags admin/首页统计
   * @response `200` `JsonResultPagedResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/orderDetailsStatistics_GET": (
    query: AdminMallStatisticsOrderDetailsStatisticsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/mall/statistics/orderDetailsStatistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultOrderVO>,
  /**
   * No description
   * @name GET /admin/mall/statistics/statisticsInfo
   * @summary 获取今日统计信息
   * @tags admin/首页统计
   * @response `200` `JsonResultStatisticsCountOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/statistics/statisticsInfo_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/statistics/statisticsInfo`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultStatisticsCountOutputDto>,
  /**
   * No description
   * @name GET /admin/operate/logs
   * @summary 操作日志查询
   * @tags admin/操作日志
   * @response `200` `JsonResultPagedResultOperateLogsDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/operate/logs_GET": (query: AdminOperateLogsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/operate/logs`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultOperateLogsDto>,
  /**
   * No description
   * @name GET /admin/operate/logs/export
   * @summary 导出日志
   * @tags admin/操作日志
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/operate/logs/export_GET": (query: AdminOperateLogsExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/operate/logs/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name GET /admin/operate/logs/operateTypeEnums
   * @summary 操作类型枚举值列表
   * @tags admin/操作日志
   * @response `200` `JsonResultListString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/operate/logs/operateTypeEnums_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/operate/logs/operateTypeEnums`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListString>,
  /**
   * No description
   * @name GET /admin/cache
   * @summary 获取缓存内容
   * @tags admin/缓存管理
   * @response `200` `JsonResultString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/cache_GET": (query: AdminCacheGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/cache`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /admin/orders/list
   * @summary 订单列表和积分订单列表
   * @tags admin/订单
   * @response `200` `JsonResultPagedResultOrderVO` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/orders/list_GET": (query: AdminOrdersListGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/orders/list`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultOrderVO>,
  /**
   * No description
   * @name GET /admin/livePage
   * @summary 列表
   * @tags admin/直播页面
   * @response `200` `JsonResultPagedResultLivePage` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/livePage_GET": (query: AdminLivePageGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/livePage`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultLivePage>,
  /**
   * No description
   * @name POST /admin/livePage
   * @summary 新增
   * @tags admin/直播页面
   * @response `200` `JsonResultLong` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/livePage_POST": (body: LivePageInsert, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/livePage`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultLong>,
  /**
   * No description
   * @name PUT /admin/livePage/{id}
   * @summary 编辑
   * @tags admin/直播页面
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/livePage/{id}_PUT": (id: number, body: LivePageUpdate, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/livePage/${id}`,
      method: "PUT",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name DELETE /admin/livePage/{id}
   * @summary 删除
   * @tags admin/直播页面
   * @response `200` `JsonResultVoid` OK |  `204` `CharSequence2` No Content |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden
   */
  "/admin/livePage/{id}_DELETE": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/livePage/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name GET /admin/livePage/{id}
   * @summary 详情
   * @tags admin/直播页面
   * @response `200` `JsonResultLivePage` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/livePage/{id}_GET": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/livePage/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultLivePage>,
  /**
   * No description
   * @name GET /admin/live/statistics
   * @summary 列表
   * @tags admin/直播统计
   * @response `200` `JsonResultPagedResultLiveStatistics` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live/statistics_GET": (query: AdminLiveStatisticsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live/statistics`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultLiveStatistics>,
  /**
   * No description
   * @name GET /admin/live
   * @summary 查询根据id集合
   * @tags admin/直播
   * @response `200` `JsonResultListLive` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live_GET": (query: AdminLiveGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultListLive>,
  /**
   * No description
   * @name GET /admin/live/{id}
   * @summary 查询根据id
   * @tags admin/直播
   * @response `200` `JsonResultLive` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultLive>,
  /**
   * No description
   * @name GET /admin/live/statistics/export
   * @summary 导出
   * @tags admin/直播统计
   * @response `200` `CharSequence2` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live/statistics/export_GET": (query: AdminLiveStatisticsExportGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live/statistics/export`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<CharSequence2>,
  /**
   * No description
   * @name POST /admin/comments/upload
   * @summary 上传评价
   * @tags admin/商品评价
   * @response `200` `JsonResultVoid` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/comments/upload_POST": (data: { file?: File }, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/comments/upload`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name POST /admin/live/update
   * @summary 直播修改回调
   * @tags admin/直播
   * @response `200` `JsonResultObject` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live/update_POST": (body: LiveUpdateVolcengineVo, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live/update`,
      method: "POST",
      data: body,
      ...options
    }) as unknown as Promise<JsonResultObject>,
  /**
   * No description
   * @name GET /admin/live/update
   * @summary 直播修改回调
   * @tags admin/直播
   * @response `200` `JsonResultObject` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/live/update_GET": (query: AdminLiveUpdateGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/live/update`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultObject>,
  /**
   * No description
   * @name POST /admin/api/qrCode/generateUrlLink
   * @summary 生成 url link
   * @tags admin/小程序码
   * @response `200` `JsonResultString` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/qrCode/generateUrlLink_POST": (
    query: AdminApiQrCodeGenerateUrlLinkPostParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/admin/api/qrCode/generateUrlLink`,
      method: "POST",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultString>,
  /**
   * No description
   * @name GET /admin/mall/banner/queryList/{position}
   * @summary 根据显示位置查询 banner 列表
   * @tags admin/Banner
   * @response `200` `JsonResultListBannerPositionOutputDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/banner/queryList/{position}_GET": (position: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/banner/queryList/${position}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListBannerPositionOutputDto>,
  /**
   * No description
   * @name GET /admin/api/enum
   * @summary 获取所有枚举配置
   * @tags admin/枚举
   * @response `200` `JsonResultMapStringListPublicKeyValueDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/enum_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/enum`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapStringListPublicKeyValueDto>,
  /**
   * No description
   * @name GET /admin/api/enum/types
   * @summary 获取所有枚举配置类型名称
   * @tags admin/枚举
   * @response `200` `JsonResultListString` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/enum/types_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/enum/types`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultListString>,
  /**
   * No description
   * @name GET /admin/api/enum/{type}
   * @summary 根据枚举配置类型名称获取枚举信息
   * @tags admin/枚举
   * @response `200` `JsonResultListPublicKeyValueDto` OK |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/api/enum/{type}_GET": (type: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/api/enum/${type}`,
      method: "GET",
      ...options
    }) as unknown as Promise<JsonResultListPublicKeyValueDto>,
  /**
   * No description
   * @name POST /admin/mall/express/callback
   * @summary updateExpressTrack
   * @tags admin/快递回调
   * @response `200` `KdniaoExpressCallbackResponseDto` OK |  `201` `CharSequence2` Created |  `401` `CharSequence2` Unauthorized |  `403` `CharSequence2` Forbidden |  `404` `CharSequence2` Not Found
   */
  "/admin/mall/express/callback_POST": (query: AdminMallExpressCallbackPostParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/admin/mall/express/callback`,
      method: "POST",
      params: query,
      ...options
    }) as unknown as Promise<KdniaoExpressCallbackResponseDto>
};
