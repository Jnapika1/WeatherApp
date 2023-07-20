const getForm = document.getElementById('data-form');

  getForm.addEventListener('submit', onSubmit);

    function onSubmit(e){
      e.preventDefault();
        const cities = document.getElementsByTagName('input');
        // console.log(cities);
        let cityName=[];
      for(let i=0;i<cities.length;i++){
        cityName[i]= cities[i].value;
      }

      
    //   console.log(cityName);
      let myObj = {
          city: cityName
      }
      console.log(myObj);
    axios.post('http://localhost:4000/data', myObj)
    .then(response=>{
        showObjectOnScreen(response.data.weather);
        console.log(response.data);
    })
    .catch(err=>{
        console.log(err);
    })
    
  }

  document.getElementById('addCity').onclick = function(){
      let newCity = document.createElement('input');
      newCity.setAttribute('type', 'text');
      newCity.setAttribute('id', 'location');
      newCity.setAttribute('class', 'form-control');
      document.getElementById('form-feild').appendChild(newCity);
  }

  function showObjectOnScreen(weather){
      for(let i=0;i<weather.length;i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${weather[i].location}`));
        li.appendChild(document.createTextNode(` - ${weather[i].temperature}℃`));
        document.getElementById('list').appendChild(li);
      }
  }