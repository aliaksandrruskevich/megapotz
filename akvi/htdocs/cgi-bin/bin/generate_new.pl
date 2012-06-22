#!/usr/bin/perl -w
use strict;
use warnings;
use CGI ':standard';

BEGIN {push @INC,"/home/u221902/perl/lib/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/5.8.9/";}
BEGIN {push @INC,"/home/u221902/perl/lib/perl5/site_perl/5.8.9/";}

$| = 1;
use HTML::Template::Expr;
use Data::Dumper;

####
my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
$year=$year+1900;
$mon=$mon+1;
my $lastmod=sprintf("%d-%02d-%02d",$year,$mon,$mday);
####

sub get_links($) {

    my $num = shift;
    my $links;
    
    # Если файл со ссылками найден, берем варианты анкоров из него
    if (-e '../tmpl/links.txt'){
        open FILE, "../tmpl/links.txt";
        my $i = 1;
        while(my $line = <FILE>) {
            if ($i == $num) {
                $line =~ s/\r?\n//g;
                return $line;
            }
            $i++;
        }
        close FILE;
    }
    return '';
}

print "Content-type: text/html\n\n";
print "<html><body>\n";
print "Generating..\n";

# открываем файл с индексом
open INDEX, "../tmpl/index.txt" or die "Can't open index.txt: $!\n";

my %index;
#my $DI = 0;
my $SI = 0;

while (my $str = <INDEX>) {
    $SI++;
    next if $str =~ /^\r?\n$/;
    
    #Вычленяем название директории и страницы
    if ($str =~ m!^(/([^/]+/)?(.*?)\.tmpl)\|?(\d\.\d)?\r?\n$!){
        my $dir = $2 || ''; # для главной
        $dir = "/$dir";
        my $page = $3;
        my $prior = $4;
        my $path = $1;
        
        $str =~ s/\r?\n//sg;
        
        # Если нет файла, предупреждаем
        unless (-e "../tmpl_pages/$path"){
            print "No such file or directory: $path\n";
            #sleep 5;
            
            # В помойку:
            my $trash = <INDEX>; $trash = <INDEX>;  $trash = <INDEX>;
            $SI +=3;
            
            next;
        }
        
        # Количество страниц в директории
        my $DI = defined($index{$dir})?scalar(@{$index{$dir}}):0;
        
        # Страница
        $index{$dir}->[$DI]{page} = $page . ".html";
        $index{$dir}->[$DI]{template} = $page . ".tmpl";
        $index{$dir}->[$DI]{url} = $page eq 'index'?$dir:$dir.$page.".html";
        $index{$dir}->[$DI]{curr} = 0;
        
        # Тайтл
        $index{$dir}->[$DI]{title} = <INDEX> || '';
        $index{$dir}->[$DI]{title} =~ s/\r?\n//sg;
        
        # Название пункта меню ( До первой точки )
        if ($index{$dir}->[$DI]{title} =~ m/^([^\.]+)\./) {
            $index{$dir}->[$DI]{menu_title} = $1;
        }
        else {
            $index{$dir}->[$DI]{menu_title} = $index{$dir}->[$DI]{title};
        }
        
        # Кивордс
        $index{$dir}->[$DI]{keywords} = <INDEX> || '';
        $index{$dir}->[$DI]{keywords} =~ s/\r?\n//sg;
        
        # Дескрипшн
        $index{$dir}->[$DI]{description} = <INDEX> || '';
        $index{$dir}->[$DI]{description} =~ s/\r?\n//sg;
        
        # Приоритет
        $index{$dir}->[$DI]{prior} = $prior || '0.3';
        
        $SI +=3;
    }
    else {
        die "File index.txt is not valid!\nMike, kill yourself plz.\nString: $SI\n>$str";
    }
    
}

# Номер страницы при генерации
my $num = 0;
# Массив со сгенеренными урлами их приоритетами, датами и пр.
my $sitemap;

