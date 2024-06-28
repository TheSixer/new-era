-- 全量创建accessCode
--  ⚠️注意:
--    库与表名需要替换为实际库表
USE `framework_admin_dev`;
-- 创建备份 在执行此sql前备份备份原数据表
CREATE TABLE `sys_resource_1718691854746` SELECT * FROM `sys_resource`;
-- 清空原数据表
TRUNCATE `sys_resource`;
-- 插入新数据
INSERT INTO `sys_resource` (
	`id`,
	`code`,
	`type`,
	`title`,
	`path`,
	`method`,
	`memo`,
	`icon`,
	`sort_num`,
	`visible`,
	`parent_id`,
	`gmt_created`,
	`gmt_modified`,
	`create_user`,
	`modify_user`,
	`status`,
	`deleted`
)
VALUES
(1,'basicSetting',0,'基础设置',NULL,NULL,'','',0,1,0,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(2,'basicSetting-materialLibrary',0,'素材库',NULL,NULL,'','',0,1,1,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(3,'customerManagement',0,'用户管理',NULL,NULL,'','',0,1,0,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(4,'customerManagement-list',0,'用户列表',NULL,NULL,'','',0,1,3,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(5,'customerManagement-detail',0,'用户详情',NULL,NULL,'','',0,1,3,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(6,'customerManagement-tags',0,'标签管理',NULL,NULL,'','',0,1,3,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(7,'customerManagement-checkUser',0,'活动核销人员',NULL,NULL,'','',0,1,3,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(8,'decorationSetting',0,'自定义页面',NULL,NULL,'','',0,1,0,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(9,'decorationSetting-decorationList',0,'页面管理',NULL,NULL,'','',0,1,8,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(10,'decorationSetting-decorationList-detail',0,'页面详情',NULL,NULL,'','',0,1,8,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(11,'decorationSetting-homePageSetting',0,'首页配置',NULL,NULL,'','',0,1,8,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(12,'eventsManagement',0,'活动管理',NULL,NULL,'','',0,1,0,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(13,'eventsManagement-eventTypes',0,'活动类型',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(14,'eventsManagement-events',0,'活动列表',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(15,'eventsManagement-events-create',0,'活动管理新增编辑',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(16,'eventsManagement-activityOrders',0,'报名列表',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(17,'eventsManagement-seatSettings',0,'座位设置',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(18,'eventsManagement-whiteList',0,'白名单',NULL,NULL,'','',0,1,12,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(19,'sysSetting',0,'系统设置',NULL,NULL,'','',0,1,0,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(20,'sysSetting-initScreen',0,'首屏设置',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(21,'sysSetting-setting',0,'协议设置',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(22,'sysSetting-setting-agreementLogs',0,'用户协议记录',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(23,'sysSetting-setting-privacyLogs',0,'隐私政策记录',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(24,'sysSetting-employeeManagement',0,'人员管理',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(25,'sysSetting-roleManagement',0,'角色管理',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0),
(26,'sysSetting-operationLog',0,'操作日志',NULL,NULL,'','',0,1,19,'2024-06-18 14:24:14','2024-06-18 14:24:14','admin',NULL,1,0)