import { WebMaxClient } from './dist/index.js'

const client = new WebMaxClient({
	name: 'example_session',
	appVersion: '26.3.9',
})

client.onStart(() => {
	console.log(`✅ вошли как: ${client.me?.fullname || 'user'}`)
})

client.onMessage(async message => {
	if (message.senderId === client.me?.id) return
	await message.reply({
		text: `получил: ${message.text}`,
		cid: Date.now(),
	})
})

client.onError(err => {
	console.error('❌ ошибка:', err?.message || err)
})

client.start().catch(console.error)
