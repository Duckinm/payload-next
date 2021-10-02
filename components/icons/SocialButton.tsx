import { ReactNode } from 'react'
import * as social from 'react-share'

enum ButtonNameEnum {
  EmailShareButton,
  FacebookShareButton,
  // FacebookMessengerShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  // PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
}

type ButtonName = keyof typeof ButtonNameEnum

interface ButtonProps {
  name: ButtonName
  url: string
  children: ReactNode
  className?: string
  description?: string
  quote?: string
  hashtag?: string
}

export default function SocialButton({ name, children, ...rest }: ButtonProps) {
  const ButtonComponent = social[name]

  return <ButtonComponent {...rest}>{children}</ButtonComponent>
}
