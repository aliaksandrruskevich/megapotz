#!/usr/bin/perl -w
use strict;
use CGI qw(:standard);
use CGI::Carp qw(fatalsToBrowser);

# Getting params
my $name	= param('name');
my $phone	= param('tel');
my $text	= param('more');
my $email	= param('email');
my $check	= param('check');

my $admin	= 'zdravtour@list.ru';

if($check==5){
	my $sendmail	= '/usr/sbin/sendmail -t';

	# To client
	my $content	= "<p><b>$name</b>,</p><p>Ваша заявка принята, и в ближайшее время с вами свяжется менеджер по телефону <b>$phone</b>.</p><p>Текст: $text</p><p>Спасибо!</p>";

	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL "Subject: otel-morskoi.ru\n";
	print SENDMAIL "From: $admin\n";
	print SENDMAIL "To: $email\n";
	print SENDMAIL "Content-type: text/html; charset=utf-8\n\n";
	print SENDMAIL "$content\n";
	close SENDMAIL;

	# To manager
	my $content	= "<p>Телефон: $phone</p><p>Имя: $name</p><p>Текст: $text</p>";

	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL "Subject: otel-morskoi.ru\n";
	print SENDMAIL "From: $email\n";
	print SENDMAIL "To: $admin\n";
	print SENDMAIL "Content-type: text/html; charset=utf-8\n\n";
	print SENDMAIL "$content\n";
	close SENDMAIL;
	
	print redirect (-uri=>'/thanks.html');
}
else{
	print redirect (-uri=>'/sorry.html');
}
__END__