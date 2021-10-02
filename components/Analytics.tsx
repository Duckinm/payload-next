import Script from 'next/script'

interface Props {
  googleAnalytics?: any
  googleTagManager?: any
}

const Analytics = ({ googleAnalytics, googleTagManager }: Props) => {
  return (
    <>
      {googleTagManager && (
        <Script async id="gtm1" strategy="lazyOnload">
          {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${googleTagManager}');
          `}
        </Script>
      )}
      {googleAnalytics && (
        <>
          <Script
            async
            id="ga1"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
          />

          <Script strategy="lazyOnload" id="ga2">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${googleAnalytics}');
        `}
          </Script>
        </>
      )}
    </>
  )
}

export default Analytics
