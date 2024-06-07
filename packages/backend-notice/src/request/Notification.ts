import {
  JsonResultInt,
  JsonResultMapStringListString,
  JsonResultPagedResultStationMessageOutputDto,
  JsonResultVoid,
  NotificationApiStationMessageQueryGetParams,
  NotificationApiStationMessageQueryUnReadGetParams,
  StationMessagePublishInputDto
} from "./data-contracts";

import { IRequestConfig } from "@wmeimob/request/src/types/fetch-type";
import requestInstance from "./instance";

type RequestConfig = Omit<IRequestConfig, "url" | "method">;

export const API = {
  /**
   * No description
   * @name GET /notification/api/stationMessage/getUnReadTotal
   * @summary 获取未读消息总数
   * @tags 站内消息
   * @response `200` `JsonResultInt` OK |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/getUnReadTotal_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/notification/api/stationMessage/getUnReadTotal`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultInt>,
  /**
   * No description
   * @name POST /notification/api/stationMessage/publish
   * @summary 发布消息
   * @tags 站内消息
   * @response `200` `JsonResultVoid` OK |  `201` `object` Created |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/publish_POST": (data: StationMessagePublishInputDto, options: RequestConfig = {}) =>
    requestInstance({
      url: `/notification/api/stationMessage/publish`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /notification/api/stationMessage/read/{id}
   * @summary 某个消息已读
   * @tags 站内消息
   * @response `200` `JsonResultVoid` OK |  `201` `object` Created |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/read/{id}_PUT": (id: number, options: RequestConfig = {}) =>
    requestInstance({
      url: `/notification/api/stationMessage/read/${id}`,
      method: "PUT",
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * No description
   * @name PUT /notification/api/stationMessage/readAll
   * @summary 一键已读全部消息
   * @tags 站内消息
   * @response `200` `JsonResultVoid` OK |  `201` `object` Created |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/readAll_PUT": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/notification/api/stationMessage/readAll`,
      method: "PUT",
      params,
      ...options
    }) as unknown as Promise<JsonResultVoid>,
  /**
   * @description 退出
   * @name POST /notification/logout
   * @summary 退出
   * @tags 退出
   * @response `200` `object` OK
   */
  "/notification/logout_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/notification/logout`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<object>,
  /**
   * No description
   * @name GET /notification/api/stationMessage/query
   * @summary 获取消息列表
   * @tags 站内消息
   * @response `200` `JsonResultPagedResultStationMessageOutputDto` OK |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/query_GET": (
    query: NotificationApiStationMessageQueryGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/notification/api/stationMessage/query`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultStationMessageOutputDto>,
  /**
   * No description
   * @name GET /notification/api/stationMessage/getEventSources
   * @summary 获取订阅事件源列表
   * @tags 站内消息
   * @response `200` `JsonResultMapStringListString` OK |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/getEventSources_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/notification/api/stationMessage/getEventSources`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<JsonResultMapStringListString>,
  /**
   * No description
   * @name GET /notification/api/stationMessage/queryUnRead
   * @summary 获取未读消息列表
   * @tags 站内消息
   * @response `200` `JsonResultPagedResultStationMessageOutputDto` OK |  `401` `object` Unauthorized |  `403` `object` Forbidden |  `404` `object` Not Found
   */
  "/notification/api/stationMessage/queryUnRead_GET": (
    query: NotificationApiStationMessageQueryUnReadGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/notification/api/stationMessage/queryUnRead`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<JsonResultPagedResultStationMessageOutputDto>
};
