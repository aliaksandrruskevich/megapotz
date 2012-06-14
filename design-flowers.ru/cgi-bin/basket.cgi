#!/usr/bin/perl -w 

use strict;
use CGI ':standard';
use CGI::Carp qw(fatalsToBrowser);
use CGI::Cookie;


BEGIN {push @INC,"/home/u221902/perl/lib/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/5.8.9/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/site_perl/5.8.9/";}
use HTML::Template::Expr;

my $action = param('do');

# ������� �����
# ?do=set_request&request_lastname=sdfsd&request_name=sdfsdf&request_email=sdfsdf&request_phone=sdfsdf&request_comment=sdfgsdg&request_details=sdfsdg
# �������� �������: /basket.html


sub get_good_by_id ($) {
	my $gid = shift;
	open FILE, "./main.db";
	while (my $line = <FILE>) {
		if ( $line =~ m/^$gid\|/){
			close FILE;
			return my ( $id, $title, $comment, $min_part, $price ) = split ('\|', $line );
		}
	}
	close FILE;
	return ('','','','');
}

# �������� �����
sub set_request {
	# ����
	my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
	$year += 1900;
	$mon++;

	# �������� ���������
	my $request_lastname = param('request_lastname') || '';
	my $request_name = param('request_name') || '';
	my $request_email = param('request_email') || '';
	my $request_phone = param('request_phone') || '';
	my $request_address = param('request_address') || '';
	my $request_details = param('request_comment') || '';
	my $date_in = "$mday.$mon.$year $hour:$min";
	
	my $request_goods;
	my $request_price;

	# ������ �������
	my $goods;
	my $GI = 0;

	# ��������� ������ �����
	foreach my $key (param()) {
		if ($key =~ /^id(\d+)/i) {
			# �������� ���������� � ������
			(
			$goods->[$GI]{good_id},
			$goods->[$GI]{good_title},
			$goods->[$GI]{good_comment},
			$goods->[$GI]{good_min_part},
			$goods->[$GI]{good_price}
			) = get_good_by_id($1);

			$goods->[$GI]{amount} = param($key) || 1;

			# � ������
			$request_goods .= qq!<li><b>[�$goods->[$GI]{good_id}\]</b> <a href="http://www.design-flowers.ru/img/$goods->[$GI]{good_id}.jpg">$goods->[$GI]{good_title}</a> [$goods->[$GI]{good_comment}] [$goods->[$GI]{good_price} ���., $goods->[$GI]{amount} ��.]</li>!;
			$request_price = $request_price + $goods->[$GI]{amount}*$goods->[$GI]{good_price};
			$GI++;
		}
		else {
			next;
		}
	}

	my $content = qq !
		<p><b>���</b>: $request_name</p>
		<p><b>�������</b>: $request_phone</p>
		<p><b>Email</b>: <a href="mailto:$request_email">$request_email</a></p>! .
		($request_address?"<p><b>�����</b>: $request_address</p>":'') .
		($request_details?"<p><b>�����������</b>: $request_details</p>":'') .
		qq!
		<p><br/><b>������ � ������:</b></p>
		<ul>$request_goods</ul>
		<p><b>����� �����:</b> $request_price ���.</p>
!;

	my $host = 'flowerslp@yandex.ru';
	my $admin = 'mike.shestakov@gmail.com';
	my $sendmail	= '/usr/sbin/sendmail -t';

	# To client
	my $subject = "Subject: ������ ����� : ���� ������ ��������!\n";
	my $welcome = "<p><b>$request_name</b>,</p><p>���� ������ �������, � � ��������� ����� � ���� �������� ��� ��������.</p><p>�������!</p><br><br>";

	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL $subject;
	print SENDMAIL "From: $host\n";
	print SENDMAIL "To: $request_email\n";
	print SENDMAIL "Content-type: text/html; charset=windows-1251\n\n";
	print SENDMAIL $welcome.$content;
	close(SENDMAIL);

	# To manager
	my $subject	= "Subject: ������ � ����� : $mday.$mon.$year ($request_price ���.)\n";

	open SENDMAIL, "|$sendmail" or die "Cannot open $sendmail: $!";
	print SENDMAIL $subject;
	print SENDMAIL "From: $request_email\n";
	print SENDMAIL "To: $host\n";
	print SENDMAIL "Content-type: text/html; charset=windows-1251\n\n";
	print SENDMAIL $content;
	close(SENDMAIL);

	open LOG, ">>log.txt";
	print LOG "---\n";
	print LOG $content . "\n";
	close LOG;

}
 
# ������ TMPL ������
sub basketTMPL() {
	my $cookies = fetch CGI::Cookie;
	# ������ �������
	my $goods;
	my $GI = 0;
	foreach(keys(%{$cookies})){
		if ($_ =~ m/^id(\d+)/){

			# �������� ���������� � ������
			(
			$goods->[$GI]{good_id},
			$goods->[$GI]{good_title},
			$goods->[$GI]{good_comment},
			$goods->[$GI]{good_min_part},
			$goods->[$GI]{good_price}
			) = get_good_by_id($1);

			$goods->[$GI]{amount} = $cookies->{$_}->value || 1;
			$GI++;

		}
		else { next; }
	}

	my $T = HTML::Template::Expr -> new(
		filename => "./basket.tmpl",
		global_vars=>1,
		die_on_bad_params => 0,
		loop_context_vars=> 1
	);

	$T -> param( good_loop => $goods ) if $GI;
	my $result = $T -> output();

	$result =~ s/\r?\n//g;
	$result =~ s/\t//g;
	return $result;
}
 
if (!$action) {
	print header (-type => "text/html; charset=windows-1251",-Cache_Control=>'no-cache',-Pragma=>'no-cache',-Expires=>'-1');
	print basketTMPL();
}
elsif ($action eq 'set_request') {
	set_request();
	print redirect( -URL => '/thanks.html');
}

__END__