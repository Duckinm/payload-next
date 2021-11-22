import type { Type } from "globals/Settings"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useSettings = (locale?: string) => {
  return useSWR<Type>(locale !== undefined ? "/api/globals/settings?locale=" + locale : "/api/globals/settings", fetcher)
}
