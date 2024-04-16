interface PaginationInfo {
  current_page: number
  total: number
  per_page: number
}

export default interface PaginatedResponse <T> {
  data: T[]
  pagination: PaginationInfo
}
