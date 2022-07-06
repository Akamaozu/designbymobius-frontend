import { MessengerChat } from 'react-messenger-chat-plugin'

const FacebookChat = props => {
  const { pageId, greetingDialogDisplay, language, loggedInGreeting, loggedOutGreeting } = props

  return <MessengerChat
            pageId={ pageId }
            language={ language }
            loggedInGreeting={ loggedInGreeting }
            loggedOutGreeting={ loggedOutGreeting }
            greetingDialogDisplay={ greetingDialogDisplay }
          />
}

export default FacebookChat
