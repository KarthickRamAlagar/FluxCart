export default {
    //product schema
    name:'product',
    title:"Product",
    type:"document",
    fields:[
        {
            // for images
            name:'image',
            title:"Image",
            type:"array",
            of:[{type:'image'}],
            options:{
                hotspot:true,
            }
        },
        {
            // for product names
            name:'name',
            title:"Name",
            type:"string"
        },
        {
            // for urls
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:'name',
                maxLength:90,
            }
        },
        {
            // for price
            name:"price",
            title:"Price",
            type:"number"
        },
        {
            //for product details
            name:'details',
            title:"Details",
            type:"string"
        }
    ]
}