let body = document.body
let users = []

window.addEventListener("DOMContentLoaded",pageLogin)

// Variables


function pageLogin() {
    body.innerHTML = `<div class="containerlogin">
                        <div class="dividerTitle">
                            <h1>¿Quien esta viendo ahora?</h1>
                        </div>
                        <div class="dividerUsers">
                        </div>
                        <div class="dividerBtn">
                            <button class="addProfile">Crear perfil</button>
                            <button class="editProfile">Administrar perfiles</button>
                        </div>
                    </div>`
    
    
    let itemsUser = JSON.parse(localStorage.getItem("user"))
    console.log(itemsUser)
    console.log(users)
    
    if (itemsUser != null) {
        users = itemsUser
    }

    console.log(users)

    if (users.length > 0) {
        users.forEach(user => {
            let dividerUsers = document.querySelector(".dividerUsers")
            dividerUsers.innerHTML += `<div id=${user.id} class="users user3">
                                        <img id=${user.id} src=${user.img} alt="UserImage">
                                        <i id=${user.id} class="fa-solid fa-trash-can"></i>
                                        <span id=${user.id}>${user.user}</span>
                                    </div>`
    })
    paginate()
    }

    let delet3 = document.querySelectorAll(".fa-trash-can")
    
    let editProfile = document.querySelector(".editProfile")
    editProfile.addEventListener("click", () => {
        delet3.forEach(dt => {
            dt.classList.toggle("active1")
            dt.addEventListener("click",deleteUser)
        })
    })


    function deleteUser(e) {
        let dlt = users.find(user => user.id == e.target.id)
        users = users.filter(item => item.id !== dlt.id)
        localStorage.setItem("user", JSON.stringify(users)) 
        pageLogin()
    }
    
    let btnAdd = document.querySelector(".addProfile")
    btnAdd.addEventListener("click", () => {
        let div = document.createElement("div")
        div.className = "inputsAdd"
        div.innerHTML += `<div>
                            <i class="fa-solid fa-xmark"></i>
                            <input id="name" type="text" placeholder="Usuario">
                            <input id="img" type="text" placeholder="Img">
                            <button id="sendValue">Enviar</button>
                            </div>`
        body.appendChild(div)

        let close = document.querySelector(".fa-xmark")
        close.addEventListener("click", () => {
            div.remove()
        })

        let send = document.getElementById("sendValue")
        let user = document.getElementById("name")
        let img = document.getElementById("img")
        
        send.addEventListener("click", () => {
            let dividerUser = document.querySelector(".dividerUsers")
            if (user.value && img.value) {
                var UID = Math.floor(Math.random() * 999999);
                users.push({"user":user.value,"img":img.value,"id": UID})
                localStorage.setItem("user", JSON.stringify(users))
                loadUser(dividerUser)
                div.remove()
                pageLogin()
            }
        })
    })

    function loadUser(dividerUser) {  
            dividerUser.innerHTML = ""
            
            users.forEach(us => {
                dividerUser.innerHTML += `
                
                <div class="users" id=${us.id}>
                    <img id=${us.id} src=${us.img} alt="UserImage">
                    <span id=${us.id}>${us.user}</span>
                </div>`
            })

            paginate()

            console.log(users)
    }

    function paginate() {
        let classe = document.querySelectorAll(".users")
        classe.forEach(us => {
            us.addEventListener("click", (e) => {
                let targ = users.find(us => us.id == e.target.id)
                home(targ)
            })
        })
    }
}

