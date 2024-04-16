import 'src/styles/App.css'
import Map from 'src/components/map/Map'
import Aside from 'src/components/aside/Aside'

const App = () => (
  <div className='App'>
    <section className='map-section'>
      <Map />
    </section>

    <Aside />
  </div>
)

export default App
