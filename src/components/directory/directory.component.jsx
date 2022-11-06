import './directory.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component'

const categories = [
  {
    id: 1,
    title: 'Hats',
    imageUrl: '/images/hats.jpg',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'Jackets',
    imageUrl: '/images/jackets.jpg',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'Sneakers',
    imageUrl: '/images/sneakers.jpg',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'Womens',
    imageUrl: '/images/womens.jpg',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'Mens',
    imageUrl: '/images/mens.jpg',
    route: 'shop/mens',
  },
]

const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
