var GPlusGallery = (function () {
	'use strict';

	// Defaults
	var defaults = {
		pictureMarginRight: 6,
		minRowAspectRatio: 4,
		tickDuration: 300,
		hideUIDelay: 6,
		slideInterval: 10,
		fullscreenHintDelay: 5000,
		spinner: undefined
	};

	// Constructor
	function GPlusGallery(root, params) {
		var noscript = root.querySelector('noscript');
		var pics = [];

		// Скрипт, который выпотрашивает данные из HTML
		noscript.textContent.match(/<img (.+)>/g)
            .forEach(function(part){
				var pic = {};
                part.match(/\w+="[^"]*"/g).forEach(function(pair) {
                    pair.match(/(\w+)="([^"]*)"/)
					if (RegExp.$1 == 'src') pic.src = RegExp.$2;
					else if (RegExp.$1 == 'alt') pic.alt = RegExp.$2;
					else if (RegExp.$1 == 'style') {
						RegExp.$2.match(/width.*?px|height.*?px/g).forEach(function(rule) {
							if (rule.indexOf('width') == 0) pic.width = +rule.match(/\d+/g)[0];
							if (rule.indexOf('height') == 0) pic.height = +rule.match(/\d+/g)[0];
						});
					}
                });
				pics.push(pic);
            });
			console.info(pics);
return;

        for (var i = 0, l = noscriptNodes.length, noscript; noscript = noscriptNodes[i], i < l; i++) {
            stub.innerHTML = noscript.textContent.replace(re, 's' + picSide + '-c/');

            var frag = document.createDocumentFragment();
            for (var i1 = 0, l1 = stub.children.length, node; i1 < l1; i1++) {
                node = stub.removeChild(stub.children[0]);
                frag.appendChild(node);
                picIndex.push({
                    node:		node,
                    baseUrl:	node.src.substring(0,83)
                });
            }

            noscript.parentNode.replaceChild(frag, noscript);



		this.element = element;
		this.photos = photos;

		this.rows = [];
		
		this.treeBuilt = false;
		this.oRootDiv = document.createElement('div' );
		this.oImgs = [];

		this.init();
	}}

	GPlusGallery.prototype = {
		init: function() {




			this.oRootDiv.setAttribute('id', 'gplus-gallery-grid');
			this.element.appendChild( this.oRootDiv );
			var _this = this;
			
			$(this.oRootDiv).on('click', 'div', function() {
				_this.oFullscreen = new GPlusFullscreen( $( this ).index(), _this.photos, _this.options, function() { delete _this.oFullscreen; _this.show(); } );
			});

			for ( var i = 0, l = this.photos.length; i < l; i++ )	{
				this.photos[i].aspectRatio = this.photos[i].width / this.photos[i].height;
				this.photos[i].url = this.photos[i].url.substring( 0, 83 );	// Length of URL of G+ picture without resize params and filename
			}

			var minRowAspectRatio = this.options.minRowAspectRatio;

			for ( var i = 0, start = 0, rowAspectRatio = 0, l = this.photos.length; i < l; i++ )	{
				rowAspectRatio += this.photos[i].aspectRatio;

				if( rowAspectRatio > minRowAspectRatio )	{
					this.rows.push({ 'rowAspectRatio': rowAspectRatio, 'startIndex': start, 'endIndex': i });
					start = i + 1;
					rowAspectRatio = 0;
				}
			}

			// If rowAspectRatio == 0, than all rows are filled completely and no photos are left. If not, we need to make one last row.
			if ( rowAspectRatio !== 0 )	{
				this.rows.push({ 'rowAspectRatio': minRowAspectRatio, 'startIndex': start, 'endIndex': i - 1 });
			}
			
			this.show();
			
			var TO = false;
			$( window ).on( 'resize', function() {
				if( TO !== false )	{
					window.clearTimeout( TO );
				}
				TO = window.setTimeout( function(){ _this.show(); }, 500 );
			});

		},
			
		show: function() {

			// If user is in fullscreen gallery mode, do nothing
			if ( this.oFullscreen )	{
				return false;
			}

			var width = $(this.oRootDiv).width();

			if( ! this.treeBuilt ) {
				var fragment = document.createDocumentFragment();
			}

			for ( var i = 0, l = this.rows.length; i < l; i++ ) {
				// Fast access to some useful variables
				var row = this.rows[i];
				var margins = this.options.pictureMarginRight * ( row.endIndex - row.startIndex );

				// Calculating height of the row
				var fractionalRowHeight = ( width - margins ) / row.rowAspectRatio;
				var rowHeight = Math.floor( fractionalRowHeight );

				// Calculating widths of photos in row
				var sumOfWidths = 0;
				for( var j = row.startIndex, end = row.endIndex; j <= end; j++ ) {
					var photoWidth = Math.floor( this.photos[j].aspectRatio * fractionalRowHeight );
					sumOfWidths += photoWidth;
					this.photos[j].calculatedWidth = photoWidth;
					this.photos[j].calculatedHeight = rowHeight;
				}

				// Distribute rest of pixels
				var pixelsToDistribute = width - ( sumOfWidths + margins );

				for( var j = row.startIndex, end = row.endIndex; j <= end && pixelsToDistribute; j++ )	{
					this.photos[j].calculatedWidth++;
					pixelsToDistribute--;
				}
				
				// Show images
				if( ! this.treeBuilt )	{
					for( var j = row.startIndex, end = row.endIndex; j <= end; j++ )	{
						var oDiv = document.createElement('div');
						oDiv.setAttribute( 'class', 'pic' );

						if( j === end )	{
							oDiv.setAttribute( 'style', 'margin-right: 0' );
						}
						
						var oImg = document.createElement( 'img' );
						oImg.setAttribute( 'style', 'width: ' + this.photos[j].calculatedWidth + 'px; height: ' + this.photos[j].calculatedHeight + 'px' );
						oImg.setAttribute( 'src', this.photos[j].url + 'w' + this.photos[j].calculatedWidth + '-h' + this.photos[j].calculatedHeight + '-n/' );
						oImg.setAttribute( 'alt', this.photos[j].title );
						
						this.oImgs.push(oImg);

						oDiv.appendChild(oImg);
						fragment.appendChild(oDiv);
					}
				}
			}

			// If fragment is built, we just need to set new dimensions to pictures
			if( this.treeBuilt )	{
				for ( var i = 0, l = this.photos.length; i < l; i++ )	{
					var photo = this.photos[i];
					this.oImgs[i].setAttribute('style', 'width: ' + photo.calculatedWidth + 'px; height: ' + photo.calculatedHeight + 'px' );
					this.oImgs[i].setAttribute('src', photo.url + 'w' + photo.calculatedWidth + '-h' + photo.calculatedHeight + '-n/');
				}
			}

			if( ! this.treeBuilt )	{
				this.oRootDiv.appendChild( fragment );
				this.treeBuilt = true;
			}
		}
	};



    return GPlusGallery;
})();