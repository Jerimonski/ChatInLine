function App() {
  return (
    <main className='chat'>
      <section className='chat__header'>
        <div className='chat__user-info'>
          <h2 className='chat__title'>Open Chat</h2>
          <span className='chat__username'>Chateando como: "username"</span>
        </div>
        <div className='chat__stats'>
          <span className='chat__messages-Count'>
            "Cantidad de mensajes o usuarios"
          </span>
        </div>
      </section>
      <section className='chat__messages'>
        <div className='chat__message-list'>HERE IS GONNA BE ALL MESSAGES</div>
        <div className='chat__box-input-message'>
          <input
            className='chat__input-message'
            placeholder='Ingresa un comentario'
            type='text'
          />
          <button className='chat__send-button'>IC</button>
        </div>
      </section>
    </main>
  )
}

export default App