# Начинаем генерацию
foreach my $dir (keys(%index)) {
    
    
    my $PI = 0;
    my $curr_dir = $dir;
    $curr_dir =~ s!/!!g;
    
    while ($index{$dir}->[$PI]) {
    $num++;
        
        # Текущая страница (для меню)
        $index{$dir}->[$PI]{curr} = 1;
        
        # Шаблон страницы
        my $TP = HTML::Template::Expr -> new(
          filename => "../tmpl_pages$dir$index{$dir}->[$PI]{template}",
          global_vars=>1,
          die_on_bad_params=> 0,
          loop_context_vars=> 1
        );
        
        $TP -> param( %{$index{$dir}->[$PI]} );
        
        my $page = $TP->output();
        $page =~ s/\r?\n//g;
        $page =~ s/\t//g;
        
        # Шаблон меню
        my $menu_file = "";
        
if ( ($dir eq '/abonentskoe/') || ($dir eq '/vosstanovlenie/') || ($dir eq '/virus/') || ($dir eq '/programs/') || ($dir eq '/windows/') || ($dir eq '/sborka/') || ($dir eq '/ustanovka/') || ($dir eq '/wifi/') ) {
            $menu_file = "../tmpl/col_textpage_new.tmpl";
        }
my $menu="";
        if($menu_file){
        my $TM = HTML::Template::Expr -> new(
          filename => "$menu_file",
          global_vars=>1,
          die_on_bad_params=> 0,
          loop_context_vars=> 1
        );
        
        $TM -> param( %{$index{$dir}->[$PI]} );
        $TM -> param( menu_loop => $index{$dir} );
        
        $menu = $TM->output();
        $menu =~ s/\r?\n//g;
        $menu =~ s/\t//g;
        }
        # Грузим все в оплетку
        my $T = HTML::Template::Expr -> new(
          filename => "../tmpl/layout_new.tmpl",
          global_vars=>1,
          die_on_bad_params=> 0,
          loop_context_vars=> 1,
        );
        
        my $isindex=$dir.$index{$dir}->[$PI]{page};
        if ($isindex eq '/index.html' or $curr_dir eq 'price' or $curr_dir eq 'promo') {
            $isindex='1';
        }
        else {
            $isindex='';
        }
        
        $T -> param( %{$index{$dir}->[$PI]} );
        $T -> param( dir => $curr_dir );
        $T -> param( isindex => $isindex );
        $T -> param( menu => $menu );
        $T -> param( content => $page );
        
        # Получаем ссылки из файла (для продвижения)
        my $links = get_links($num);
        $T -> param( links => $links );
        
        my $res = $T->output();
        
        # Очищаем от табуляций, новых строк и комментариев
        $res =~ s/\r?\n//g;
        $res =~ s/\t//g;
        $res =~ s/ +/ /g;
        $res =~ s/<!-- ([^>]+)*-->//gis;
        
        
        # Создаем папки
        unless (-e  "../../www$dir"){
            mkdir "../../www$dir" or die "Can't create directory $!\n";
        }
        
        # Пишем файлы
        open (OUTPUT, ">../../www$dir$index{$dir}->[$PI]{page}") or die "Can't open file for writing: $! (../../www$dir$index{$dir}->[$PI]{page})";
        print OUTPUT "<!-- Материалы сайта www.akvi.ru запрещено копировать и публиковать на други сайтах. Нарушители выявляются еженедельно с помощью системы автоматического поиска плагиата. -->
<!-- Найденные сайты-нарушители незамедлительно отправляются на рассмотрение в Яндекс (http://webmaster.yandex.ru/delspam.xml) -->
<!-- Обычно, за плагиат Яндекс накладывает фильтр на сайт-нарушитель, или удаляет из своей поисковой базы страницу или сайт целиком. -->
<!-- Пожалуйста, не тратьте попусту свое время. Спасибо! -->

$res";
        close (OUTPUT);
        
        # Прописываем переменнве для SItemap
        $sitemap->[$num-1]{lastmod}  = $lastmod;
        $sitemap->[$num-1]{url}      = $dir . $index{$dir}->[$PI]{page};
        $sitemap->[$num-1]{url}      =~ s/index\.html$//gis;
        $sitemap->[$num-1]{priority} = $index{$dir}->[$PI]{prior};
        
        # Текущая страница (для меню)
        $index{$dir}->[$PI]{curr} = 0;
        $PI++;
    }
  
  
}
    


# Генерируем SITEMAP

open (XML_SITEMAP, ">../../www/smap.xml") or die "Can't open file: $!";

print "SITEMAP.XML, Total urls:" . scalar(@{$sitemap}). "\n";
my $XML = HTML::Template -> new(filename => "../tmpl/sitemap.tmpl", global_vars=>1, die_on_bad_params => 0);
$XML->param (pages_loop=>$sitemap);
print XML_SITEMAP $XML->output();

close XML_SITEMAP;



print "Finished\n";
__END__