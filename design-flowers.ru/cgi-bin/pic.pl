#!/usr/bin/perl -w 

use strict;
use CGI ':standard';
use CGI::Carp qw(fatalsToBrowser);



opendir(DIR, '../www/www/removed/small') or die "Can't open dir!";
my @files = readdir DIR;
@files = sort @files;
closedir(DIR);
print header (-type => 'text/html; charset=utf-8');

print qq|
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>Листинг</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/> </head> <body>
|;

foreach (@files) {
  $_ =~ /^(.+)\.jpg$/i;
  next unless $1;
  
  print qq|
    <p>$1</p>
    <img src="/removed/small/$_" height="200"/>
    <hr/>
  |;
  
  print qq|
  </body>
  </html>
  |;

  
}