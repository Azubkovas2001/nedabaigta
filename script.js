//burgeris
const burger = document.getElementById("burger")
const sideNav = document.querySelector(".side-nav")
const links = document.querySelectorAll(".link")

burger.addEventListener("click", function(){
    this.classList.toggle("rotate")
    sideNav.classList.toggle("translate")
})

window.addEventListener("resize", function(){
    if(window.innerWidth> 768){
        burger.classList.remove("rotate")
        sideNav.classList.remove("translate")
    }
})

for(let link of links){
    link.addEventListener("click", function(){
        for(var x of links){
            x.classList.remove("selected")
        }
        this.classList.add("selected")
    })
}
//============================>
//nauji html atidaryti
let button = document.querySelector('button')
button.addEventListener('click', function(){
    window.location="posts.html"
})
let home = document.getElementById('home')
home.addEventListener('click', function() {
    window.location="index.html"
})
let read = document.getElementById('read')
read.addEventListener('click', function(){
    window.location="read.html"
})
//======================>
//nauji postai
const addPostForm = document.getElementById('add-post')
const postsContainer = document.getElementById('posts')

const API_ENDPOINTS = {
    post: '	https://testapi.io/api/Andrius/resource/newPosts',
    get: '	https://testapi.io/api/Andrius/resource/newPosts',
    delete: (id) => `https://testapi.io/api/Andrius/resource/newPosts/${id}`,
    edit: (id) => `https://testapi.io/api/Andrius/resource/newPosts/${id}`

}

const getData = (url) =>{
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
}

const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(err => console.log(err))
    
}

const postTemplate = (postData) => {
    return `
        <div id=${postData.id}>
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="">
        <h3>${postData.title}</h3>
        <h6>${postData.content}</h6>
        <p>0 comments</p>
        </div>
        `
}
const handleAddPost = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)     
    const newPost = await postData(API_ENDPOINTS.post, formData)
    postsContainer.innerHTML += postTemplate(newPost)

    
}
addPostForm.addEventListener('submit', handleAddPost)

window.onload = async () => {
    const posts = await getData(API_ENDPOINTS.get)
    posts.data.forEach(post => {
        postsContainer.innerHTML += postTemplate(post)
    })
}
//=======================>
//registracijos forma
const form = document.getElementById('form')

form.addEventListener('submit', function(e){
    e.preventDefault();

    const payload = new FormData(form)

    console.log([...payload])

    fetch('https://testapi.io/api/Andrius/resource/Register', {
        method: "POST",
        body: payload
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})