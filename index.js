module.exports = function (element) {
  if (
    element.ownerDocument.designMode &&
    element.ownerDocument.designMode.toLowerCase() === 'on'
  ) {
    return true
  }

  switch (element.tagName.toLowerCase()) {
    case 'input':
      return true
    case 'textarea':
      return true
  }

  if (isContentEditable(element)) {
    return true
  }

  return false
}

function isContentEditable (element) {
  if (
    element.contentEditable &&
    element.contentEditable.toLowerCase() === 'true'
  ) {
    return true
  }
  if (
    element.contentEditable &&
    element.contentEditable.toLowerCase() === 'inherit' &&
    element.parentNode
  ) {
    return isContentEditable(element.parentNode)
  }
  return false
}
