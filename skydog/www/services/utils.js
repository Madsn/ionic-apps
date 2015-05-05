angular.module('skydog.utils', [])

.factory('$localstorage', ['$window', 'lodash', function($window, lodash) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    getEntryById: function(id) {
      id = parseInt(id);
    	return lodash.findWhere(JSON.parse($window.localStorage['entries']), {id:id});
    },
    getNextId: function() {
    	var nextKey = $window.localStorage['keySequence'] || 0;
      nextKey++;
      $window.localStorage['keySequence'] = nextKey;
      return nextKey;
    },
    appendObject: function(key, value) {
      var array = JSON.parse($window.localStorage[key] || '[]');
      array.push(value);
      $window.localStorage[key] = JSON.stringify(array);
    }
  };
}]);
