async fileData(type: string, name: string, owner?: string, parent?: string, subjectOrg?: string, hidden?: boolean){
    let json = {
      type: type,
      originalName: name,
      owner: owner || '',
      parent: parent || '',
      subjectOrg: subjectOrg,
      hidden: hidden || false
    }
    const response = await fetch(`${path}/file-services`, {
      method: 'POST', 
      body: JSON.stringify(json),
      headers: {'Content-Type': 'application/json'}
    });
    const body = response.json();
    console.log(body)
    return body
  }
