/*
 Navicat Premium Data Transfer

 Source Server         : lgfWeb
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : ant-simple-pro

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 23/11/2020 17:43:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for a_user
-- ----------------------------
DROP TABLE IF EXISTS `a_user`;
CREATE TABLE `a_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of a_user
-- ----------------------------
INSERT INTO `a_user` VALUES (1, 'lgf', '枫叶', '123456');
INSERT INTO `a_user` VALUES (2, 'zhouhao', '周浩', '123456');
INSERT INTO `a_user` VALUES (3, 'pika', '皮卡皮卡', '123456');
INSERT INTO `a_user` VALUES (4, 'kaka', '咔咔', '123456');

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `icon` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `url` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pid` int(11) NOT NULL DEFAULT 0,
  `createTime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 83 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES (18, '系统管理', 'system', '/system', 0, '2020-08-10 16:20:46');
INSERT INTO `access` VALUES (19, '菜单管理', '', '/system/menu', 18, '2020-08-10 16:20:56');
INSERT INTO `access` VALUES (20, '组件管理', 'component', '/component', 0, '2020-08-06 18:00:56');
INSERT INTO `access` VALUES (22, '常用组件', NULL, '/component/everUse', 20, '2020-07-20 10:59:24');
INSERT INTO `access` VALUES (24, '用户管理', 'user', '/userManage', 0, '2020-08-26 14:11:04');
INSERT INTO `access` VALUES (26, '图表组件', 'chart', '/component/chart', 20, '2020-09-02 10:28:27');
INSERT INTO `access` VALUES (27, '表单组件', NULL, '/component/form', 20, '2020-09-28 16:52:40');
INSERT INTO `access` VALUES (28, 'table组件', NULL, '/component/table', 20, '2020-09-30 10:14:29');
INSERT INTO `access` VALUES (29, '国际化', 'globalization', '/globalization', 0, '2020-11-05 15:04:10');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `introduct` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `iconUrl` varchar(200) CHARACTER SET tis620 COLLATE tis620_thai_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (16, 'lgf@163.com', '123456', '珍珍', '一只特立独行的猫 ', 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1605845717285.png');
INSERT INTO `user` VALUES (17, 'zh@163.com', '123456', '耗子', 'IT', 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600420013243.jpg');
INSERT INTO `user` VALUES (19, 'qyh@163.com', '123456', '豪子', 'IT', 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600768369105.jpg');

SET FOREIGN_KEY_CHECKS = 1;
