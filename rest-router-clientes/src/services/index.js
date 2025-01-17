export const getClients = async() => {
  const res = await fetch('http://localhost:3000/clients')
  if(!res.ok) throw new Error('Error al obtener los clientes')
  const data = await res.json()
  return data
}

export const getClientById = async(id) => {
  const res = await fetch(`http://localhost:3000/clients/${id}`)
  if(!res.ok) throw new Error('Error al obtener el cliente')
  const data = await res.json()
  return data
}

export const updateClienteState = async(id, state) => {
  const res = await fetch(`http://localhost:3000/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({state})
  })
  if(!res.ok) throw new Error('Error al actualizar el cliente')
  const data = await res.json()
  return data
}


export const addClient = async(client) => {
  try {
    const res = await fetch('http://localhost:3000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    })

    if(!res.ok) throw new Error('Error al agregar el cliente')

    return await res.json()    
  } catch (error) {
    console.log(error)
  }
}

export const updateClient = async(id ,client) => {
  try {
    const res = await fetch(`http://localhost:3000/clients/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    })

    if(!res.ok) throw new Error('Error al actualizar el cliente')

    return await res.json()    
  } catch (error) {
    console.log(error)
  }
}

export const deleteClient = async(id) => {
  try {
    const res = await fetch(`http://localhost:3000/clients/${id}`, {
      method: 'DELETE'
    })
    if(!res.ok) throw new Error('Error al eliminar el cliente')
    return await res.json()    
  } catch (error) {
    console.log(error)
  }
}

