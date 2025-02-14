import { lazyCacheLoader } from './utils'
import { ReactNode, Suspense, useMemo } from 'react'

interface Props<T = any> {
  url: string
  componentProps?: T
  children?: ReactNode
}

export default function RemoteComponent({
  url,
  componentProps,
  children,
}: Props) {
  const Component = useMemo(() => {
    const component = lazyCacheLoader(url)

    return component
  }, [url])

  return (
    <Suspense fallback={'loading'}>
      <Component {...componentProps}> {children}</Component>
    </Suspense>
  )
}
