// traer datos de la api

export async function Get(page=1){
  const res =await fetch(`https://localhost:7252/api/Productos?pageNumber=${page}&pageSize=10`)

  const data = await res.json()
  
  return data
}