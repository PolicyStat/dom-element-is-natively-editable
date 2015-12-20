export default function (element) {
  if (
    element.ownerDocument.designMode &&
    element.ownerDocument.designMode.toLowerCase() === 'on'
  ) {
    return true
  }

  switch (element.tagName.toLowerCase()) {
    case 'input':
      return isEditableInput(element)
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

function isEditableInput (input) {
  switch (input.type) {
    case 'text':
      return true
    case 'email':
      return true
    case 'password':
      return true
    case 'search':
      return true
    case 'tel':
      return true
    case 'url':
      return true
    default:
      return false
  }
}
