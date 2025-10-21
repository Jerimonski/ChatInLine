function App() {
  return (
    <main className='chat'>
      <section className='chat__header'>
        <div className='chat__user-info'>
          <h2 className='chat__title'>Open Chat</h2>
          <span className='chat__username'>Chateando como: "username"</span>
        </div>
        <div className='chat__stats'> "Cantidad de mensajes o usuarios"</div>
      </section>
      <section className='chat__messages'>
        <div className='chat__message-list'>HERE IS GONNA BE ALL MESSAGES</div>
        <div>
          <input className='chat__input-message' type='text' />
          <button className='chat__send-button'>Send</button>
        </div>
      </section>
    </main>
  )
}

export default App
