export const submit = (url, data) => {
  const promiseObj = new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(data);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status === 201){
          resolve(xhr.responseText)
        } else {
          console.log('submit failed with:', xhr.status);
          reject(xhr.status);
          
        }
      }
    }
  });

  return promiseObj;
}

//RETURNS A PROMISE
export const getContent = (url) => { 
  const promiseObj = new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // false for synchronous request
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if( xhr.status === 200) {
          const resp = xhr.responseText;
          const respJson = JSON.parse(resp);
          resolve(respJson);
        } else {
          console.log("getContent failed with:", xhr.status);
          reject(xhr.status);
        }
      } else {
        console.log("xhr in progress");
      }
    }
    console.log("request sent successfully");
  });
  return promiseObj;
}