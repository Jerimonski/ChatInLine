import type { Message } from "./../../types/message"

interface MessageBoxProps {
  messageList: Message[]
  currentUsername: string
}

export default function MessageBox({
  messageList,
  currentUsername,
}: MessageBoxProps) {
  return (
    <div className='chat__message-list'>
      {messageList.map((message, index) => {
        const isOwnMessage = message.username === currentUsername

        return (
          <div
            key={index}
            className={`chat__message-text ${
              isOwnMessage ? "chat__message--own" : "chat__message--other"
            }`}
          >
            <p className='font-bold'>{message.username}</p>
            <p>{message.message}</p>
            <span className='text-sm font-light text-end'>{message.time}</span>
          </div>
        )
      })}
    </div>
  )
}
