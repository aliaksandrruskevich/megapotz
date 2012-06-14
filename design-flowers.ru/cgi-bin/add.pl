#!/usr/bin/perl -w 

use strict;
use CGI ':standard';
use CGI::Carp qw(fatalsToBrowser);


#===============================================#
# Section 1:   Reading Parameters               #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     POST                                      #
#                                               #
#  Actions:                                     #
#     1. Reads POST                             #
#                                               #
#===============================================#
my $cat = param( 'cat' );
my $subcat = param( 'subcat' );
my $info = param( 'numbers' );


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
my $max_id = 0;

{
    use constant HEADER => 1;
    use constant RECORD => 2;

    my $data_type = HEADER;

    open DB_READ, 'main.db' or die &print_error( 'Невозможно открыть базу данных для чтения:', $!, 'Проверьте права доступа к файлу.' );

    while( my $line = <DB_READ> )
    {
        chomp( $line );

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
            ( my $id ) = split ( /\|/, $line, 2 );
            $max_id = $id if ( $id > $max_id );
        }

    }
	

    $max_id++;
    close DB_READ or die &print_error( 'Невозможно закрыть базу данных:', $!, 'Это, как минимум, удивительно' );
}


#===============================================#
# Section 5:   Processing parameters            #
#-----------------------------------------------#
my $start_id = 0;
my $end_id = 0;

{
    my $header = $cat . '|' . $subcat;
    my @items = split( /\r?\n/, $info );
    $start_id = $max_id;
    $end_id = $max_id + $#items;
    my $header_found = 0;

    foreach ( @items ) {
        $_ = $max_id++ . '|' . $_ . "|" . time;
    }

    for ( my $i = 0; $i <= $#data_array; $i++ )
    {

        if ( ${ $data_array[$i] }[0] eq $header  )
        {
            $header_found = 1;
            shift @{ $data_array[$i] };
            unshift @{ $data_array[$i] }, @items;
            unshift @{ $data_array[$i] }, $header;
            last;
        }

    }

    if ( $header_found == 0 )
    {
        push @{ $data_array[@data_array] }, $header;
        push @{ $data_array[$#data_array] }, @items;
    }
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
            print DB_WRITE ${ $data_array[$i] }[$j];
            print DB_WRITE "\n" unless ( ( $j == $#{ $data_array[$i] } ) and ( $i == $#data_array ) );
        }

        print DB_WRITE "\n" if ( $i != $#data_array );
    }

    close DB_WRITE or die &printError( 'Невозможно закрыть базу данных после записи',  $!, 'Проверьте наличие свободного места на диске' );
}


print "Content-type: text/html; charset=windows-1251;\n\n";

print <<"RESULT"
<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">

<head>
	<title>Результат добавления</title>
</head>

<body>
	<p>Теперь нужно добавить фотографии с названиями от $start_id.jpg по $end_id.jpg в том же порядке, как были добавлены наименования.</p>

</body>

</html>
RESULT
;



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