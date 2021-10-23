export interface Country {
  name?: string
  code?: string
}

export interface Representative {
  name?: string
  image?: string
}

export interface Customer {
  id?: number
  name?: string
  country?: Country
  company?: string
  date?: string
  status?: string
  activity?: number
  representative?: Representative
}

export interface Product {
  id?: string
  code?: string
  name?: string
  description?: string
  price?: number
  quantity?: number
  inventoryStatus?: string
  category?: string
  image?: string
  rating?: number
}

export interface ChatMessage {
  message: string
  timestamp: string
  seen: boolean
  channel: string
  deleted: false
  sender: number,
  conversation: number

}
//
export interface ChatUser {
  first_name: string,
  last_name: string,
  email: string
}
//
// export interface Conversation {
//   created_at: string,
//   deleted: false,
//   participant_1: ChatUser,
//   participant_2: ChatUser
// }
