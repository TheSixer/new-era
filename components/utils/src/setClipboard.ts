/**
 * 设置粘贴板内容
 *
 * 将文本设置到剪切板上
 *
 * @support H5
 */
export function setClipboard(value: string) {
  const createInput = document.createElement('input')
  createInput.value = value
  document.body.appendChild(createInput)
  createInput.style.position = 'fixed'
  createInput.style.left = '10000px'
  createInput.style.top = '10000px'
  createInput.select()
  document.execCommand('Copy')
  document.body.removeChild(createInput)
}
