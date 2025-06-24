import axios from 'axios'
const CHAT_URL = 'http://localhost:3000/chats'

const config = { withCredentials: true }

export const fetchChatsAPI = async () =>
	axios.get(CHAT_URL, config).then(res => res.data)

export const fetchMessagesAPI = async chatId =>
	axios.get(`${CHAT_URL}/${chatId}/messages`, config).then(res => res.data)

export const createChatAPI = async payload =>
	axios.post(CHAT_URL, payload, config).then(res => res.data)

export const joinPublicChatAPI = async chatId =>
	axios.post(`${CHAT_URL}/${chatId}/join-public`, {}, config).then(res => res.data)

export const joinPrivateChatAPI = async (chatId, password) =>
	axios
		.post(`${CHAT_URL}/${chatId}/join-private`, { password }, config)
		.then(res => res.data)
