import Hero from './Hero'
import FeatureGrid from './FeatureGrid'
import AppStoreButton from './AppStoreButton'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <AppStoreButton comingSoon={true} />
    </>
  )
}
