/* Author: Florian Maul */

var GPlusGallery = (function($) {

	/* ------------ PRIVATE functions ------------ */

	
	/**
	 * Distribute a delta (integer value) to n items based on
	 * the size (width) of the items thumbnails.
	 * 
	 * @method calculateCutOff
	 * @property len the sum of the width of all thumbnails
	 * @property delta the delta (integer number) to be distributed
	 * @property items an array with items of one row
	 */
	var calculateCutOff = function(len, delta, items) {
		// resulting distribution
		var cutoff = [];
		var cutsum = 0;

		// distribute the delta based on the proportion of
		// thumbnail size to length of all thumbnails.
		for(var i in items) {
			var item = items[i];
			var fractOfLen = item.twidth / len;
			cutoff[i] = Math.floor(fractOfLen * delta);
			cutsum += cutoff[i];
		}

		// still more pixel to distribute because of decimal
		// fractions that were omitted.
		var stillToCutOff = delta - cutsum;
		while(stillToCutOff > 0) {
			for(i in cutoff) {
				// distribute pixels evenly until done
				cutoff[i]++;
				stillToCutOff--;
				if (stillToCutOff == 0) break;
			}
		}
		return cutoff;
	};
	
	/**
	 * Takes images from the items array (removes them) as 
	 * long as they fit into a width of maxwidth pixels.
	 *
	 * @method buildImageRow
	 */
	var buildImageRow = function(maxwidth, items) {
		var row = [], len = 0;
		
		// each image a has a 3px margin, i.e. it takes 6px additional space
		var marginsOfImage = 6;

		// Build a row of images until longer than maxwidth
		while(items.length > 0 && len < maxwidth) {
			var item = items.shift();
			row.push(item);
			len += (item.twidth + marginsOfImage);
		}

		// calculate by how many pixels too long?
		var delta = len - maxwidth;

		// if the line is too long, make images smaller
		if(row.length > 0 && delta > 0) {

			// calculate the distribution to each image in the row
			var cutoff = calculateCutOff(len, delta, row);

			for(var i in row) {
				var pixelsToRemove = cutoff[i];
				item = row[i];

				// move the left border inwards by half the pixels
				item.vx = Math.floor(pixelsToRemove / 2);

				// shrink the width of the image by pixelsToRemove
				item.vwidth = item.twidth - pixelsToRemove;
			}
		} else {
			// all images fit in the row, set vx and vwidth
			for(var i in row) {
				item = row[i];
				item.vx = 0;
				item.vwidth = item.twidth;
			}
		}

		return row;
	};
	
	/**
	 * Creates a new thumbail in the image area. An attaches a fade in animation
	 * to the image. 
	 */
	var createImageElement = function(parent, item) {
		var imageContainer = $('<div class="imageContainer"/>');

		var overflow = $("<div/>");
		overflow.css("width", item.width_m+"px");
		overflow.css("height", item.height_m+"px");
		overflow.css("overflow", "hidden");

		var link = $('<a class="viewImageAction" href="'+ item.url_h +'"/>');
		
		var img = $("<img/>");
		img.attr("src", item.url_m);
		img.attr("title", item.title);
		img.css("width", item.width_m + "px");
		img.css("height", item.height_m + "px");
		img.css("margin-left", "" + (item.vx ? (-item.vx) : 0) + "px");
		img.css("margin-top", "" + 0 + "px");
		img.hide();

		link.append(img);
		overflow.append(link);
		imageContainer.append(overflow);

		// fade in the image after load
		img.bind("load", function () { 
			$(this).fadeIn(500); 
		});

		parent.find(".clearfix").before(imageContainer);
		item.el = imageContainer;
		return imageContainer;
	};
	
	/**
	 * Updates an exisiting tthumbnail in the image area. 
	 */
	var updateImageElement = function(item) {
		var overflow = item.el.find("div:first");
		var img = overflow.find("img:first");

		//overflow.css("width", "" + $nz(item.vwidth, 120) + "px");
		//overflow.css("height", "" + $nz(item.theight, 120) + "px");

		img.css("margin-left", "" + (item.vx ? (-item.vx) : 0) + "px");
		img.css("margin-top", "" + 0 + "px");
	};	
		
	/* ------------ PUBLIC functions ------------ */
	return {
		
		showImages : function(imageContainer, realItems) {

			// reduce width by 1px due to layout problem in IE
			var containerWidth = imageContainer.width() - 1;
			
			// Make a copy of the array
			var items = realItems.slice();
		
			// calculate rows of images which each row fitting into
			// the specified windowWidth.
			var rows = [];
			while(items.length > 0) {
				rows.push(buildImageRow(containerWidth, items));
			}  

			for(var r in rows) {
				for(var i in rows[r]) {
					var item = rows[r][i];
					if(item.el) {
						// this image is already on the screen, update it
						updateImageElement(item);
					} else {
						// create this image
						createImageElement(imageContainer, item);
					}
				}
			}
		}

	}
})(jQuery);

$(document).ready(function() {
	$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=da9796ed936a95a88818280ef7f6631c&photoset_id=72157629525545510&extras=url_h%2Curl_m&format=json&nojsoncallback=1', function(data) {
		var items = data.photoset;
		alert(items);

		GPlusGallery.showImages($("#imagearea"), items);

		$(window).resize(function() {
			// layout the images with new width
			GPlusGallery.showImages($("#imagearea"), items);
		});  
	});
});

/*
Альбомная титульная картинка
выбирать разрешение в соответствии с экраном и грузить с фликра
задержка при ресайзе
бесконечный скролл

*/



