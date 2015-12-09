# dom-element-is-natively-editable

Exports a single function
that synchronously returns `true`
if the provided DOM element is
supposed to be
natively editable.

For, example,
will return `true` provided
an `input` or `textarea` element
or any element
that has `contentEditable` turned on
or that is in a `document` that has `designMode` turned on.
