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

export const CardRoutes = {
  GetCard: '/v0/organigation/:organizationId/card',
  AddCardPoint: 'v0/organization/:organization/card/point',
  RedeemCardPoint: '/card/:cardId/redeem',
}

// Get all cards for a user
export const getCards = async (orgId: string): Promise<Card[]> => {
  const response = await axiosInstance.get<Card[]>(
    CardRoutes.GetCard.replace(':organizationId', orgId)
  )
  return response.data
}

// Get card by card id
interface GetCardByIdResponse { card: Card }
export const getCardById = async (
  cardId: string
): Promise<GetCardByIdResponse> => {
  const response = await axiosInstance.get<GetCardByIdResponse>(
    CardRoutes.GetCard.replace(':cardId', cardId)
  )
  return response.data
}

// Add points to a card
export const addCardPoint = async (
  cardId: string,
  points: number
) => {
  const response = await axiosInstance.post(
    CardRoutes.AddCardPoint.replace(':cardId', cardId),
    { points: points }
  )
  return response.data
}


export const redeemCardPoint = async (
  cardId: string,
  points: number
) => {
  const response = await axiosInstance.post(
    CardRoutes.RedeemCardPoint.replace(':cardId', cardId),
    { points: points }
  )
  return response.data
}
