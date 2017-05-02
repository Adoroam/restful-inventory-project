// define angular app
const app = angular.module('app', ['ngRoute'])

// routes
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider
      .when('/', {
        redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl as home'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'prodCtrl as prod'
      })
      .when('/404', {
        templateUrl: 'views/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      })
}])

// NOTE: HOME CTRL
app.controller('homeCtrl', ['$location', function ($location) {
  const home = this
  if ($location.search()) {
        // find query to convert
    var addr = $location.search()
    addr = addr.redirect
    $location.path(addr)
        // remove query from path
    var url = $location.url()
    var qy = url.indexOf('?')
    var str = url.substring(0, qy)
    $location.url(str)
  };
}])

// NOTE: PROD CTRL
app.controller('prodCtrl', ['$scope', '$http', function ($scope, $http) {
  let prod = this
  prod.mode = 'new'

  const db = {
    get: function (type, id) {
      if (id) {
        return $http.get(`/api/${type}/${id}`)
      } else { return $http.get(`/api/${type}`) }
    },
    post: function (type, item) { return $http.post(`/api/${type}`, item) },
    put: function (type, item) { return $http.put(`/api/${type}/${item._id}`, item) },
    del: function (type, id) { return $http.delete(`/api/${type}/${id}`) }
  }
  // NOTE: SAVE
  prod.save = function () {
    let item = {
      name: prod.name || 'unnamed',
      sku: prod.sku || 'no sku',
      price: prod.price || 0,
      qty: prod.qty || 1
    }
    db.post('products', item).then(prod.refresh()).then(prod.clear())
  }
  // NOTE: DELETE
  prod.delete = function (id) {
    db.del('products', id).then(prod.refresh()).then(prod.clear())
  }
  // NOTE: EDIT
  prod.edit = function (id) {
    db.get('products', id).then(function (d) {
      prod.editItem = d.data
      prod.mode = 'edit'
    })
  }
  prod.update = function () {
    let item = prod.editItem
    db.put('products', item).then(prod.refresh()).then(function () {
      prod.mode = 'new'
    })
  }
  // NOTE: MODES
  prod.clear = function () {
    prod.name = ''
    prod.sku = ''
    prod.price = ''
    prod.qty = ''
  }
  prod.refresh = function () {
    db.get('products').then(function (d) {
      prod.items = d.data
    })
  }
  prod.refresh()
}])

// NOTE: POS CTRL
app.controller('posCtrl', ['$scope', '$http', function ($scope, $http) {
  const pos = this
  const db = {
    get: function (type, id) {
      if (id) {
        return $http.get(`/api/${type}/${id}`)
      } else { return $http.get(`/api/${type}`) }
    },
    getSku: function (sku) {
      return $http.get(`/api/products?sku=${sku}`)
    },
    post: function (type, item) { return $http.post(`/api/${type}`, item) },
    put: function (type, item) { return $http.put(`/api/${type}/${item._id}`, item) },
    del: function (type, id) { return $http.delete(`/api/${type}/${id}`) }
  }

}])
