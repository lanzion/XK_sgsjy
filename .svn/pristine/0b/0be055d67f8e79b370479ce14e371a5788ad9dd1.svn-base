import baseUrl from '@/js/common-config.js'
import getBaseUrl from '@/js/getBaseUrl.js'
import { loginInfo } from '@/js/getUserInfo.js'

function beforeUploadFile () {
    // let baseUrl = location.href.slice(0, location.href.indexOf(location.hash));
    // let html = location.origin + '/upload/ckpg.html'
    let html = getBaseUrl() + '/upload/ckpg.html'
    let uploadFile = $('#uploadFile')
    uploadFile.click()
    uploadFile.change(function (){
        let uploadApi = baseUrl.httpConfig.baseURL + baseUrl.httpConfig.path + baseUrl.fileUpload
        $.ajax({
            url: uploadApi,
            async: false,
            data:{},
            headers:{"token": loginInfo ? loginInfo.token : ''},
            success:function(res){
                let token = res.token[0]
                $('#upload_form_id').attr('action', res.tUrl)
                $('#upload_form_id').find("[name=token]").val(token);
                $('#redirectUrl').val(html);
                $('#upload_form_id').submit()
                uploadFile.remove()
                $('#upload_form_id').prepend('<input type="file" name="file" id="uploadFile" style="display:none"/>');
            }
        })
    })
}

export { beforeUploadFile }

