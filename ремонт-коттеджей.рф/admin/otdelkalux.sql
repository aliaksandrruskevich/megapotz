-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Сен 06 2012 г., 21:43
-- Версия сервера: 5.0.26
-- Версия PHP: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- База данных: `com2dcms_test2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `arc_roles`
--

DROP TABLE IF EXISTS `arc_roles`;
CREATE TABLE `arc_roles` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  `description` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `arc_roles`
--

INSERT INTO `arc_roles` (`id`, `name`, `description`) VALUES
(1, 'администратор', NULL),
(2, 'редактор', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `objects`
--

DROP TABLE IF EXISTS `objects`;
CREATE TABLE `objects` (
  `id` int(11) NOT NULL auto_increment,
  `type` int(11) default NULL,
  `template` varchar(255) default NULL,
  `sort` int(11) default NULL,
  `status` int(11) default NULL,
  `link` varchar(255) default NULL,
  `seo_status` int(11) default NULL,
  `user_id` int(11) default NULL,
  `date` timestamp NULL default NULL,
  `date_of_add` timestamp NULL default NULL,
  `last_modified` timestamp NULL default NULL,
  `description` text,
  `title` text,
  `seo_title` text,
  `seo_keywords` text,
  `seo_description` text,
  `show_in_main` tinyint(1) NOT NULL default '0',
  `work_date` varchar(255) default NULL,
  `lat` varchar(50) default NULL,
  `lng` varchar(50) default NULL,
  `cost` varchar(50) default NULL,
  `repair_class` int(11) default NULL,
  `image` varchar(255) default NULL,
  `picasa_album_id` varchar(255) default NULL,
  `picasa_user_id` varchar(255) default NULL,
  `area` varchar(50) default NULL,
  PRIMARY KEY  (`id`),
  KEY `objects_fk_1` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `objects`
--

INSERT INTO `objects` (`id`, `type`, `template`, `sort`, `status`, `link`, `seo_status`, `user_id`, `date`, `date_of_add`, `last_modified`, `description`, `title`, `seo_title`, `seo_keywords`, `seo_description`, `show_in_main`, `work_date`, `lat`, `lng`, `cost`, `repair_class`, `image`, `picasa_album_id`, `picasa_user_id`, `area`) VALUES
(1, 1, NULL, 1, 0, 'asdasdasd', NULL, 1, '2012-08-30 00:00:00', NULL, NULL, '<p>&nbsp;выа выфавыфа вы авфыа фыва ыфва фывафыва ывфа выфафы</p>', 'супер квартира', 'пи вапивапривап', ' вапывпывап ывап ывап вап ыв', 'ап ывап выапывап ывапыв', 0, '21 января', '55.862879', '37.009303', '231412', 1, 'https://lh5.googleusercontent.com/-u0CvAjW8bmk/UAhAWCy8fkI/AAAAAAAABFA/SCm7GS25k1I/s50-c/', '', '', ''),
(2, 0, NULL, 2, 0, 'dominanta', NULL, 1, '2012-08-10 00:00:00', NULL, NULL, '', 'Ремонт квартиры в ЖК «Доминанта» (1)', 'Ремонт квартиры в ЖК «Доминанта» (1)', 'ремонт, квартира, отделка, люкс', '', 1, 'c 25 января до 31 декабря', '', '', '3000', 2, 'https://lh5.googleusercontent.com/-u0CvAjW8bmk/UAhAWCy8fkI/AAAAAAAABFA/SCm7GS25k1I/s50-c/', '5766943203098445761', '104094916837036848285', '230'),
(3, 0, NULL, 1, 0, 'tarasovka', NULL, 1, '2012-08-31 00:00:00', NULL, NULL, '<p>Квартира находится на станции Щукинская в ЖК &quot;Доминанта&quot;.  Все черновые работы проводились с нуля, потому что в новостройке никакого ремонта при строительстве предусмотрено не было.  Перечень работ: установка перегородок, прокладка электрических проводов, сантехнических труб, штукатурка стен, заливка стяжки пола, гипсокартонные потолки, чистовая отделка, установка электрооборудования, установка сантехники, ну и конечно же запуск квартиры в эксплуатацию.  Заказчик остался доволен и, сразу после завержшения работ, доверил нам ремонт загородного дома на Истре.</p>', 'Ремонт коттеджа в посёлке Тарасовка', '', '', '', 1, '25 сентября', '', '', '12000', 2, 'https://lh5.googleusercontent.com/-u0CvAjW8bmk/UAhAWCy8fkI/AAAAAAAABFA/SCm7GS25k1I/s50-c/', '5766938084948272737', '104094916837036848285', '400'),
(4, 0, NULL, 3, 0, 'greenhell', NULL, 1, '2012-09-03 00:00:00', NULL, NULL, '', 'Отделка коттеджа №14 в посёлке Грин Хилл', '', '', '', 0, 'c 25 января до 31 декабря', '', '', '9000', 2, '', '5766936139597069073', '104094916837036848285', '400'),
(5, 2, NULL, NULL, 0, 'linker', NULL, 1, '2012-09-03 00:00:00', NULL, NULL, '<p>&nbsp;сделано на 500%</p>', 'Недоделанная', '', '', '', 0, '', '55.895301', '37.064235', '', 1, 'https://lh5.googleusercontent.com/-u0CvAjW8bmk/UAhAWCy8fkI/AAAAAAAABFA/SCm7GS25k1I/s50-c/', '', '', ''),
(6, 0, NULL, NULL, 0, 'dominanta2', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Ремонт квартиры в ЖК «Доминанта» (2)', 'Ремонт квартиры в ЖК «Доминанта» (2)', 'ремонт квартиры в жк', '', 1, '21 окьября по 2 января', '', '', '5000', 2, '', '5766932655454739361', '104094916837036848285', '200'),
(7, 0, NULL, NULL, 0, 'leningradskoe_37_build', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Строительство загородного дома в Шереметьево', 'Строительство загородного дома в Шереметьево', '', '', 0, '', '', '', '', NULL, '', '5766924534629363441', '104094916837036848285', ''),
(8, 0, NULL, NULL, 0, 'green_hill_14_land', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Ландшафтные работы на участке №14 в посёлке Грин Хилл', 'Ландшафтные работы на участке №14 в посёлке Грин Хилл', '', '', 1, '', '', '', '1000', NULL, '', '5766922949500318545', '104094916837036848285', '500'),
(9, 0, NULL, NULL, 0, 'green_hill_104_land', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Ландшафтные работы в посёлке Грин Хилл 104', 'Ландшафтные работы в посёлке Грин Хилл 104', '', '', 0, '', '', '', '', NULL, '', '5766919886223166529', '104094916837036848285', ''),
(10, 0, NULL, NULL, 0, 'leningradskoe_37_land', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Ландшафтные работы на усадьбе в Шереметьево', 'Ландшафтные работы на усадьбе в Шереметьево', '', '', 1, '', '', '', '', NULL, '', '5766917242451191313', '104094916837036848285', ''),
(11, 0, NULL, NULL, 0, 'leningradskoe_37', NULL, 1, '2012-09-04 00:00:00', NULL, NULL, '', 'Отделка загородного дома в Шереметьево', 'Отделка загородного дома в Шереметьево', '', '', 0, '', '', '', '', 2, '', '5766929955163945713', '104094916837036848285', '700');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `reg_date` bigint(20) default NULL,
  `last_login_date` bigint(20) default NULL,
  `name` varchar(255) default NULL,
  `login` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `blocked` tinyint(1) NOT NULL default '0',
  `role_id` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `users_fk_1` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `reg_date`, `last_login_date`, `name`, `login`, `password`, `email`, `blocked`, `role_id`) VALUES
(1, NULL, 2012, 'admin', 'admin', '111111', 'admin@gmail.com', 0, 1);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_fk_1` FOREIGN KEY (`role_id`) REFERENCES `arc_roles` (`id`);
