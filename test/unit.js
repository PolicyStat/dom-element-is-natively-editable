/* eslint-env mocha */

import chai from 'chai'
chai.should()
import jsdom from 'jsdom'
import isEditable from '..'

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
        // because jsdom doesn't populate this property by default while browsers do
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
  context('provided element in which `contentEditable` inheritance was overridden in parent', () => {
    it('sync returns false', (done) => {
      jsdom.env('<div><div id="parent"><p>`contentEditable` inheritance overridden in parent</p></div></div>', (err, {document}) => {
        if (err) {
          return
        }
        const container = document.querySelector('div')
        container.contentEditable = 'true'
        const parent = document.querySelector('#parent')
        parent.contentEditable = 'false'
        const element = document.querySelector('p')
        // because jsdom doesn't populate this property by default while browsers do
        element.contentEditable = 'inherit'
        isEditable(element).should.be.false
        done()
      })
    })
  })
  context('provided an `input` element', () => {
    // this list of types is kind of a guess based on:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    ;['text', 'email', 'password', 'search', 'tel', 'url'].forEach((type) => {
      context(`that is of type \`${type}\``, () => {
        it('sync returns true', (done) => {
          jsdom.env(`<input type="${type}">${type} input</input>`, (err, {document}) => {
            if (err) {
              return
            }
            const element = document.querySelector('input')
            isEditable(element).should.be.true
            done()
          })
        })
      })
    })
    context('that is not of an editable type (`radio`)', () => {
      it('sync returns false', (done) => {
        jsdom.env('<input type="radio">radio input</input>', (err, {document}) => {
          if (err) {
            return
          }
          const element = document.querySelector('input')
          isEditable(element).should.be.false
          done()
        })
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
