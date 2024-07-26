import axiosInstance from '../shared/axios-config'

export interface Card {
  cardId: string
  userId: string
  organizationId: string
  googleWalletLink?: string
  backgroundImage?: string
  logo?: string
  issueDate?: Date
  expiryDate?: Date
}

interface CardPoint { points: number }

export const CardRoutes = {
  GetCardById: '/card/:cardId',
  AddCardPoint: '/card/:cardId/point',
  RedeemCardPoint: '/card/:cardId/redeem'
}

// Get card by card id
interface GetCardByIdResponse { card: Card }
export const getCardById = async (
  cardId: string
): Promise<GetCardByIdResponse> => {
  const response = await axiosInstance.get<GetCardByIdResponse>(
    CardRoutes.GetCardById.replace(':cardId', cardId)
  )
  return response.data
}

export const addCardPoint = async (
  cardId: string,
  data: CardPoint
) => {
  const response = await axiosInstance.post(
    CardRoutes.AddCardPoint.replace(':cardId', cardId),
    data
  )
  return response.data
}


export const redeemCardPoint = async (
  cardId: string,
  data: CardPoint
) => {
  const response = await axiosInstance.post(
    CardRoutes.RedeemCardPoint.replace(':cardId', cardId),
    data
  )
  return response.data
}
