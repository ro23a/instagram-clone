import React from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'
function Posts({ username, caption, imageUrl}) {
  return (
    <div className='post'>
    <div className='post__header'>
    <Avatar
     className='post__avatar'
     alt='rafehqazi'
     src='https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg' />
        <h3>{username}</h3>
    </div>
        <img className="post__image" src={imageUrl} alt='lgo' />
        <h4 className='post__text'><strong>{username} </strong>{caption}</h4>
    </div>
  )
}

export default Posts