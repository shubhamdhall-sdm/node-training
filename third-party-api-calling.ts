let path = process.ENV.SERVICE_PATH

async fileData(type: string, name: string, owner?: string, parent?: string, hidden?: boolean){
    let json = {
      type: type,
      name: name,
      owner: owner || '',
      parent: parent || '',
      hidden: hidden || false
    }
    const response = await fetch(`${path}/file`, {
      method: 'POST', 
      body: JSON.stringify(json),
      headers: {'Content-Type': 'application/json'}
    });
    const body = response.json();
    console.log(body)
    return body
  }

async getDoc(id: string){
    const response = await fetch(`${path}/file/fileGet/${id}`, {
      method: 'GET', 
      headers: {'Content-Type': 'application/json'}
    });
    const body = await response.json();
    return body
  }

  async deleteDoc(id: string, authorization?: any){

    const response = await fetch(`${path}/file/${id}`, {
      method: 'DELETE', 
      headers: {'Content-Type': 'application/json', 'Authorization': authorization || ''}
    });
    const body = await response.json();
    return body
  }

  async updateDoc(id: string, name: string) {
    let json = {
        name: name,
    }
    const response = await fetch(`${path}/file/name/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(json),
        headers: { 'Content-Type': 'application/json' }
    });
    const body = await response.json();
    return body
}
