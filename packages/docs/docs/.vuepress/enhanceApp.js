export default ({
  Vue,
  options,
  router,
  siteData,
}) => {
  Vue.prototype.$mapbox = {
    ready: false,
    token: 'pk.eyJ1IjoiY2RzZi1kZXYiLCJhIjoiY2oyMXBoMW5oMDAxMjMzbzZmbmJneTg4dSJ9.KDL5Hp8S5Rmtlt5IW3fAvw',
  };
}
