#!/usr/bin/perl

use warnings;
use strict;

use CGI qw(:standard);
use CGI::Carp qw(fatalsToBrowser);

BEGIN {push @INC,"/home/u221902/perl/lib/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/5.8.9/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/site_perl/5.8.9/";}

use HTML::Template::Expr;
use POSIX qw(locale_h);
use locale;
use Data::Dumper;
setlocale(LC_ALL, "ru_RU.CP1251");

	use constant HEADER => 1;
	use constant RECORD => 2;
	use constant PICS_PER_PAGE => 32;

	my $data_type = HEADER; 
	my $OUTDIR = '../www/';
	my $DATA;
	my $MENU;
	my $SITEMAP_LINKS;
	my $MI = 0;
	my $DI = 0;
	my $EI = 0;
	my $PI = 0;
	my $SI1 = 0;
	my $SI2 = 0;

my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
$year=$year+1900;
$mon=$mon+1;
my $lastmod=sprintf("%d-%02d-%02d",$year,$mon,$mday);"";
	
#	my $banner_id = 1; # ИД баннера для показа в разных категориях
	
	my %cats = ();
	
	# Возвращает номер категории в списке категорий
	sub getNumber($){
		my $cat = shift;
		if($cats{$cat}){
			return $cats{$cat};
		}
		else{
			return $cats{$cat} = scalar(keys(%cats))+1;
		}
	}
  
  print header (-type => 'text/html; charset=windows-1251');
	open DB_READ, 'main.db' or die ( 'Невозможно открыть базу данных для чтения:' . $! );

	while( my $line = <DB_READ> )
	{
		chomp( $line );
		$line =~ s/\r//g;

		# Если строка содержит только пробелы
		unless ( $line =~ m/\S/ )
		{
			$data_type = HEADER;
			next;
		}


		if ( $data_type == HEADER )
		{
			
			$PI = 0;
			#$line =~ m/(.*?)\|(.*?)\|(\w*)\|?(\d*)?/;
			#($category, $subcategory, $url, $banner_id) = ($1, $2, $3, $4);
			my ($category, $subcategory, $url, $banner_id) = split ('\|', $line );;
			#$banner_id ||= 1+int(rand(3));
			$DI++ if $DATA->[$DI]{curr_cat};
			
			$DATA->[$DI]{curr_cat} = getNumber($category); #($category =~ m/Ассортимент/i ) ? 1 : 2;
			
			$DATA->[$DI]{title} = $category;
			$DATA->[$DI]{sub_cat} = $subcategory;
			$DATA->[$DI]{url} = $url;
			$DATA->[$DI]{banner_id} = $banner_id;
			$EI = 0;
			
			$MENU->[$MI = (getNumber($category)-1)]{curr} = 0;
			$MENU->[$MI]{NY} = 0;
			$MENU->[$MI]{counter} =  $DATA->[$DI]{curr_cat};
			$MENU->[$MI]{title} = $category;
			$MENU->[$MI]{subcat_loop}->[scalar(@{$MENU->[$MI]{subcat_loop}})]{title} = $subcategory;
			$MENU->[$MI]{subcat_loop}->[scalar(@{$MENU->[$MI]{subcat_loop}})-1]{curr} = 0;
			$MENU->[$MI]{subcat_loop}->[scalar(@{$MENU->[$MI]{subcat_loop}})-1]{url} = $url;
			
			$data_type = RECORD;
			next;
		}
			
		if ( $data_type == RECORD )
		{
			if ($EI > PICS_PER_PAGE) 
			{
			$PI++;
			$EI = 0;
			}
				$DATA->[$DI]{pages}->[$PI]{counter} = $PI+1;
				$DATA->[$DI]{pages}->[$PI]{curr} = 0;
				$DATA->[$DI]{pages}->[$PI]{url} = $PI ? "/$DATA->[$DI]{url}/$DATA->[$DI]{pages}->[$PI]{counter}.html" : "/$DATA->[$DI]{url}/";

			my ( $id, $title, $comment, $min_part, $price, $datesec ) = split ('\|', $line ); # ($1, $2, $3, $4); 
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{id} = $id;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{title} = $title;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{comment} = $comment;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{min_part} = $min_part;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{price} = $price;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{datesec} = $datesec;
			$DATA->[$DI]{pages}->[$PI]{elements}->[$EI]{new} = ($datesec&&($datesec>=(time - 5076000)))?1:0;

			
			if ( -e "texts/$DATA->[$DI]{url}.txt" )
			{ 
				open TEXT, "texts/$DATA->[$DI]{url}.txt" or die ( 'Невозможно открыть файл с текстами для чтения:' . $! );
				
				$DATA->[$DI]{pages}->[$PI]{keywords} = <TEXT>;
				$DATA->[$DI]{pages}->[$PI]{keywords} =~ s/(\n|\r)//g;
				$DATA->[$DI]{pages}->[$PI]{description} = <TEXT>;
				$DATA->[$DI]{pages}->[$PI]{description} =~ s/(\n|\r)//g;
				$DATA->[$DI]{pages}->[$PI]{text} = <TEXT> if ( $PI == 0);
				$DATA->[$DI]{pages}->[$PI]{text} =~ s/(\n|\r)//g if ( $PI == 0);
				
				close (TEXT);
			}
			
			$EI++;
			
		}

	}
	close DB_READ or die ( 'Невозможно закрыть базу данных:' . $! );
	

	
  $DI = 0;
  $PI = 0;
  $MI = 0;
  my $SMI = 0;
  my $SI = 0;
  my $fl =0;
	
	
	my $CURRENT_CAT_ID = 0;
	my $CURRENT_SUB_CAT_ID = 0;
  

