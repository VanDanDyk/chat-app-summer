import axios from 'axios'
import { SERVER_URL } from '../../utils/config'

const CHAT_URL = `${SERVER_URL}/chats`
const config = { withCredentials: true }

export const fetchChatsAPI = async () =>
	axios.get(CHAT_URL, config).then(res => res.data)

export const fetchMessagesAPI = async chatId =>
	axios.get(`${CHAT_URL}/${chatId}/messages`, config).then(res => res.data)

export const createChatAPI = async payload =>
	axios.post(CHAT_URL, payload, config).then(res => res.data)

export const createGroupChatAPI = async payload =>
	axios.post(`${CHAT_URL}/group`, payload, config).then(res => res.data)

export const joinPublicChatAPI = async chatId =>
	axios.post(`${CHAT_URL}/${chatId}/join-public`, {}, config).then(res => res.data)

export const joinPrivateChatAPI = async (chatId, password) =>
	axios
		.post(`${CHAT_URL}/${chatId}/join-private`, { password }, config)
		.then(res => res.data)

export const getChatByIdAPI = async chatId => {
	const res = await axios.get(`${CHAT_URL}/${chatId}`, config)
	return res.data
}
