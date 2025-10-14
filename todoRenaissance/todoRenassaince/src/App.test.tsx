import './App.css'
import { expect, test } from 'vitest'

// this bad boy prints actual result tooo :O
test('test a renaming function', () => {
  let counter = 0;
  for (let index = 0; index < 20; index++) {
    counter = counter + index
  }
  expect(counter).toBe(210)
})