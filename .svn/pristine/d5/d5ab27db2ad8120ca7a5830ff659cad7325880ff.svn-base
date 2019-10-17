export const fileType = {
    methods: {
        judgeFileType(fileName) {
            let expandName = fileName.substr(fileName.lastIndexOf(".")+1)
            let Regexs = {
                picture: (/(jpe?g|gif|png|bmp)$/i),//图片格式
                video: (/(rm|rmvb|wmv|avi|mp4|3gp|mkv|flv|swf|avi)$/i),//视频格式
                audio : (/(flac|mid|ogg|ape|aac|cda|wma|wav|mp3)$/i),//音频格式
                word: (/(docx?|wpt|wps)$/i),// 文档格式
                txt: (/(txt|rtf)$/i),// 文本格式
                zip: (/(zip|rar)$/i),// 压缩格式
                ppt: (/(pptx?|dps|dpt|wpp)$/i),// 演示文档格式
                pdf: (/(pdf)$/i),// pdf格式
                xls: (/(xlsx?|ett?)$/i),// 表格格式
           };
            if(Regexs['picture'].test(expandName)) {
                return 'picture'
            }else if(Regexs['video'].test(expandName)) {
                return 'video'
            }else if (Regexs['audio'].test(expandName)) {
                return 'audio'
            }else if (Regexs['word'].test(expandName)) {
                return 'word'
            }else if (Regexs['txt'].test(expandName)) {
                return 'txt'
            }else if (Regexs['zip'].test(expandName)) {
                return 'zip'
            }else if (Regexs['ppt'].test(expandName)) {
                return 'ppt'
            }else if (Regexs['pdf'].test(expandName)) {
                return 'pdf'
            }else if (Regexs['xls'].test(expandName)) {
                return 'xls'
            }else {
                return 'default'
            }
        }
    }
}
