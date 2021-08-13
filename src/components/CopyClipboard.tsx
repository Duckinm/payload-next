import { useEffect } from 'react'
import { Copy } from 'react-feather'
import { toast } from 'react-hot-toast'
import { useCopyToClipboard } from 'src/hooks/useCopy'

export const CopyUrlButton = ({ url }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url)

  useEffect(() => {
    if (copyUrlStatus === 'copied') {
      toast.success('Copied Url')
    } else if (copyUrlStatus === 'failed') {
      toast.error('Copy Failed.')
    }
  }, [copyUrlStatus])

  return (
    <div onClick={copyUrl} className="cursor-pointer">
      <Copy />
    </div>
  )
}
