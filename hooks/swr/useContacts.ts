import type { Type } from "globals/Contacts"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const useContacts = (locale?: string) => {
  return useSWR<Type>(locale !== undefined ? "/api/globals/contacts?locale=" + locale : "/api/globals/contacts", fetcher)
}
