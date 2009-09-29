/*
 * jquery.photowall.js
 *
 * This is the jQuery client for the photoWALL.com API.
 * Please see http://www.photowall.com/ws/developers for more information
 * about the photoWALL API.
 */

(function($) {

  // Should not need to change this value
  var API_HOST = 'http://ws.photowall.com';
  
  /*
   * Simple request to photoWALL API that can 
   * either get existing photos by tag,
   * or subscribe to new photos by tag.
   *
   * Existing photos matching 'japan':
   *    $.photowall('photos', 'japan', function(resp) {
   *      // do something with response
   *    });
   *
   * Existing photos with any tag (featured set of photos):
   *    $.photowall('photos', function(resp) {
   *      // do something with response
   *    });
   *
   * Existing photos with extra params:
   *    var params = {
   *      "tag": 'japan',
   *      "page": 2,
   *      "per_page": 20,
   *      "format": 'xml',
   *    };
   *    $.photowall('photos', params, function(resp) {
   *      // do something with response
   *    });
   *
   * Subscribe to new photos (note, this is a long-poll or comet response):
   *    $.photowall('subscribe', 'japan', function(resp) {
   *      // do something with new photo
   *    });
   */
  $.photowall = function(type, params, cbk) {

    // if second param is a tag, add to params
    if(typeof params == 'string') {
      var tag = params;
      params = {"tag":tag};
    }
    else if (typeof params == 'function') {
      cbk = params;
      params = {"tag":'globalwall'},
    }

    // ensure third param is a func
    if(typeof cbk != 'function') {
      cbk = function(resp) { console.log(resp) };
    }

    var p   = $.extend({}, $.photowall.defaults, params);
    var req = API_HOST + '/' + type + '?';

    // build request
    $.get(req, p, function(resp) {
      cbk.apply(this, [resp]);
    });
  };

  $.photowall.defaults = {
    "page": 1,
    "per_page": 10,
    "format": 'json',
    "callback": '?'
  };

})(jQuery);
