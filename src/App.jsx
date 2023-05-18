import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import 'stream-chat-react/dist/css/index.css'
import './App.css'
import {ChannelContainer, ChannelListContainer,Auth} from './components'

const apiKey='kte549c25nbn';
const cookies = new Cookies()
const client=StreamChat.getInstance(apiKey)
const authToken=cookies.get('token')

if(authToken){
  client.connectUser(
    {
      id:cookies.get('userId'),
      name:cookies.get('userName'),
      fullName:cookies.get('fullName'),
      image:cookies.get('avatarUrl'),
      hashedPassword:cookies.get('hashedPassword'),
      phoneNumber:cookies.get('phoneNumber'),
      
    },authToken

  )
}

const App = () => {
  const [createType, setCreateType] = useState('')
  const [isCreating,setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return authToken?(
    <div className='app__wrapper'>
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating} 
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
      
    </div>
  ):<Auth/>
}

export default App
