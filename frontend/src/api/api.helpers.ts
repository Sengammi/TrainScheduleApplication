export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const errorCatch = (err: any): string => {
	return err.response && err.response.data
	? typeof err.response.data.message === 'object'
	  ? err.response.data.message[0]
	  : err.response.data.message
	:err.message
}