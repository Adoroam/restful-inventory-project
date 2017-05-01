// define angular app
const app = angular.module('app', [])

// service for fetching api data
// app.factory('dbget', function ($http) {
//   return $http.post('/db')
// })

// controller
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
      price: prod.price || 0
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
    console.log(item)
    db.put('products', item).then(prod.refresh()).then(function () {
      prod.mode = 'new'
    })
  }
  // NOTE: MODES
  prod.clear = function () {
    prod.name = ''
    prod.sku = ''
    prod.price = ''
  }
  prod.refresh = function () {
    db.get('products').then(function (d) {
      prod.items = d.data
    })
  }
  prod.refresh()
  // db functions
}])
