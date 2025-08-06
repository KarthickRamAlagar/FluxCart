export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      // for banner image
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      // for button text
      name: 'buttonText',
      title: 'ButtonText',
      type: 'string',
    },
    {
      // for product
      name: 'product',
      title: 'Product',
      type: 'string',
    },
    {
      // for description
      name: 'desc',
      title: 'Desc',
      type: 'string',
    },
    {
      // for small text
      name: 'smallText',
      title: 'SmallText',
      type: 'string',
    },
    {
      //for medium text
      name: 'midText',
      title: 'MidText',
      type: 'string',
    },
    {
      //for large text
      name: 'largeText1',
      title: 'LargeText1',
      type: 'string',
    },
    {
      name: 'largeText2',
      title: 'LargeText2',
      type: 'string',
    },
    {
      // for discount
      name: 'discount',
      title: 'Discount',
      type: 'string',
    },
    {
      //for saletime
      name: 'saleTime',
      title: 'SaleTime',
      type: 'string',
    },
  ],
}
