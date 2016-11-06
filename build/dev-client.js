/* eslint-disable */
// http://www.ibm.com/developerworks/cn/web/1307_chengfu_serversentevent/
// https://www.npmjs.com/package/eventsource-polyfill
require('eventsource-polyfill')

var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})
