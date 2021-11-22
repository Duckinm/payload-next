import type { Type } from "globals/Settings"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useSettings = () => {
  const { data, error } = useSWR<Type>("/api/globals/settings", fetcher)

  return { data, error }
}
