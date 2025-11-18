!(function () {
  var e = document.createElement('div')
  e.id = 'myAliceWebChat'
  var t = document.createElement('script')
  ;(t.type = 'text/javascript'),
    (t.async = !0),
    (t.src = 'https://livechat.myalice.ai/index.js')
  var a = document.body.getElementsByTagName('script')
  ;(a = a[a.length - 1]).parentNode.insertBefore(t, a),
    a.parentNode.insertBefore(e, a),
    t.addEventListener('load', function () {
      MyAliceWebChat.init({
        selector: '#myAliceWebChat',
        platformId: '24977',
        primaryId: '5e663b603a0a11f0ba4116cf2cde8d30',
        token: 'ede2e3b2bd80eff6479cf6201f350d2a673362018399a760',
      })
    })
})()