function home(user) {
    navBar()
    sectionOne()
    sectionSlides()

    function navBar() {
        body.style.backgroundColor = '#141414';
        body.innerHTML = `<header class="header">
                            <nav class="nav">
                                <div class="logo">
                                    <img src="./assets/logo.png" alt="">
                                </div>
                                
                                <ul class="ul">
                                    <a href="">
                                        <li>Inicio</li>
                                    </a>
                                    <a href="">
                                        <li>Series</li>
                                    </a>
                                    <a href="">
                                        <li>Peliculas</li>
                                    </a>
                                    <a href="">
                                        <li>Novedades Populares</li>
                                    </a>
                                    <a href="">
                                        <li>Mi lista</li>
                                    </a>
                                    <a href="">
                                        <li>Explorar por idioma</li>
                                    </a>
                                </ul>
                            </nav>
                            <div class="user">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <i class="fa-solid fa-bell"></i>
                                <div class="profiles">
                                    <img class="img" src=${user.img} alt="">
                                    <i class="fa-solid fa-caret-down"></i>
                                    <div class="allProfiles">
                                    </div>
                                </div>
                            </div>
                        </header>`

        let arrow = document.querySelector(".fa-caret-down")
        let allProfiles = document.querySelector(".allProfiles")
        arrow.addEventListener("click", () => {
            allProfiles.classList.toggle("activeProfiles")
        }) 
        let img = document.querySelector(".img")
        img.addEventListener("click", () => {
            allProfiles.classList.toggle("activeProfiles")
        })
        
        users.forEach(us => {
            allProfiles.innerHTML += `<div id=${us.id} class="separate">
                                    <img id=${us.id}  src=${us.img}>
                                    <h1 id=${us.id}>${us.user}</h1>
                                </div>`
        })

        allProfiles.innerHTML += `<div class="edit">
                                    <i class="fa-solid fa-pen-to-square link"></i>
                                    <span class="link">Administrar Perfiles</span
                                </div>`

        let edit = document.querySelector(".edit")
        edit.addEventListener("click", pageLogin)

        let separate = document.querySelectorAll(".separate")
        separate.forEach(sp => {
            sp.addEventListener("click" , (e) => {
                let targ = users.find(us => us.id == e.target.id)
                home(targ)
            })
        })
    }

    function sectionOne() {
        async function data() {
            try {
                let rnd = Math.floor(Math.random() * 20)
                let response = await fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=65d170988df04794892b0208461d4218`)
                const data = await response.json()
                let resultados = data.results
                console.log(resultados)

                let div = document.createElement("div")
                div.innerHTML += `<section class="sectionOne">
                                    <div class="left">
                                        <h1>${resultados[rnd].title}</h1>
                                        <p>${resultados[rnd].overview}</p>
                                        <div class="btns">
                                            <button class="play"><i class="fa-solid fa-play"></i>Reproducir</button>
                                            <button class="info"><i class="fa-regular fa-circle-info"></i>Mas informacion</button>
                                        </div>
                                    </div>
                                </section>`
                body.appendChild(div)

                let info = document.querySelector(".info")
                info.addEventListener("click", () => {
                    alert(`Fecha: ${resultados[rnd].release_date} , Idioma: ${resultados[rnd].original_language}`)
                })
            
                let sectionOne = document.querySelector(".sectionOne")
                sectionOne.style.backgroundImage = `Url("https://image.tmdb.org/t/p/w185/${resultados[rnd].poster_path}")`;
            } catch (err) {
                console.log(err);
            }
        }
        data()
    }

    function sectionSlides() {
        
        async function sliders() {
            let movies = await fetch("https://api.themoviedb.org/3/movie/popular/?api_key=65d170988df04794892b0208461d4218")
            let response = await movies.json()
            
            let div = document.createElement("div")

                div.innerHTML += `<div class="container">
                                    <span>Tendencias</span>
                                    <div class="carousel">
                                        <div class="slider">
                                        </div>
                                        <div class="controls">
                                            <button class="next"><i class="fa-solid fa-chevron-right"></i></button>
                                            <button class="prev"><i class="fa-solid fa-angle-left"></i></button>
                                        </div>
                                    </div>
                                </div>`
                body.appendChild(div)

                function dividirArray(arr, n) {
                    var largo = Math.max(arr.length / n, 1);
                    return [].concat.apply([], arr.map(function(item, i) {
                        return i % largo ? [] : [arr.slice(i, i + largo)];
                        }));
                }

                let movieDate = response.results
                console.log(movieDate)
                
                let part = dividirArray(movieDate, 2)

                const carousel = document.querySelector('.carousel');
                const slider = document.querySelector('.slider');
                
                let getImage = "https://image.tmdb.org/t/p/w185/"


                
                part.forEach(arr => {
                    let section = document.createElement("section")
                    
                    arr.forEach(data => {
                        section.innerHTML += `<img src=${getImage + data.backdrop_path}>`
                        slider.append(section)
                    })

                })



                const next = document.querySelector('.next');
                const prev = document.querySelector('.prev');
                let direction;
                    
                next.addEventListener('click', function() {
                direction = -1;
                carousel.style.justifyContent = 'flex-start';
                slider.style.transform = 'translate(-20%)';  
                });
                    
                prev.addEventListener('click', function() {
                if (direction === -1) {
                    direction = 1;
                    slider.appendChild(slider.firstElementChild);
                }
                carousel.style.justifyContent = 'flex-end';    
                slider.style.transform = 'translate(20%)';  
                    
                });
                    
                slider.addEventListener('transitionend', function() {
                    
                if (direction === 1) {
                    slider.prepend(slider.lastElementChild);
                } else {
                    slider.appendChild(slider.firstElementChild);
                }
                    
                slider.style.transition = 'none';
                slider.style.transform = 'translate(0)';
                setTimeout(() => {
                    slider.style.transition = 'all 0.5s';
                })
                }, false);


        }

        sliders()

    }
}



