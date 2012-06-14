#!/usr/bin/perl -w 

use strict;
use CGI ':standard';
use CGI::Carp qw(fatalsToBrowser);
use File::Copy;

my @status;

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
            $data_type = RECORD;
            next;
        }

        if ( $data_type == RECORD )
        {
            ( my $num ) = split ( /\|/, $line, 2 );
            $status[$num] = 1;
        }

    }

    close DB_READ or die &print_error( 'Невозможно закрыть базу данных:', $!, 'Это, как минимум, удивительно' );
}

#===============================================#
# Section 3:   Moving files                     #
#-----------------------------------------------#
#                                               #
#  Input:                                       #
#     1. @status                                #
#                                               #
#  Actions:                                     #
#     1. Moving files to 'removed' directory.   #
#                                               #
#===============================================#
my $i = 0;

foreach my $num ( @status )
{

    if ( not $num )
    {
        move "../www/img/$i.jpg", "../www/removed/small/$i.jpg";
        move "../www/img/big/$i.jpg", "../www/removed/big/$i.jpg";
    }

    $i++;
}

print "Content-type: text/html; charset=windows-1251;\n\n";
print "Готово";