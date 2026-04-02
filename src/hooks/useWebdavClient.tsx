import { createClient, WebDAVClient } from 'webdav'

const clientCache = new Map<string, WebDAVClient>()

export default (props: any): WebDAVClient => {
	const { location, username, password } = props || {}
	const cacheKey = `${location}:${username}`

	if (clientCache.has(cacheKey)) {
		return clientCache.get(cacheKey)!
	}

	const client = createClient(location, {
		username: username,
		password: password,
	})

	clientCache.set(cacheKey, client)
	return client
}
