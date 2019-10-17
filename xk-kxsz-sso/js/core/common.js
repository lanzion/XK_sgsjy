(function($) {
    $.fn.ajax = function(options) {
        var setting = $.extend({
            error: function(XMLHttpRequest, textStatus, errorThrown) {},
            success: function(data, textStatus) {},
            type: 'post',
            data: {},
            contentType: 'application/json; charset=UTF-8',
            context: document.body,
            loading: false
        }, options);

        var url = config.baseUrl + config.prefix + setting.url;

        var context = options.context ? options.context : setting.context;
        var $loadingWrap = this.hasOwnProperty("context") ? this : $(context);
        var $loading

        var _opt = $.extend(setting, {
            url: url,
            data: typeof(setting.data) == 'string' ? setting.data : JSON.stringify(setting.data),
            beforeSend: function(request) {
                var token = localStorage.getItem('token');
                if (token) {
                    request.setRequestHeader('token', token);
                }
                // is show loading
                if (setting.loading) {
                    $loading = $loadingWrap.find('> .loading');
                    if ($loading.length === 0) {
                        $loading = $('<div class="loading"></div>').appendTo($loadingWrap);
                    }
                    $loading.addClass('active');
                }
            },
            complete: function(XHR, TS) {
                if (setting.loading) {
                    $loading.removeClass('active');
                }
            }
        });
        $.ajax(_opt);
    };

    $.fn.getQueryString = function() {
        var query = {};
        var name, value;
        var str = location.href; // get whole href url
        var num = str.indexOf('?');
        str = str.substr(num + 1); // get string from href url that after '?'

        var arr = str.split('&'); // get args[] by split with '&'
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf('=');
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                query[name] = value;
            }
        }
        return query;
    };
})(jQuery);