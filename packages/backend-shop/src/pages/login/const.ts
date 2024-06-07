import CryptoJS from 'crypto-js'

export function encryptPassword(password: string) {
  const srcs = CryptoJS.enc.Utf8.parse(password)
  const key = CryptoJS.enc.Utf8.parse('sdidASE5F41S5Dm7')
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString()

  return encrypted
}