type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

export const pageview = (url: URL, id: string): void => {
  window.gtag('config', id, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
