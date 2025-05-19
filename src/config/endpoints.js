export const endpoints = {
  account: {
    login: "api/v1/admin/login",
    logout: "api/v1/admin/logout",
    add_user: "api/v1/admin/add",
    user: "api/v1/admin/me",
    users_list: "api/v1/admin/accounts",
  },
  restaurant: {
    list: "api/v1/resturant",
    add: "api/v1/resturant/add",
    update: "api/v1/resturant",
  },
  feature: {
    image: "api/v1/cloudinary/upload-images",
    list: "api/v1/featuredItems",
  },
  coupans: {
    list: "api/v1/coupon/coupons",
    add: "api/v1/coupon/coupon",
    delete: "api/v1/coupon/coupon",
  },
  enquiry: {
    list: "api/v1/feedback",
  },
  item: {
    add: "api/v1/item",
    getDetail: "api/v1/item",
    update: "api/v1/item",
  },
  stations: {
    list: "api/v1/station",
    add: "api/v1/station",
  },
  vendors: {
    list: "api/v1/vendor/all",
    add: "api/v1/vendor/add",
    update: "api/v1/vendor",
    updateByid: "api/v1/admin",
  },
  customers: {
    list: "api/v1/admin/customers",
  },
  orders: {
    list: "api/v1/order/admin",
  },
  blog: {
    list: "api/v1/blog/post",
    update : 'api/v1/blog/post',
    detail : 'api/v1/blog/post/get'
  },
  location : {
    list :'api/v1/location/get-locations'
  }
};
