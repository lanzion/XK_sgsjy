(function($) {
    $.fn.selectPanel = function(options) {
        var defaults = {
            url: null,
            data: {}, // 查询参数
            params: {
                pId: "parentId",
                id: "id"
            },
            label: "name", // Input显示数据KEY
            result: ["entity", "resultData"], // json数据结果格式
            fields: [],
            default: [], // 所有父级
            maxLevel: 0,
            tabs: [], // tab 如：[a, b, c]
            clearable: null,
            disabled: false,
            connector: " / ",
            onselect: function() {}
        };
        defaults = $.extend(true, defaults, options);
        defaults.params.arg = defaults.params.arg == undefined ? defaults.params.id : defaults.params.arg; // 提交表单传递的参数
        return this.each(function() {
            var o = defaults;
            var obj = $(this);
            var level = 0;
            var isLoad = true; // 是否继续向下加载数据
            var isArrField = o.fields.length ? true : false; // 是否赋值多个/只赋值最后的值
            var input = obj.find("input[type=text]");
            var defaultLabel = "";
            var resultObj = {};
            // var inputArg = obj.find("input[name]");
            // var defaultIds = inputArg.val() ||
            // input.val();
            // 添加清空按钮
            var clearable = obj.attr("data-clear");
            if (o.clearable || (o.clearable == null && (clearable == "1" || clearable == true))) {
                obj.append("<a class='clearInput' title='清空'>&#215;</a>");
            }
            var select_box = obj.append("<div class='select-panel'><ul class='select-panel-tab clearfix'></ul><div class='select-panel-content'></div></div>");
            var tabNum = o.tabs.length;
            var tabBox = select_box.find(".select-panel-tab");
            var contentBox = select_box.find(".select-panel-content");
            var listBox;
            var tabList = contentBoxList = "";
            if (tabNum) {
                var column = tabNum;
                if (o.maxLevel != 0) {
                    column = o.maxLevel;
                }
                var width = (100 / column).toFixed(2) + "%";
                for (var i = 0; i < column; i++) {
                    if (o.maxLevel == 0 || (o.maxLevel != 0 && i < o.maxLevel)) {
                        tabList += "<li data-index='" + i + "' style='width: " + width + ";'><a>" + o.tabs[i] + "</a></li>";
                        contentBoxList += "<ul data-index='" + i + "' class='select-panel-content-box clearfix' data-list='" + o.tabs[i] + "'></ul>";
                    }
                }
                tabBox.html(tabList);
                contentBox.html(contentBoxList);
                getData();
                // tabBox.find("li").click();
            }
            listBox = contentBox.find(".select-panel-content-box:eq(0)");

            function getData() {
                if (o.maxLevel == 0 || (o.maxLevel != 0 && level < o.maxLevel)) {
                    $.fn.ajax({
                        url: o.url,
                        data: o.data,
                        success: function(data) {
                            if (data.code == 200) {
                                var list = "";
                                var index = parseInt(listBox.attr("data-index"));
                                level++;
                                var _data = eval("data." + o.result.join('.'));
                                $.each(_data, function(i, datas) {
                                    list += "<li data-id='" + datas[o.params.id] + "' data-arg='" + datas[o.params.arg] + "'><a>" + datas[o.label] + "</a></li>";
                                });
                                listBox.html(list);
                                if (o.default.length && isLoad) {
                                    getActiveItems(index);
                                }
                                getSelectItem();
                                // 如果子级无数据则隐藏面板
                                if (_data.length == 0) {
                                    hidePanel();
                                    return;
                                }
                                tabBox.find("li").removeClass("active");
                                tabBox.find("[data-index=" + index + "]").addClass("active");
                                contentBox.find(".select-panel-content-box").removeClass("active");
                                listBox.addClass("active");
                            }
                        }
                    });
                }
            }

            function getActiveItems(index) {
                var _listBox = "";
                var _id = o.default[index];
                _listBox = contentBox.find(".select-panel-content-box:eq(" + index + ")");
                var _activeItem = "";
                var getActiveItem = setInterval(function() {
                    _activeItem = _listBox.find("[data-id=" + _id + "]");
                    if (_activeItem != 0) {
                        _activeItem.click();
                        // 获取到最后一项停止加载
                        if (index == o.default.length - 1) {
                            isLoad = false;
                            defaultLabel = getSelectItem();
                            tabBox.find("li").eq(index).click();
                        }
                        clearInterval(getActiveItem);
                    }
                }, 0);
            }

            function getSelectItem() {
                var selectItem = contentBox.find(".select-panel-content-box").children(".active");
                var _length = selectItem.length;
                var selectText = [];
                resultObj = {}
                for (var i = 0; i < _length; i++) {
                    selectText.push($.trim($(selectItem[i]).text()));
                    resultObj[o.fields[i]] = $(selectItem[i]).attr("data-arg");
                    if (isArrField) {
                        obj.find("input[name=" + o.fields[i] + "]").val($(selectItem[i]).attr("data-arg"));
                    } else if (i == _length - 1) {
                        obj.find("input[name]").val($(selectItem[_length - 1]).attr("data-arg"));
                    }
                }
                var labels = selectText.join(o.connector);
                input.val(labels);
                return labels;
            }

            if (o.disabled) {
                obj.find("input[type=text]").attr("disabled", true);
            } else {
                // 清空
                obj.on("click", ".clearInput", function(e) {
                    e.preventDefault();
                    var _this = $(this);
                    _this.siblings("input").val("");
                    contentBox.find(".select-panel-content-box").children(".active").removeClass("active");
                });
                // 重置
                obj.on("click", ".resetInput", function(e) {
                    e.preventDefault();
                    isLoad = true;
                    // 面板恢复原始值
                    // input.val(defaultLabel);
                    // inputArg.val(defaultIds);
                    getActiveItems(0);
                });
                // 激活面板
                obj.on("click", "input[type=text]", function(e) {
                    e.stopPropagation();
                    obj.addClass("is-focus").find(".select-panel").show();
                });
            }

            // 点击X级TAB切换
            tabBox.on("click", "li", function(e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = $(this);
                var _index = parseInt(_this.attr("data-index"));
                tabBox.find("li").removeClass("active");
                _this.addClass("active");
                contentBox.find(".select-panel-content-box").removeClass("active");
                contentBox.find(".select-panel-content-box:eq(" + _index + ")").addClass("active");
            });
            // 点击数据列表筛选下一级数据
            contentBox.on("click", "li", function(e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = $(this);
                var _currentList = _this.parent();
                var _index = parseInt(_currentList.attr("data-index"));
                var _nextList = _currentList.nextAll(".select-panel-content-box");
                _this.addClass("active");
                _this.siblings("li").removeClass("active");
                var currentLabel = getSelectItem();
                obj.attr("title", currentLabel);
                if (_nextList.length != 0) {
                    // 重置子级数据
                    _nextList.html("");
                    $.each(o.fields, function(index, field) {
                        if (index > _index) {
                            obj.find("input[name=" + field + "]").val("");
                            resultObj[field] = null;
                        }
                    });
                    listBox = contentBox.find(".select-panel-content-box:eq(" + (_index + 1) + ")");
                    o.data[o.params.pId] = _this.attr("data-id");
                    getData();
                } else {
                    hidePanel();
                }
                o.onselect(resultObj);
            });

            // 隐藏面板
            $(document).click(function() {
                hidePanel();
            });

            function hidePanel() {
                obj.removeClass("is-focus").find(".select-panel").hide();
                input.blur();
            }
        });
    }
})(jQuery);