export function downloadFile (fileName, content, options = {}) {
  const link = document.createElement('a')
  const blob = new Blob([content], options)
  link.download = fileName
  link.href = URL.createObjectURL(blob)
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', false, false)
  link.dispatchEvent(event)
}

/**
 * 下载 blob 格式文件
 * @param {*} blob 
 * @param {*} filename 
 * @return {Undefined}
 */
export const downloadBlob = (blob, filename = '') => {
  if ('download' in document.createElement('a')) {
    const a = document.createElement('a')
    a.download = filename
    a.style.display = 'none'
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  } else {
    navigator.msSaveBlob(blob, filename)
  }
}

/**
 * 下载 excel
 */
export const downloadExcel = function (fileName, content) {
  return downloadFile(fileName, content, {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  })
}


/**
 * 下载 base64 格式文件
 * @param {*} base64 
 * @param {*} filename 
 * @return {Promise<any>}
 */
export const downloadBase64 = async (base64, filename = '') => {
  const response = await fetch(base64)
  const blob = await response.blob()
  return downloadBlob(blob, filename)
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => resolve(e.target.result)
    reader.onerror = err => reject(err)
  })
}

export const base64ToFile = (base64, filename )=> {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1] ;// 图片后缀
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

export const base64ToBlob = base64 => {
let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}