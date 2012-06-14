#!/usr/bin/perl -w 

use strict;
use CGI ':standard';
use CGI::Carp qw(fatalsToBrowser);
use File::Copy;

#===============================================#
# Section 1:   Reading Parameters               #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     POST::numbers                             #
#                                               #
#  Actions:                                     #
#     1. Reads POST::numbers to array           #
#                                               #
#===============================================#
my $numbers_str = param( 'numbers' );
my @numbers = split /,\s*/, $numbers_str;


#===============================================#
# Section 2:   Database reading                 #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     <no_input>                                #
#                                               #
#  Actions:                                     #
#     1. Reads database in array of arrays.     #
#                                               #
#===============================================#
my @data_array;

{
    use constant HEADER => 1;
    use constant RECORD => 2;

    my $data_type = HEADER;

    open DB_READ, 'main.db' or die &print_error( 'Невозможно открыть базу данных для чтения:', $!, 'Проверьте права доступа к файлу.' );

    while( my $line = <DB_READ> )
    {
        chomp( $line );
        our $reference;

        if ( $line eq '' )
        {
            $data_type = HEADER;
            next;
        }

        if ( $data_type == HEADER )
        {
            push @{ $data_array[@data_array] }, $line;
            $data_type = RECORD;
            next;
        }

        if ( $data_type == RECORD )
        {
            push @{ $data_array[$#data_array] }, $line;
        }

    }

    close DB_READ or die &print_error( 'Невозможно закрыть базу данных:', $!, 'Это, как минимум, удивительно' );
}


#===============================================#
# Section 3:   Removes items from @data_array   #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     1. @data_array                            #
#     2. @numbers                               #
#                                               #
#  Actions:                                     #
#     1. Removes items from @data_array         #
#     2. Makes @check array with IDs of removed items #
#                                               #
#===============================================#
my @check;

{
    open DB_APPEND, '>>../www/removed/removed.txt' or die &print_error( 'Невозможно открыть файл для записи удаляемых данных', $!, 'Проверьте права доступа к файлу removed.txt' );

    for ( my $i = 0; $i <= $#data_array; $i++ )
    {

        for ( my $j = 1; $j <= $#{ $data_array[$i] }; $j++ )
        {
            ( my $num ) = split ( /\|/, ${ $data_array[$i] }[$j], 2 );

            foreach ( 0 .. $#numbers )
            {
                if ( $numbers[$_] eq $num )
                {
                    $numbers[$_] = delete ${ $data_array[$i] }[$j];
                    print DB_APPEND $numbers[$_], "\n";
                    #move "../img/$num.jpg", "../removed/small/$num.jpg";
                    #move "../img/big/$num.jpg", "../removed/big/$num.jpg";
                    $check[$_] = 1;
                    last;
                }
            }

        }

    }

    print DB_APPEND "\n";
    close DB_APPEND or die &print_error( 'Невозможно закрыть файл после записи удаляемых данных', $!, 'Это, как минимум, удивительно' );
}


#===============================================#
# Section 4:   Writing back to database         #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     1. @numbers                               #
#     2. @check                                 #
#                                               #
#  Actions:                                     #
#     1. Outputs the result                     #
#                                               #
#===============================================#
{
    my $status = 1;
    my $accepted_html = '';
    my $failed_html = '';

    foreach ( 0 .. $#numbers )
    {

        if ( $check[$_] == undef )
        {
            $status = 0;
            $failed_html .= "\t\t\t" . '<li class="list"><code>' . $numbers[$_] . '</code></li>' ."\n";
        }
        else
        {
            my ( $id, $title, $desc ) = split ( /\|/, $numbers[$_], 4 );
            $accepted_html .= "\t\t\t" . '<li class="list"><code>' . $id . '</code>: ' . $title . ' (' . $desc . ')</li>' . "\n";
        }

    }
    
    if ( $accepted_html ne '' )
    {
        $accepted_html = join '', "\t\t" . '<li class="title">Успешно удалены:</li>' . "\n\t\t" . '<ul>' . "\n", $accepted_html,  "\t\t" . '</ul>';
    }

    $failed_html = join '', "\t\t" . '<li class="title">Не найдены:</li>' . "\n\t\t" . '<ul>' . "\n", $failed_html, "\t\t" . '</ul>' if ( $status == 0 );

print "Content-type: text/html; charset=windows-1251;\n\n";

print <<"RESULT"
<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">

<head>
	<title>Результат удаления</title>

	<style type="text/css" id="internalStyle">
		ul		{ padding-top: 10px; padding-bottom: 20px; }
		li.title	{ list-style-type: none; font: normal 18pt Verdana; color: darkgreen; }
		li.list		{ list-style-type: square; font: normal 12pt Verdana ! important; color: #000000; }
		code		{ color: #ff0000; }
	</style>

</head>

<body>
	<ul>
$accepted_html
$failed_html
	</ul>
</body>

</html>
RESULT
;
}


#===============================================#
# Section 5:   Writing back to database         #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     1. @data_array                            #
#                                               #
#  Actions:                                     #
#     1. Writes array of arrays back to database#
#                                               #
#===============================================#
{
    open DB_WRITE, '>main.db' or die &printError( 'Невозможно открыть базу данных для записи', $!, 'Проверьте права доступа к файлу' );

    for ( my $i = 0; $i <= $#data_array; $i++ )
    {

        for ( my $j = 0; $j <= $#{ $data_array[$i] }; $j++ )
        {
          if( defined ${ $data_array[$i] }[$j] )
          {
            print DB_WRITE ${ $data_array[$i] }[$j];
            print DB_WRITE "\n" unless ( ( $j == $#{ $data_array[$i] } ) and ( $i == $#data_array ) );
          }
        }

        print DB_WRITE "\n" if ( $i != $#data_array );
    }

    close DB_WRITE or die &printError( 'Невозможно закрыть базу данных после записи',  $!, 'Проверьте наличие свободного места на диске' );
}


#===============================================#
# Section 6:   Functions                        #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     1. Arguments ;)                           #
#                                               #
#  Actions:                                     #
#     1. print_error - outputs error message    #
#                                               #
#===============================================#
sub print_error
{
print "Content-type: text/html; charset=windows-1251;\n\n";
print <<"ERROR_MSG_START"
<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">

<head>
	<title>$_[0]</title>
	<link rel="stylesheet" type="text/css" href="../404.css" />
</head>

<body>

	<table class="alert">
		<tr><td class="lt"></td><td class="t"></td><td class="rt"></td></tr>
		<tr>
			<td class="l"></td>
			<td class="main"><div class="message"><h1>$_[0]</h1><p>$_[1]</p><ul>
ERROR_MSG_START
;

for ( my $i = 2; $i <= $#_; $i++ )
{
    print "<li>$_[$i]</li>";
}

print <<'ERROR_MSG_END'
</ul></div></td>
			<td class="r"></td>
		</tr>
		<tr><td class="lb"></td><td class="b"></td><td class="rb"></td></tr>
	</table>

</body>

</html>
ERROR_MSG_END
;
}