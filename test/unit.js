/* eslint-env mocha */

require('chai').should()
const jsdom = require('jsdom')
const isEditable = require('..')
console.log(isEditable)

describe('dom-element-is-natively-editable', () => {
  context('provided a non editable element', () => {
    it('sync returns false', (done) => {
      jsdom.env('<p>not editable</p>', (err, {document}) => {
        if (err) {
          return
        }
        const element = document.querySelector('p')
        isEditable(element).should.be.false
        done()
      })
    })
  })
  context('provided a `contentEditable` element', () => {
    it('sync returns true', (done) => {
      jsdom.env('<p>`contentEditable`</p>', (err, {document}) => {
        if (err) {
          return
        }
        const element = document.querySelector('p')
        element.contentEditable = 'true'
        isEditable(element).should.be.true
        done()
      })
    })
  })
  context('provided inherited `contentEditable` element', () => {
    it('sync returns true', (done) => {
      jsdom.env('<div><p>inherited `contentEditable`</p></div>', (err, {document}) => {
        if (err) {
          return
        }
        const parent = document.querySelector('div')
        parent.contentEditable = 'true'
        const element = document.querySelector('p')
        // because jsdom doesn't populate this property by default
        // while browsers do
        element.contentEditable = 'inherit'
        isEditable(element).should.be.true
        done()
      })
    })
  })
  context('provided element in which `contentEditable` inheritance was overridden', () => {
    it('sync returns false', (done) => {
      jsdom.env('<div><p>`contentEditable` inheritance overridden</p></div>', (err, {document}) => {
        if (err) {
          return
        }
        const parent = document.querySelector('div')
        parent.contentEditable = 'true'
        const element = document.querySelector('p')
        element.contentEditable = 'false'
        isEditable(element).should.be.false
        done()
      })
    })
  })
  context('provided an `input` element', () => {
    it('sync returns true', (done) => {
      jsdom.env('<input>input</input>', (err, {document}) => {
        if (err) {
          return
        }
        const element = document.querySelector('input')
        isEditable(element).should.be.true
        done()
      })
    })
  })
  context('provided a `textarea` element', () => {
    it('sync returns true', (done) => {
      jsdom.env('<textarea>textarea</textarea>', (err, {document}) => {
        if (err) {
          return
        }
        const element = document.querySelector('textarea')
        isEditable(element).should.be.true
        done()
      })
    })
  })
  context('provided an element that is in a `designMode` document', () => {
    it('sync returns true', (done) => {
      jsdom.env('<p>`document` in `designMode`</p>', (err, {document}) => {
        if (err) {
          return
        }
        document.designMode = 'on'
        const element = document.querySelector('p')
        isEditable(element).should.be.true
        done()
      })
    })
  })
})
