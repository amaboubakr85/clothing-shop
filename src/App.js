import Directory from './components/directory/directory.component'
const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: '/images/hats.jpg',
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl: '/images/jackets.jpg',
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl: '/images/sneakers.jpg',
    },
    {
      id: 4,
      title: 'Womens',
      imageUrl: '/images/womens.jpg',
    },
    {
      id: 5,
      title: 'Mens',
      imageUrl: '/images/mens.jpg',
    },
  ]
  return <Directory categories={categories} />
}

export default App
