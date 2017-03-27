import Config from '../constants/Config';

export const getChats = () =>
  fetch(`${Config.apiUrl}/`)
    .then(res => {
      if (!res.ok) throw 'Error'
      else return res.json()
    })
    .catch(err => alert('Error fetching chats'));

export const postChat = chatObject =>
  fetch(`${Config.apiUrl}/`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(chatObject),
  })
    .then(res => {
      if (!res.ok) throw 'Error';
    })
  .catch(err => alert('Error sending chat'));
