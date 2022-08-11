import parse from 'html-react-parser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPageDetail } from './../../store/actions/page'

export default function PagesContent() {
  const pageData = useSelector(state => state.page.data)
  const router = useRouter()
  const { slug } = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPageDetail())
  }, [])

  const currentPage =
    pageData !== null && pageData !== undefined && Object.values(pageData)?.find(page => page.slug === slug)

  return (
    currentPage?.isDisplay === '1' && (
      <div className='post'>
        <div className='container'>
          <h2>{currentPage?.name}</h2>
          <div>{parse(currentPage?.content)}</div>
        </div>
      </div>
    )
  )
}
