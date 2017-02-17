Wafse_client.Util.UserAgentDetector = function () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('opera') !== -1) {
      return 'opera';
    } else if (userAgent.indexOf('msie') !== -1) {
      return 'ie';
    } else if (userAgent.indexOf('chrome') !== -1) {
      return 'chrome';
    } else if (userAgent.indexOf('safari') !== -1) {
      return 'safari';
    } else if (userAgent.indexOf('gecko') !== -1) {
      return 'gecko';
    } else {
      return false;
    }
};