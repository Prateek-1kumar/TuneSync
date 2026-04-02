import request from '@/helpers/request'
export async function getAccessToken(): Promise<any> {
	const params = new URLSearchParams()
	params.append('grant_type', 'client_credentials')
	params.append('client_id', process.env.SPOTIFY_CLIENT_ID || '')
	params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET || '')
	return request('https://accounts.spotify.com/api/token', {
		method: 'POST',
		data: params,
	})
}
