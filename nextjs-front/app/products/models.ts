export type Product = {
  id: string
  name: string
  description: string
  price: number
  availableToSell: boolean
}
export type ProductRow = {
  id: string
  name: string
  price: number
}

export type PostProductResponse = {
  id: string
  name: string
  description: string
  price: number
  availableToSell: boolean
}

export type GetProductsResponse = {
  content: Product[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}
