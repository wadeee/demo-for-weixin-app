const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.322520,
  iconPath: '/image/location.png',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center'
  },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.323520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS'
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.324520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 10,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.325520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 20,
    display: 'ALWAYS',
  },
}

const allMarkers = [normalCallout, customCallout1, customCallout2, customCallout3]

Page({
  data: {
    latitude: 23.096994,
    longitude: 113.324520,
    markers: [],
    customCalloutMarkerIds: [],
    num: 1,
    mapCtx: undefined as any,
  },
  onReady() {
    this.setData({mapCtx: wx.createMapContext('myMap')})
  },

  addMarker() {
    const markers: any = allMarkers
    this.setData({
      markers: markers as never[],
      customCalloutMarkerIds: [2,3,4] as never[],
    })
  },

  removeMarker() {
    this.setData({
      markers: [],
      customCalloutMarkerIds: []
    })
  },

  changeMarkerId() {
    const customCalloutMarkerIds = this.data.customCalloutMarkerIds.slice()
    const top: any = customCalloutMarkerIds.shift()
    customCalloutMarkerIds.push(top as never)

    this.setData({
      customCalloutMarkerIds
    })
  },
  markertap(e: any) {
    console.log('@@@ markertap', e)
  },
  callouttap(e: any) {
    console.log('@@@ callouttap', e)
  },
  labeltap(e: any) {
    console.log('@@@ labeltap', e)
  },
  translateMarker: function () {
    const length = this.data.markers.length
    if (length === 0) return

    const index = Math.floor(Math.random() * length)
    const markers: any[] = this.data.markers
    const marker = markers[index]
    marker.latitude = marker.latitude + 0.002
    marker.longitude = marker.longitude + 0.002
    const that = this
    this.data.mapCtx.translateMarker({
      markerId: marker.id,
      duration: 1000,
      destination: {
        latitude: marker.latitude,
        longitude: marker.longitude
      },
      animationEnd() {
        that.setData({markers: markers as never[]})
        console.log('animation end')
      },
      complete(res: any) {
        console.log('translateMarker', res)
      }
    })
  },
  changeContent() {
    const num = Math.floor(Math.random() * 10)
    this.setData({num})
  }
})
