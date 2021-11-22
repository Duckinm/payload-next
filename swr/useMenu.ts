import type { Type } from "globals/Menu"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useMenu = (locale?: string) => {
  return useSWR<Type>("/api/globals/menu" + locale, fetcher)
}
