const spicesContainer = document.querySelector('#spices-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/spices`

const spicesCallback = ({ data: spices }) => displaySpices(spices)
const errCallback = err => console.log(err)

const getAllSpices = () => axios.get(baseURL).then(spicesCallback).catch(errCallback)
const addSpice = body => axios.post(baseURL, body).then(spicesCallback).catch(errCallback)
const deleteSpice = id => axios.delete(`${baseURL}/${id}`).then(spicesCallback).catch(errCallback)
const updateSpice = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(spicesCallback).catch(errCallback)

function submitHandler(e){
    e.preventDefault()

    let name = document.querySelector('#name')
    let flavor = document.querySelector('#flavor')
    let stock = document.querySelector('#stock')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        flavor: flavor.value,
        stock: stock.value,
        imageURL: imageURL.value
    }

    addSpice(bodyObj)

    name.value = ''
    flavor.value = ''
    stock.value = ''
    imageURL.value = ''
}

const createSpiceCard = spice =>{
    const spiceCard = document.createElement('div')
    spiceCard.classList.add('spice-card')

    spiceCard.innerHTML = `<img alt='spice cover image' src=${spice.imageURL} class="spice-cover-image"/>
    <p class="spice">${spice.name}, ${spice.flavor}<p>
    <div class="spices-container">
        <button onclick="updateSpice(${spice.id}, 'minus')">-</button>
        <p class="spice-stock">${spice.stock}</p>
        <button onclick="updateSpice(${spice.id}, 'plus')">+</button>
    </div>
        <button onclick="deleteSpice(${spice.id})">DELETE</button>
        `

        spicesContainer.appendChild(spiceCard)
}

const displaySpices = arr => {
    spicesContainer.innerHTML= ``
    for (i = 0; i < arr.length; i++){
        createSpiceCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllSpices()