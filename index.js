var page = require('webpage').create(),
	system = require('system'), url, from , to , date1, date2;


if (system.args.length < 4) {
    console.log(' Error - Insufficient Arguments  \n Origin Destiny YYYY-MM-DD  \n Example: MEX SFO 2013-12-15 2013-12-25');
} else {
    system.args.forEach(function (arg, i) {
            if (i === 1) {
            	from = arg;
            } else if (i === 2) {
            	to = arg;
            } else if (i === 3){
            	date1 = arg;
            } else if (i === 4){
            	date2 = arg;
            }
    });
    url = 'http://www.kayak.com/flights/'+from+'-'+to+'/'+date1+'/'+date2;    
}

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        var results = page.evaluate(function() {
            var list = document.querySelectorAll('div.pricerange'), kayakPrices = [], i;
            for (i = 0; i < list.length; i++) {
                kayakPrices.push(list[i].innerText);
            }
            return kayakPrices;
        });
        console.log(results);
    }
    phantom.exit();
});






// var nodeio = require('node.io');

// var methods = {
// 	input : ['http://www.kayak.com/flights/CUN-ZRH/2013-11-20/2014-01-31'],
// 	run : function(url) {
// 		this.getHtml(url, function(err, $) {
// 			if (err) this.exit(err);
			
// 			console.log($('html').fulltext);

			    
// 		});
// 	}
// }
// exports.job = new nodeio.Job({timeout:20}, methods);