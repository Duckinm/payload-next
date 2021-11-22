import type { Type } from "globals/Contacts"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useContacts = (locale?: string) => {
  return useSWR<Type>("/api/globals/contacts" + locale, fetcher)
}
