import NotFoundSection from '@/sections/NotFoundSection'

export default function NotFoundPage() {
  return (
    <section
      style={{ minHeight: 'calc(100vh - 381px - 89px)' }}
      className="grid place-items-center py-8 text-center"
    >
      <NotFoundSection />
    </section>
  )
}
