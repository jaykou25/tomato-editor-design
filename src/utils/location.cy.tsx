import React from 'react'
import {
  Regular,
  RegularBorder,
  RegularPadding,
  ParentScroll,
} from './location-test-components/index'
import { getRelPosition } from './location'

describe('location.ts', () => {
  describe('getRelPosition', () => {
    it('常规无滚动', () => {
      cy.mount(<Regular />)

      cy.get('#father').then((el) => {
        const father = el[0]

        cy.get('#child').then((el) => {
          const child = el[0]

          const rect = child.getBoundingClientRect()
          const pos = getRelPosition(rect, father)
          expect(pos).to.deep.equal({ left: 50, top: 80 })
        })
      })
    })

    // 如果有border的话, 绝对定位会从border内边开始定位
    it('常规无滚动有border', () => {
      cy.mount(<RegularBorder />)

      cy.get('#father').then((el) => {
        const father = el[0]

        cy.get('#child').then((el) => {
          const child = el[0]

          const rect = child.getBoundingClientRect()
          const pos = getRelPosition(rect, father)
          expect(pos).to.deep.equal({ left: 50, top: 80 })
        })
      })
    })

    // 绝对定位不受padding的影响
    it('常规无滚动有padding', () => {
      cy.mount(<RegularPadding />)

      cy.get('#father').then((el) => {
        const father = el[0]

        cy.get('#child').then((el) => {
          const child = el[0]

          const rect = child.getBoundingClientRect()
          const pos = getRelPosition(rect, father)
          expect(pos).to.deep.equal({ left: 50, top: 80 })
        })
      })
    })

    it('父容器有滚动', () => {
      cy.mount(<ParentScroll />)

      cy.get('#father').then((el) => {
        const father = el[0]

        cy.get('#child').then((el) => {
          const child = el[0]

          const rect = child.getBoundingClientRect()
          const pos = getRelPosition(rect, father)
          expect(pos).to.deep.equal({ left: 50, top: 80 })
        })
      })
    })
  })
})
