(function($) {

    var API = {
        INITPROCONFIG: 'sso/single/initProConfig',
        GETINITREGION: 'sso/single/selectList',
        GETSCHOOLBYREGION: 'sso/single/getComboxByArea',
        GETCLASSBYSCHOOL: 'sso/single/class/all',
        GETSSOJOIN: 'sso/single/join',
        ADDSSORELATION: 'sso/single/addSingleRelation'
    };

    var $form = $('#ssoForm');
    var form = {
        tpkey: '',
        joinDate: new Date(),
        schoolId: '',
        gradeId: '',
        classId: ''
    };
    var userType = 1; // user identity: 1 - teacher, 0 - student, 6/7/9 - orgManager

    var $__selectClass = $('#select-class').html();

    comboSelect('#select-school');
    comboSelect('#select-class');

    $.fn.ajax({
        url: API.INITPROCONFIG,
        success: function(data) {
            if (data.code == 200) {
                // 1:省  2:市  3:县  4:全国
                var REGIONLEVEL = parseInt(data.appendInfo.initType) || 4;
                var maxLevel = {
                    1: 2,
                    2: 1,
                    3: 1,
                    4: 3
                }[REGIONLEVEL] || 3;
                var tabs = ['省份', '城市', '区县'];
                var fields = ['provinceId', 'cityId', 'areaId'];
                tabs.splice(0, 3 - maxLevel);
                fields.splice(0, 3 - maxLevel);

                // 区域弹框
                $('#region').selectPanel({
                    url: API.GETINITREGION,
                    data: { pcode: -1 },
                    params: { pId: 'pcode', id: 'code' },
                    result: ['appendInfo', 'list'],
                    tabs: tabs,
                    fields: fields,
                    onselect: function(val) {
                        getSchoolList(val);
                    }
                });
            }
        }
    })

    // 表单验证
    $form.validate({
        rules: {
            schoolId: 'required',
            classId: 'required',
        },
        messages: {
            schoolId: '请选择您的学校',
            classId: '请选择您的班级',
        },
        submitHandler: addRelation
    });

    $form.ajax({
        url: API.GETSSOJOIN,
        data: $.fn.getQueryString(),
        loading: true,
        success: function(data) {
            if (data.code == 200) {
                var data = data.appendInfo || {};

                setCookie('token', data.token, data.timeOut, config.domain);
                setCookie('uid', data.userInfo.id, data.timeOut, config.domain);

                window.location.href = pages.index;
            } else if (data.code == 209) {
                var data = data.appendInfo || {};
                form.tpkey = data.tpkey;
                userType = parseInt(data.userType);

                switch(userType) {
                    // teacher
                    case 1:
                        $('#sso-form-class').css('display', 'none');
                        break;
                    // school
                    case 9:
                        $('#sso-form-class').css('display', 'none');
                        addRelation();
                        break;
                    // education
                    case 6:
                    case 7:
                    case 10:
                        $('#sso-form-class, #sso-form-school').css('display', 'none');
                        addRelation();
                        break;
                }
            } else {
                alert(data.msg);
            }
        }
    })

    getSchoolList();

    function getSchoolList(params) {
        params == undefined ? {} : params;
        $.fn.ajax({
            url: API.GETSCHOOLBYREGION,
            data: params,
            success: function(data) {
                if (data.code == 200) {
                    var $options = '<option value="">请选择您的学校</option>';
                    var result = data.appendInfo.comboxList;
                    if (result.length) {
                        $.each(result, function(i, x) {
                            $options += '<option value="' + x.id + '">' + x.schoolName + '</option>';
                        })
                    }

                    comboSelect('#select-school', $options);
                    comboSelect('#select-class', $__selectClass);
                }
            }
        })
    }

    function getClassList(schoolId) {
        schoolId == undefined ? '' : schoolId;
        $.fn.ajax({
            url: API.GETCLASSBYSCHOOL,
            data: {
                schoolId: schoolId
            },
            success: function(data) {
                if (data.code == 200) {
                    var $options = '<option value="">请选择您的班级</option>';
                    var result = data.entity;
                    if (result.length) {
                        $.each(result, function(i, x) {
                            $options += '<option value="' + x.gradeId + ',' + x.id + '">' + x.className + '</option>';
                        })
                    }

                    comboSelect('#select-class', $options);
                }
            }
        })
    }

    function comboSelect(el, content) {
        content && $(el).html(content);
        $(el).comboSelect({
            comboClass: 'form-item-select combo-select',
            inputClass: 'form-input__inner'
        });
    }

    $('#select-school').change(function(e, v) {
        form.schoolId = e.target.value;
        getClassList(e.target.value);
    })
    $('#select-class').change(function(e, v) {
        var value = e.target.value.split(',');
        form.gradeId = value[0];
        form.classId = value[1];
        console.log(form)
    });

    // 提交表单
    function addRelation() {
        switch(userType) {
            case 1:
            case 9:
                delete form.gradeId;
                delete form.classId;
                break;
            case 6:
            case 7:
            case 10:
                delete form.gradeId;
                delete form.classId;
                delete form.schoolId;
                break;
        }
        $form.ajax({
            url: API.ADDSSORELATION,
            data: form,
            loading: true,
            success: function(data) {
                if (data.code == 200) {
                    var data = data.appendInfo || {};

                    setCookie('token', data.token, data.timeOut, config.domain);
                    setCookie('uid', data.userInfo.id, data.timeOut, config.domain);

                    window.location.href = pages.index;
                } else {
                    alert(data.msg);
                }
            }
        })
    }

    function setCookie(key, value, timeout, domain) {
        var val = key + '=' + value;

        var expires = 'expires=' + new Date(new Date().getTime() + timeout * 1000).toGMTString();

        if (domain === undefined) {
            domain = window.location.hostname;

            var _index = domain.indexOf('.');
            domain = ~_index ? domain.substr(_index) : domain;
        }
        domain = 'domain=' + domain

        document.cookie = [val, expires, domain].join(';');
    }

})(jQuery);