<?php
/**
 * Основные параметры WordPress.
 *
 * Этот файл содержит следующие параметры: настройки MySQL, префикс таблиц,
 * секретные ключи, язык WordPress и ABSPATH. Дополнительную информацию можно найти
 * на странице {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Кодекса. Настройки MySQL можно узнать у хостинг-провайдера.
 *
 * Этот файл используется сценарием создания wp-config.php в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать этот файл
 * с именем "wp-config.php" и заполнить значения.
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'u221902_2');

/** Имя пользователя MySQL */
define('DB_USER', 'u221902');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'so5fte2etr');

/** Имя сервера MySQL */
define('DB_HOST', 'u221902.mysql.masterhost.ru');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется снова авторизоваться.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '_Zv8]nw}/Np8Olb8});*(kZ6#4v3g0S8CB7.K$|+L+uB){A<O>vN-Lo4E_Yc?)5H');
define('SECURE_AUTH_KEY',  'x4E3E$|8!|sN-]Gu`2KVUbs.{]dQ%lZ9#Uil-YR7lv AI?_O{-B  mXmU/Km(cL0');
define('LOGGED_IN_KEY',    '.h}@@V,U@spblo^a2<n_ tGscGr+q-w|-7491}}IM)=4T<)-l,PuC?)cC&`us-)S');
define('NONCE_KEY',        '}hSr.|YbCXK&JLgRJCy8WI,^oRU#0vt00c(- |X+@VOSKl,LOx+-U;!nRTsIE`hC');
define('AUTH_SALT',        '%%L9#qOd]d/Euj|;t-j-d;>-4Wj]Z-eNfU[u;x?LJTIfzQ>>@l]h5Z%0L 4h_9fY');
define('SECURE_AUTH_SALT', '(_!?2|h=CMi#Ct%W|o).$qnbo}1}{x&F|AAr-FAk{u:K4kqS/ZBa[5 y-6yB$R)q');
define('LOGGED_IN_SALT',   '0}m0E7_L0#m|WL};6pR@~V[c_sBO8.-S7ts2pqPInlm[7f2?;I4%aW}Yp&m;j}VN');
define('NONCE_SALT',       'I{1bO--|/r,DQ^JF$Jrv}-A=M+M4ul@o0Uv#C|qG5vk4)zRbG@d?t.&_Yeyx-|80');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько блогов в одну базу данных, если вы будете использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Язык локализации WordPress, по умолчанию английский.
 *
 * Измените этот параметр, чтобы настроить локализацию. Соответствующий MO-файл
 * для выбранного языка должен быть установлен в wp-content/languages. Например,
 * чтобы включить поддержку русского языка, скопируйте ru_RU.mo в wp-content/languages
 * и присвойте WPLANG значение 'ru_RU'.
 */
define('WPLANG', 'ru_RU');

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Настоятельно рекомендуется, чтобы разработчики плагинов и тем использовали WP_DEBUG
 * в своём рабочем окружении.
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