while ( $DATA->[$DI] )
{
	die "Database is fucked up:(" unless($DATA->[$DI]{url});
	unless (-e "$OUTDIR"){	mkdir "$OUTDIR";}
	system ("rm -rf $OUTDIR/$DATA->[$DI]{url}");
	unless (-e "$OUTDIR/$DATA->[$DI]{url}"){mkdir "$OUTDIR/$DATA->[$DI]{url}" or die "Can' t make directory: $!";}

	while ( $DATA->[$DI]{pages}->[$PI] )
	{
		my $xml_page = ($PI+1).'.xml';
		my $page = $PI ? ($PI+1).'.html' : 'index.html';
		$DATA->[$DI]{pages}->[$PI]{curr} = 1;		
		$MI =0;
		
		while ( $MENU->[$MI] )
		{
				$MENU->[$MI]{curr} = 0;
				$MENU->[$MI]{id} = $MI;
				
				if  ( $MENU->[$MI]{title} eq $DATA->[$DI]{title} ) {
					$MENU->[$MI]{curr} = 1;
					$CURRENT_CAT_ID = $MI;
				}
				
				$MENU->[$MI]{NY} = 0;
				$MENU->[$MI]{NY} = 1 if  ( $MI==0 );

				$SI = 0;
				while ( $MENU->[$MI]{subcat_loop}->[$SI] )
				{
				$MENU->[$MI]{subcat_loop}->[$SI]{curr} = 0;
				$MENU->[$MI]{subcat_loop}->[$SI]{id} = $SI;
				if  ( $MENU->[$MI]{subcat_loop}->[$SI]{title} eq $DATA->[$DI]{sub_cat} ){
					$MENU->[$MI]{subcat_loop}->[$SI]{curr} = 1;
					$CURRENT_SUB_CAT_ID = $SI;
				}

				
				$SI++;
				}
				$MI++;
		}
		
		open (HTML_FILE, ">$OUTDIR/$DATA->[$DI]{url}/$page") or die "Can't open file: $!";
		print "$OUTDIR/$DATA->[$DI]{url}/$xml_page\n";
		if($PI==0){
			$SITEMAP_LINKS->[$SMI]{url}="http://www.design-flowers.ru/$DATA->[$DI]{url}/";
			$SITEMAP_LINKS->[$SMI]{priority}="0.7";
		}else{
			$SITEMAP_LINKS->[$SMI]{url}="http://www.design-flowers.ru/$DATA->[$DI]{url}/$page";
			$SITEMAP_LINKS->[$SMI]{priority}="0.3";
		}
		$SITEMAP_LINKS->[$SMI]{lastmod}=$lastmod;
		
		my $T = HTML::Template::Expr -> new(filename => "prod.tmpl", global_vars=>1, loop_context_vars => 1, die_on_bad_params => 0);

		$T->param ( pages_loop => $DATA->[$DI]{pages} ) if $DATA->[$DI]{pages}->[1];
		$T->param (
			curr_cat =>$DATA->[$DI]{curr_cat},
			cat_loop =>$MENU, 
			doc_title => $DATA->[$DI]{sub_cat},
			items_loop =>$DATA->[$DI]{pages}->[$PI]{elements},
			banner_id => $DATA->[$DI]{banner_id},
		);
		
		$T->param (				 
				keywords => $DATA->[$DI]{pages}->[$PI]{keywords},
				description => $DATA->[$DI]{pages}->[$PI]{description},
				text => $DATA->[$DI]{pages}->[$PI]{text},
		 );
		
		my $output = $T -> output();
		$output =~ s/\r?\n//g;
		$output =~ s/\t//g;
        print HTML_FILE "<!-- Материалы сайта www.design-flowers.ru запрещено копировать и публиковать на других сайтах. Нарушители выявляются еженедельно с помощью системы автоматического поиска плагиата. -->
<!-- Найденные сайты-нарушители незамедлительно отправляются на рассмотрение в Яндекс (http://webmaster.yandex.ru/delspam.xml) -->
<!-- Обычно, за плагиат Яндекс накладывает фильтр на сайт-нарушитель, или удаляет из своей поисковой базы страницу или сайт целиком. -->
<!-- Пожалуйста, не тратьте попусту свое время. Спасибо! -->

$output";
		#print HTML_FILE $output;
		close HTML_FILE;

		

		$DATA->[$DI]{pages}->[$PI]{curr} = 0;
		$PI++;
		$SMI++;
	}
	$DI++;
	$PI=0;
}


	


###
open (XML_SITEMAP, ">$OUTDIR/sitemap.xml") or die "Can't open file: $!";
print "SITEMAP.XML\n";
my $T = HTML::Template -> new(filename => "sitemap.tmpl", global_vars=>1, die_on_bad_params => 0);
$T->param (pages_loop=>$SITEMAP_LINKS);
my $output = $T -> output();
print XML_SITEMAP $output;
close XML_SITEMAP;