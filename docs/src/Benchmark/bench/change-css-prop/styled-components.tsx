import React from 'react'
import { TestComponentProps, TestRunner } from '../TestRunner'
import { buttonStyles } from '../utils/buttonStyles'
import styled from 'styled-components'

const Button: any = styled('button')((props: any) => ({
  ...buttonStyles,
  ...props.css
}))

const Test = ({ testIndex }: TestComponentProps) => {
  return (
    <Button
      css={{
        '--test-index': testIndex,
        backgroundColor: `hsl(${Math.floor(Math.random() * 360)} 80% 80%)`,
        padding: '20px'
      }}
    >
      testing
    </Button>
  )
}

const StitchesTest = () => {
  return (
    <>
      <TestRunner numberOfRuns={3} iterationN={1000} TestComponent={Test} />

      <div style={{ opacity: 0, pointerEvents: 'none' }}>
        <Button>将按钮安装在测试之外，以确保没有计时任何安装时间</Button>
      </div>
    </>
  )
}

export default StitchesTest
