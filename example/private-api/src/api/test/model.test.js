import { Test } from '.'

let test

beforeEach(async () => {
  test = await Test.create({ text: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = test.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test.id)
    expect(view.text).toBe(test.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = test.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test.id)
    expect(view.text).toBe(test.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
