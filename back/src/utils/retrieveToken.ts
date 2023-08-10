import {IncomingHttpHeaders} from 'http2'

export const getToken = (headers: IncomingHttpHeaders) => {
  const token = headers['authorization']?.split('Bearer ')?.pop()

  if (!token) {
    throw new Error('Authentication fails. Please, provide a token')
  }

  return token
}
