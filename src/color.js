export const hexToRGBA = function (hex, alpha = 1) {
  var r = parseInt(hex.slice(1, 3), 16)
  var g = parseInt(hex.slice(3, 5), 16)
  var b = parseInt(hex.slice(5, 7), 16)

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
}