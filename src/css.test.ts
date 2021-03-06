import { css, glob, keyframes, createStyil, flush } from './css'

describe('css', () => {
  afterEach(() => {
    flush()
  })

  it('base css', () => {
    const out = css({ foo: 1 })

    document.head.childNodes.forEach((item) => {
      expect(item.textContent).toEqual('.css-1250898684{foo:1;}')
    })

    expect(out).toEqual('css-1250898684')
  })

  it('global css', () => {
    const out = glob({ body: { backgroundColor: 'red' } })
    document.head.childNodes.forEach((item) => {
      expect(item.textContent).toEqual('body{background-color:red;}')
    })

    expect(out).toEqual(undefined)
  })

  it('keyframes css', () => {
    const out = keyframes({
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    })

    document.head.childNodes.forEach((item) => {
      expect(item.textContent).toEqual(
        '@keyframes css-854127283{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}'
      )
    })

    expect(out).toEqual('css-854127283')
  })

  it('createStyil', () => {
    const { css, flush } = createStyil({
      key: 'abc',
      container: document.body,
      nonce: '123456'
    })
    const out = css({
      width: 'auto'
    })

    expect(document.documentElement).toMatchSnapshot()

    expect(out).toEqual('abc-2883881200')
    flush()
  })

  it('createStyil speedy', () => {
    const { css } = createStyil({
      speedy: true
    })
    const out = css({
      width: 'auto',
      '.foo': {
        height: 'auto'
      }
    })

    expect(document.documentElement).toMatchSnapshot()

    expect(out).toEqual('css-3741333736')
  })
})
