import { useEffect, useState } from 'react'

const marginBottomData = {
  small: 'mb-3 lg:mb-8',
  medium: 'mb-10 lg:mb-20',
  large: 'mb-20 lg:mb-40',
  none: 'mb-0',
}

const marginTopData = {
  small: 'mt-3 lg:mt-8',
  medium: 'mt-10 lg:mt-20',
  large: 'mt-20 lg:mt-40',
  none: 'mt-0',
}

export const useSpacer = (props: {
  paddingBottom: string
  paddingTop: string
}) => {
  const [marginBottom, setMarginBottom] = useState<string>('')
  const [marginTop, setMarginTop] = useState<string>('')

  useEffect(() => {
    switch (props.paddingBottom) {
      case 'small':
        setMarginBottom(marginBottomData.small)
        break
      case 'medium':
        setMarginBottom(marginBottomData.medium)
        break
      case 'large':
        setMarginBottom(marginBottomData.large)
        break
      case 'none':
        setMarginBottom(marginBottomData.none)
        break
    }
  }, [props])

  useEffect(() => {
    switch (props.paddingTop) {
      case 'small':
        setMarginTop(marginTopData.small)
        break
      case 'medium':
        setMarginTop(marginTopData.medium)
        break
      case 'large':
        setMarginTop(marginTopData.large)
        break
      case 'none':
        setMarginTop(marginTopData.none)
        break
    }
  }, [props])

  return [marginBottom, marginTop]
}
