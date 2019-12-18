/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : xoso_admin

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 16/12/2019 00:14:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_action_confirm
-- ----------------------------
DROP TABLE IF EXISTS `tbl_action_confirm`;
CREATE TABLE `tbl_action_confirm`  (
  `id_action` int(11) NOT NULL AUTO_INCREMENT,
  `action_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `button` json,
  `created_date` datetime(0) DEFAULT NULL,
  `modified_date` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id_action`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_action_confirm
-- ----------------------------
INSERT INTO `tbl_action_confirm` VALUES (78, 'Yes no', 'Confirm!', 'Confirm', 'hoaipv2', '[{\"name\": \"Yes\", \"value\": \"Yes\"}, {\"name\": \"No\", \"value\": \"No\"}]', '2019-10-30 16:27:21', NULL);

-- ----------------------------
-- Table structure for tbl_group
-- ----------------------------
DROP TABLE IF EXISTS `tbl_group`;
CREATE TABLE `tbl_group`  (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_date` datetime(0) DEFAULT NULL,
  `modified_date` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE,
  UNIQUE INDEX `group_id_UNIQUE`(`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_group
-- ----------------------------
INSERT INTO `tbl_group` VALUES (1, 'Administrator', NULL, 1, '2019-10-03 10:48:47', '2019-10-07 14:34:26');
INSERT INTO `tbl_group` VALUES (2, 'Guest', NULL, 1, '2019-10-03 11:16:26', '2019-10-07 14:03:58');

-- ----------------------------
-- Table structure for tbl_group_menu_rel
-- ----------------------------
DROP TABLE IF EXISTS `tbl_group_menu_rel`;
CREATE TABLE `tbl_group_menu_rel`  (
  `id_group_menu_rel` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_group_menu_rel`) USING BTREE,
  UNIQUE INDEX `id_group_menu_rel_UNIQUE`(`id_group_menu_rel`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_group_menu_rel
-- ----------------------------
INSERT INTO `tbl_group_menu_rel` VALUES (10, 1, 2);
INSERT INTO `tbl_group_menu_rel` VALUES (11, 1, 3);
INSERT INTO `tbl_group_menu_rel` VALUES (12, 1, 5);
INSERT INTO `tbl_group_menu_rel` VALUES (13, 1, 6);
INSERT INTO `tbl_group_menu_rel` VALUES (15, 1, 9);
INSERT INTO `tbl_group_menu_rel` VALUES (16, 1, 11);
INSERT INTO `tbl_group_menu_rel` VALUES (17, 1, 12);
INSERT INTO `tbl_group_menu_rel` VALUES (18, 1, 13);
INSERT INTO `tbl_group_menu_rel` VALUES (19, 1, 14);
INSERT INTO `tbl_group_menu_rel` VALUES (20, 1, 47);
INSERT INTO `tbl_group_menu_rel` VALUES (21, 1, 49);
INSERT INTO `tbl_group_menu_rel` VALUES (22, 1, 50);
INSERT INTO `tbl_group_menu_rel` VALUES (23, 1, 51);
INSERT INTO `tbl_group_menu_rel` VALUES (24, 1, 53);
INSERT INTO `tbl_group_menu_rel` VALUES (40, 2, 2);
INSERT INTO `tbl_group_menu_rel` VALUES (43, 2, 3);
INSERT INTO `tbl_group_menu_rel` VALUES (44, 2, 1);
INSERT INTO `tbl_group_menu_rel` VALUES (45, 2, 7);
INSERT INTO `tbl_group_menu_rel` VALUES (47, 2, 9);
INSERT INTO `tbl_group_menu_rel` VALUES (48, 2, 11);
INSERT INTO `tbl_group_menu_rel` VALUES (51, 2, 51);
INSERT INTO `tbl_group_menu_rel` VALUES (52, 2, 47);
INSERT INTO `tbl_group_menu_rel` VALUES (53, 2, 50);
INSERT INTO `tbl_group_menu_rel` VALUES (56, 1, 1);
INSERT INTO `tbl_group_menu_rel` VALUES (57, 1, 7);
INSERT INTO `tbl_group_menu_rel` VALUES (58, 1, 55);
INSERT INTO `tbl_group_menu_rel` VALUES (60, 2, 55);
INSERT INTO `tbl_group_menu_rel` VALUES (62, 1, 57);
INSERT INTO `tbl_group_menu_rel` VALUES (63, 1, 58);
INSERT INTO `tbl_group_menu_rel` VALUES (64, 1, 59);
INSERT INTO `tbl_group_menu_rel` VALUES (65, 1, 60);
INSERT INTO `tbl_group_menu_rel` VALUES (66, 1, 61);

-- ----------------------------
-- Table structure for tbl_group_user_rel
-- ----------------------------
DROP TABLE IF EXISTS `tbl_group_user_rel`;
CREATE TABLE `tbl_group_user_rel`  (
  `id_group_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_group` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_group_user`) USING BTREE,
  UNIQUE INDEX `id_group_user_UNIQUE`(`id_group_user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_group_user_rel
-- ----------------------------
INSERT INTO `tbl_group_user_rel` VALUES (39, 2, 1);
INSERT INTO `tbl_group_user_rel` VALUES (41, 1, 2);
INSERT INTO `tbl_group_user_rel` VALUES (47, 1363, 2);
INSERT INTO `tbl_group_user_rel` VALUES (48, 1368, 1);

-- ----------------------------
-- Table structure for tbl_location
-- ----------------------------
DROP TABLE IF EXISTS `tbl_location`;
CREATE TABLE `tbl_location`  (
  `lottery_location_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`lottery_location_id`) USING BTREE,
  UNIQUE INDEX `tbl_lottery_location_name_uindex`(`name`) USING BTREE,
  UNIQUE INDEX `tbl_lottery_location_lottery_location_id_uindex`(`lottery_location_id`) USING BTREE,
  INDEX `code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_location
-- ----------------------------
INSERT INTO `tbl_location` VALUES (1, 'Xổ số miền Bắc', 'MB', 1);
INSERT INTO `tbl_location` VALUES (2, 'Xổ số miền Trung', 'MT', 1);
INSERT INTO `tbl_location` VALUES (3, 'Xổ số miền Nam', 'MN', 1);

-- ----------------------------
-- Table structure for tbl_menu
-- ----------------------------
DROP TABLE IF EXISTS `tbl_menu`;
CREATE TABLE `tbl_menu`  (
  `idtbl_menu` int(11) NOT NULL AUTO_INCREMENT,
  `href` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `label` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `icon` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`idtbl_menu`) USING BTREE,
  UNIQUE INDEX `idtbl_menu_UNIQUE`(`idtbl_menu`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_menu
-- ----------------------------
INSERT INTO `tbl_menu` VALUES (1, '/', 'Danh mục', 'fa-th-large', NULL, 1);
INSERT INTO `tbl_menu` VALUES (5, '#', 'Báo cáo', 'fa-area-chart', NULL, 2);
INSERT INTO `tbl_menu` VALUES (6, '#', 'Admin', 'fa-users', NULL, 3);
INSERT INTO `tbl_menu` VALUES (12, '/admin/user', 'Users', NULL, 6, 1);
INSERT INTO `tbl_menu` VALUES (13, '/admin/group', 'Groups', NULL, 6, 2);
INSERT INTO `tbl_menu` VALUES (14, '/admin/menu', 'Menus', NULL, 6, 3);
INSERT INTO `tbl_menu` VALUES (49, '/admin/group-users', 'Group User', '', 6, 4);
INSERT INTO `tbl_menu` VALUES (53, '/admin/group-menu', 'Group Menu', '', 6, 5);
INSERT INTO `tbl_menu` VALUES (60, '/categories/province', 'Tỉnh/TP', NULL, 1, 1);
INSERT INTO `tbl_menu` VALUES (61, '/categories/lottery', 'Xổ số', '', 1, 2);

-- ----------------------------
-- Table structure for tbl_province
-- ----------------------------
DROP TABLE IF EXISTS `tbl_province`;
CREATE TABLE `tbl_province`  (
  `provinceId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDate` datetime(0) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updatedDate` datetime(0) DEFAULT NULL,
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`provinceId`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE,
  INDEX `location`(`location`) USING BTREE,
  CONSTRAINT `tbl_province_ibfk_1` FOREIGN KEY (`location`) REFERENCES `tbl_location` (`code`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_province
-- ----------------------------
INSERT INTO `tbl_province` VALUES (1, 'Thủ Đô', 'MB_TD', 'MB', 1, '2019-12-11 15:23:56', '2', NULL, NULL);
INSERT INTO `tbl_province` VALUES (2, 'Quảng Ninh', 'MB_QN', 'MB', 1, '2019-12-11 15:24:59', '2', '2019-12-11 16:25:36', '2');
INSERT INTO `tbl_province` VALUES (3, 'Thái Bình', 'MB_TB', 'MB', 1, '2019-12-11 16:22:36', '2', NULL, NULL);
INSERT INTO `tbl_province` VALUES (4, 'Nam Định', 'MB_ND', 'MB', 1, '2019-12-11 16:23:21', '2', NULL, NULL);
INSERT INTO `tbl_province` VALUES (5, 'Hải Phòng', 'MB_HP', 'MB', 1, '2019-12-11 16:25:18', '2', NULL, NULL);
INSERT INTO `tbl_province` VALUES (6, 'Hồ Chí Minh', 'MN_HCM', 'MN', 1, '2019-12-15 11:04:50', 'other@gmail.com', NULL, NULL);
INSERT INTO `tbl_province` VALUES (18, 'Vĩnh Long', 'MN_VL', 'MN', 1, '2019-12-15 11:44:04', 'other@gmail.com', NULL, NULL);

-- ----------------------------
-- Table structure for tbl_result
-- ----------------------------
DROP TABLE IF EXISTS `tbl_result`;
CREATE TABLE `tbl_result`  (
  `resultId` int(11) NOT NULL AUTO_INCREMENT,
  `special` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `first` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `second` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `third` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fourth` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fifth` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sixth` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `seventh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `eighth` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `symbol` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdDate` datetime(0) NOT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updatedDate` datetime(0) DEFAULT NULL,
  `updatedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`resultId`) USING BTREE,
  INDEX `lotteryTypeCode`(`province`) USING BTREE,
  CONSTRAINT `tbl_result_ibfk_1` FOREIGN KEY (`province`) REFERENCES `tbl_province` (`code`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mobile` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `department` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `avatar` varchar(155) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_user` int(11) DEFAULT NULL,
  `created_date` datetime(0) DEFAULT NULL,
  `modified_user` int(11) DEFAULT NULL,
  `modified_date` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `user_id_UNIQUE`(`user_id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username`) USING BTREE,
  UNIQUE INDEX `email_UNIQUE`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1369 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES (1, 'thichpv', '1f4f212b8487b06145a248adee685c69', 'I\'m Like', 'pvthich1992@gmail.com', '0979151501', 'Other', 1, '/upload/avatar/photo-1-1568939343736142554628-6647-7476-1568953795_1574323393928.jpg', 2, '2019-11-08 09:54:38', 1, '2019-11-21 15:04:04');
INSERT INTO `tbl_user` VALUES (2, 'admin', '1f4f212b8487b06145a248adee685c69', 'Administrator', 'other@gmail.com', '0979151501', 'Other', 1, '/upload/avatar/nguoi_mau_da_mau_4__oezo_1574323751084.jpg', 2, '2019-11-08 09:54:38', 2, '2019-11-21 15:36:39');
INSERT INTO `tbl_user` VALUES (1363, 'guest', 'c030437f6e8e94d244bc602606df5235', 'Guest', '', '', 'Other', 1, '/upload/avatar/sap-het-nam-2019-he-lo-3-con-giap-hot-duoc-so-tien-lon-tha-ho-sam-tet_1575473753069.jpeg', 2, '2019-12-04 22:35:53', NULL, NULL);
INSERT INTO `tbl_user` VALUES (1368, 'xoso', '1f4f212b8487b06145a248adee685c69', 'Xo So', 'xoso@gmail.com', '', 'Other', 1, '/upload/avatar/201912081222508121-c37e689d-2823-4c85-8bc5-ec7c86ae7abf_1575886396280.jpeg', 2, '2019-12-09 17:13:16', NULL, NULL);

-- ----------------------------
-- Procedure structure for sp_findMenusByUser
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_findMenusByUser`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_findMenusByUser`(IN user_id INT(11))
BEGIN
	SELECT * FROM xoso_admin.tbl_group_menu_rel m WHERE m.group_id IN (
	SELECT u.id_group FROM xoso_admin.tbl_group_user_rel u
    WHERE u.id_user = user_id
);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_findMenusByUser2
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_findMenusByUser2`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_findMenusByUser2`(IN user_id INT(11))
BEGIN
	SELECT * FROM xoso_admin.tbl_menu m
	WHERE m.idtbl_menu IN (
		SELECT ml.menu_id FROM xoso_admin.tbl_group_user_rel ul 
		LEFT JOIN xoso_admin.tbl_group_menu_rel ml ON ul.id_group = ml.group_id
		WHERE ul.id_user = user_id
    )
	UNION (
		SELECT m2.* FROM xoso_admin.tbl_menu m2
		WHERE m2.idtbl_menu IN(
		SELECT m.parent_id FROM xoso_admin.tbl_menu m
		WHERE m.idtbl_menu IN (
			SELECT ml.menu_id FROM xoso_admin.tbl_group_user_rel ul 
			LEFT JOIN xoso_admin.tbl_group_menu_rel ml ON ul.id_group = ml.group_id
			WHERE ul.id_user = user_id
        ))
	);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
