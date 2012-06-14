#!/usr/bin/perl -w
use strict;
use CGI qw(:standard);
use CGI::Carp qw(fatalsToBrowser);

# Getting params
my $name = param('name') || '';
my $email = param('email') || '';
my $phone = param('phone') || '';
my $text = param('text') || '';
my $city = param('city') || '';
my $check = param('check') || '';

my $admin = 'info@akvi.ru';

if($check==5){
	my $sendmail = '/usr/sbin/sendmail -t';

	# To client
	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL "Subject: AKVI : Ваша заявка получена!\n";
	print SENDMAIL "From: $admin\n";
	print SENDMAIL "To: $email\n";
	print SENDMAIL "Content-Type: text/plain; charset=windows-1251\n\n";
	print SENDMAIL "Ваша заявка получена! В ближайшее время с вами свяжется наш менеджер.\n\n--\nКомпьютерная помощь AKVI\nhttp://www.akvi.ru/\n+7 (495) 646-01-26";
	close SENDMAIL;

	# To manager
	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL "Reply-to: $email\n";
	print SENDMAIL "Subject: AKVI : Вопрос с сайта\n";
	print SENDMAIL "From: $admin\n";
	print SENDMAIL "To: $admin\n";
	print SENDMAIL "Content-Type: text/plain; charset=windows-1251\n\n";
	print SENDMAIL "Имя: $name\nГород: $city\nЭлектропочта: $email\nТелефон: $phone\nТекст: $text";
	close SENDMAIL;
	
	print redirect (-uri=>'/thanks.html');
}
else{
	print redirect (-uri=>'/sorry.html');
}
__END__