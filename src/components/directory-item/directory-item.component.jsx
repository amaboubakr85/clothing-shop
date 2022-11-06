import './directory-item.styles.scss'
import { useNavigate } from 'react-router-dom'
const DirectoryItem = ({ category: { title, imageUrl, route } }) => {
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)
  return (
    <div className='directory-item-container' onClick={onNavigateHandler}>
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className='body'>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  )
}

export default DirectoryItem
