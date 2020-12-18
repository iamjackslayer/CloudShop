import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Welcome to CloudShop | {title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Cloud Shop',
  description: 'A marketplace in the cloud',
  keywords: 'buy, electronic, cheap, sale'
}
export default Meta
