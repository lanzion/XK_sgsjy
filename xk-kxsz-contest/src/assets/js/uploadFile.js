import baseUrl from 'Asset/js/common-config.js'
import getBaseUrl from 'Asset/js/getBaseUrl.js'
import { loginInfo } from 'Asset/js/getUserInfo.js'

function beforeUploadFile() {
    // let baseUrl = location.href.slice(0, location.href.indexOf(location.hash));
    // let html = location.origin + '/upload/ckpg.html'
    const html = getBaseUrl() + '/upload/ckpg.html'
    const uploadFile = $('#uploadFile')
    uploadFile.click()
    uploadFile.change(function () {
        const uploadApi = baseUrl.httpConfig.baseURL + baseUrl.httpConfig.path + baseUrl.fileUpload
        $.ajax({
            url: uploadApi,
            async: false,
            data: {},
            headers: { token: loginInfo ? loginInfo.token : '' },
            success: function (res) {
                const token = res.token[0]
                $('#upload_form_id').attr('action', res.tUrl)
                $('#upload_form_id').find('[name=token]').val(token)
                $('#redirectUrl').val(html)
                $('#upload_form_id').submit()
                uploadFile.remove()
                $('#upload_form_id').prepend('<input type="file" name="file" id="uploadFile" style="display:none"/>')
            }
        })
    })
}

export default { beforeUploadFile }

