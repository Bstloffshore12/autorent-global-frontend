import LocationCard from '@/components/LocationCard'
import Container from '@/components/common/Container'
import getOfficeLocationsContentAction from '@/actions/cms/getOfficeLocationsContentAction'

const OfficeLocationSection = async () => {
  const res = await getOfficeLocationsContentAction()

  if (res.success && res.data) {
    const { data } = res

    return (
      <Container>
        {Object.keys(data).map((city) => (
          <div key={city}>
            <h3 className="mb-6 mt-8 text-center text-xl font-medium capitalize">
              {city}
            </h3>

            <div className="grid gap-6 border-b border-primary-light pb-4 lg:grid-cols-2">
              {data[city as keyof typeof data].map((location) => (
                <LocationCard
                  key={`${location.city.replaceAll(' ', '-')}-${location.id}`}
                  {...location}
                />
              ))}
            </div>
          </div>
        ))}
      </Container>
    )
  }

  return null
}

export default OfficeLocationSection
