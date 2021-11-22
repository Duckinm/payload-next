import type { Type } from "globals/Settings"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useSettings = (locale?: string) => {
  return useSWR<Type>("/api/globals/settings" + locale, fetcher)
}
